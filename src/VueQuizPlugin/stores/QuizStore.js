import { defineStore, acceptHMRUpdate } from "pinia";

const getMaxPersonalityIdx = (scores) => {
	const max = Math.max(...scores);
	const indexes = [];

	for (let i = 0; i < scores.length; i++) {
		if (scores[i] === max) {
			indexes.push(i);
		}
	}
	// Get a random one of the indexes that have the max value
	const randomIdx = Math.floor(Math.random() * indexes.length);
	return indexes[randomIdx];
};

export const useQuizStore = defineStore("quizStore", {
	state: () => ({
		quizData: [],
		currentQuestion: 0,
		showResult: false,
		score: 0,
		personalityScores: [],
		loading: true,
		waiting: false,
		answerIsCorrect: undefined,
	}),

	getters: {
		numSlides: (state) => state.quizData.data.length,
		currentQuestionData: (state) => state.quizData.data[state.currentQuestion],
	},

	actions: {
		async init() {
			this.quizData = (await import("@/quiz-scored.json")).default;

			if (this.quizData.type === "personality") {
				this.personalityScores.length = this.quizData.data.length;
				this.personalityScores.fill(0);
			}

			this.loading = false;
		},

		nextStep() {
			if (this.currentQuestion < this.numSlides - 1) {
				this.currentQuestion++;
			} else {
				this.showResult = true;
			}
		},

		processUserAnswer(newVal) {
			if (this.quizData.type === "personality") {
				this.personalityScores[newVal]++;
				this.nextStep();
			} else if (this.quizData.type === "scored") {
				if (!this.waiting) {
					this.waiting = true;
					this.answerIsCorrect = !!parseInt(newVal);
					setTimeout(() => {
						this.score += parseInt(newVal);
						this.waiting = false;
						this.answerIsCorrect = undefined;
						this.nextStep();
					}, 1500);
				}
			}
		},

		getResultItem() {
			let result;

			if (this.quizData.type === "personality") {
				const resultIdx = getMaxPersonalityIdx(this.personalityScores);
				result = this.quizData.results[resultIdx];
			} else if (this.quizData.type === "scored") {
				result = this.score;
			}
			return {
				type: this.quizData.type,
				result: result,
			};
		},

		reset() {
			this.currentQuestion = 0;
			this.showResult = false;
			this.score = 0;
			this.personalityScores.fill(0);
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useQuizStore, import.meta.hot));
}
