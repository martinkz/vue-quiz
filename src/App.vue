<template>
	<div class="quiz-slide-wrap">
		<Transition name="slide-up">
			<QuizQuestion v-if="!showResult" class="quiz-slide" :questionItem="quizData.data[currentQuestion]" :key="quizData.data[currentQuestion]" />
			<QuizResult v-else class="quiz-slide" :resultItem="getResultItem()" />
		</Transition>
	</div>
</template>

<script>
	import QuizQuestionAnswerBtn from '@/components/QuizQuestionAnswerBtn.vue';
	import QuizQuestion from '@/components/QuizQuestion.vue';
	import QuizResult from '@/components/QuizResult.vue';
	import data from '@/quiz-personality.json'

	// console.log(data.data)

	export default {
		name: 'App',

		components: {
			QuizQuestion,
			QuizResult,
			QuizQuestionAnswerBtn,
		},

		data: () => ({
			currentQuestion: 0,
			quizData: data,
			showResult: false,
			score: undefined,
			personalityScores: [],
		}),

		computed: {
			numSlides() {
				return this.quizData.data.length
			},
		},

		provide() {
			return {
				answerBtnClick: this.onAnswerBtnClick
			}
		},

		methods: {
			onAnswerBtnClick(val) {
				// console.log(val);
				this.calculateIntermediateResult(val)

				if(this.currentQuestion < this.numSlides - 1) {
					this.currentQuestion++
				} else {
					this.showResult = true
				}
			},

			calculateIntermediateResult(newVal) {
				if(this.quizData.type === 'personality') {
					this.personalityScores[newVal]++ 
				} 
				else if (this.quizData.type === 'scored') {
					this.score += parseFloat(newVal)
				}
			},

			calculatePersonalityIdx(scores) {
				const max = Math.max(...scores)
				const indexes = []

				for (let i = 0; i < scores.length; i++) {
					if (scores[i] === max) {
						indexes.push(i)
					}
				}
				// Get a random one of the indexes that have the max value
				const randomIdx = Math.floor(Math.random() * indexes.length)
				return indexes[randomIdx]
			},

			getResultItem() {
				let result;

				if(this.quizData.type === 'personality') {
					const resultIdx = this.calculatePersonalityIdx(this.personalityScores)
					result = this.quizData.results[resultIdx]
				}
				else if(this.quizData.type === 'scored') {
					result = this.score
				}
				return {
					type: this.quizData.type,
					result: result
				}
			},
		},

		created() {
			if(this.quizData.type === 'personality') {
				this.personalityScores.length = this.quizData.data.length
				this.personalityScores.fill(0);
			} 
			else if (this.quizData.type === 'scored') {
				this.score = 0
			}
		}

	}
</script>

<style scoped>
	.quiz-slide-wrap {
		display: grid;
		grid-template-columns: 1fr;
	}

	.quiz-slide {
		grid-row: 1;
		grid-column: 1;
	}

	.slide-up-enter-active,
	.slide-up-leave-active {
		transition: all 0.25s linear;
		
	}

	.slide-up-enter-from {
		opacity: 0;
		translate: 0 200px;
	}

	.slide-up-leave-to {
		opacity: 0;
		translate: 0 -200px;
	}
</style>
