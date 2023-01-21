import { defineStore, acceptHMRUpdate } from "pinia";
import { useOptionsStore } from "@/VueQuizPlugin/stores/OptionsStore";

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
		showIntro: false,
		showResult: false,
		score: 0,
		personalityScores: [],
		tempScore: undefined,
		loading: true,
		waiting: false,
		timerActive: false,
		nextSlideHeight: 0,
	}),

	getters: {
		numSlides: (state) => state.quizData.data.length,
		currentQuestionData: (state) => state.quizData.data[state.currentQuestion],
		introData: (state) => state.quizData.intro,
		isPersonality: (state) => state.quizData.type === "personality",
		isScored: (state) => state.quizData.type === "scored",
	},

	actions: {
		async init() {
			this.quizData = (await import("@/quiz2.json")).default;

			if (this.quizData.type === "personality") {
				this.personalityScores.length = this.quizData.data.length;
				this.personalityScores.fill(0);
			}

			this.loading = false;

			if(this.introData) {
				this.showIntro = true;
			} else {
				this.start();
			}
		},

		start() {
			this.showIntro = false;
			this.timerActive = true;
		},

		nextStep() {
			this.updateScore(this.tempScore);
			this.waiting = false;
			this.currentQuestion++;
			if (this.currentQuestion >= this.numSlides) {
				this.showResult = true;
				this.timerActive = false;
			}
		},

		processUserAnswer(newVal) {
			this.tempScore = newVal;
			if (!this.waiting) {
				const options = useOptionsStore();
				this.waiting = true;

				if (!options.nextButton) {
					let timeout = this.isScored && options.revealAnswer ? 1200 : 500;
					setTimeout(() => this.nextStep(), timeout);
				}
			}
		},

		updateScore(newResult) {
			if (this.isScored) {
				this.score += parseInt(newResult);
			} else if (this.isPersonality) {
				this.personalityScores[newResult]++;
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

		endEarly() {
			this.timerActive = false;
			this.showResult = true;
		},

		reset() {
			this.currentQuestion = 0;
			this.showResult = false;
			this.score = 0;
			this.personalityScores.fill(0);
			this.timerActive = true;
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useQuizStore, import.meta.hot));
}
