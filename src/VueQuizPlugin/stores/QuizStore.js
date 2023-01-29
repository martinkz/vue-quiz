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
		currentSlideType: "question",
		showResult: false,
		score: 0,
		personalityScores: [],
		tempScore: undefined,
		loading: true,
		waiting: false,
		timerActive: false,
		nextSlideHeight: 0,
		initialLoad: true,
		triggerHeightCalc: false,
	}),

	getters: {
		numSlides: (state) => state.quizData.data.length,
		currentQuestionData: (state) => {
			if (state.currentSlideType === "intro") return state.quizData.intro;
			if (state.currentSlideType === "question") return state.quizData.data[state.currentQuestion];
			if (state.currentSlideType === "result") return state.getResultItem();
		},
		introData: (state) => state.quizData.intro,
		isPersonality: (state) => state.quizData.type === "personality",
		isScored: (state) => state.quizData.type === "scored",
	},

	actions: {
		async init() {
			this.quizData = (await import("@/quiz1.json")).default;

			if (this.quizData.type === "personality") {
				this.personalityScores.length = this.quizData.data.length;
				this.personalityScores.fill(0);
			}

			this.loading = false;

			if (this.introData) {
				this.currentSlideType = "intro";
			} else {
				this.start();
			}
		},

		start() {
			this.timerActive = true;
			this.currentSlideType = "question";
		},

		nextStep() {
			this.updateScore(this.tempScore);
			this.waiting = false;
			this.currentQuestion++;
			if (this.currentQuestion >= this.numSlides) {
				this.showResult = true;
				this.timerActive = false;
				this.currentSlideType = "result";
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
			this.waiting = false;
			this.showResult = true;
			this.currentSlideType = "result";
		},

		reset() {
			this.currentQuestion = 0;
			this.showResult = false;
			this.score = 0;
			this.personalityScores.fill(0);
			this.timerActive = true;
			this.currentSlideType = "question";
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useQuizStore, import.meta.hot));
}
