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
		score: undefined,
		personalityScores: [],
		loading: true,
	}),

	getters: {
		numSlides: (state) => state.quizData.data.length,
		currentQuestionData: (state) => state.quizData.data[state.currentQuestion],
	},

	actions: {
		async init() {
			this.quizData = (await import("@/quiz-personality.json")).default;

			if (this.quizData.type === "personality") {
				this.personalityScores.length = this.quizData.data.length;
				this.personalityScores.fill(0);
			} else if (this.quizData.type === "scored") {
				this.score = 0;
			}

			this.loading = false;
		},

		nextStep(newVal) {
			if (this.quizData.type === "personality") {
				this.personalityScores[newVal]++;
			} else if (this.quizData.type === "scored") {
				this.score += parseFloat(newVal);
			}

			if (this.currentQuestion < this.numSlides - 1) {
				this.currentQuestion++;
			} else {
				this.showResult = true;
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
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useQuizStore, import.meta.hot));
}
