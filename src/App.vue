<template>
	<div class="quiz-slide-wrap">
		<Transition name="slide-up">
			<QuizQuestion 
			v-if="!quizState.showResult"
			:questionItem="quizData.data[quizState.currentQuestion]" 
			:key="quizData.data[quizState.currentQuestion]"
			class="quiz-slide"  />
			<QuizResult v-else class="quiz-slide" :resultItem="getResultItem()" />
		</Transition>
	</div>
</template>

<script setup>
import { reactive, onBeforeMount, provide  } from "vue"
import QuizQuestion from '@/components/QuizQuestion.vue';
import QuizResult from '@/components/QuizResult.vue';
import data from '@/quiz-personality.json'

const quizData = reactive(data)
const numSlides = quizData.data.length
const quizState = reactive({
	currentQuestion: 0,
	showResult: false,
	score: undefined,
	personalityScores: [],
})

const calculateIntermediateResult = newVal => {
	if(quizData.type === 'personality') {
		quizState.personalityScores[newVal]++ 
	}
	else if (quizData.type === 'scored') {
		quizState.score += parseFloat(newVal)
	}
}

const calculatePersonalityIdx = scores => {
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
}

const getResultItem = () => {
	let result;

	if(quizData.type === 'personality') {
		const resultIdx = calculatePersonalityIdx(quizState.personalityScores)
		result = quizData.results[resultIdx]
	}
	else if(quizData.type === 'scored') {
		result = quizState.score
	}
	return {
		type: quizData.type,
		result: result
	}
}

onBeforeMount( () => {
	if(quizData.type === 'personality') {
		quizState.personalityScores.length = quizData.data.length
		quizState.personalityScores.fill(0);
	} 
	else if (quizData.type === 'scored') {
		quizState.score = 0
	}
})

const onAnswerBtnClick = val => {
	calculateIntermediateResult(val)

	if(quizState.currentQuestion < numSlides - 1) {
		quizState.currentQuestion++
	} else {
		quizState.showResult = true
	}
}

provide('answerBtnClick', onAnswerBtnClick)

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
