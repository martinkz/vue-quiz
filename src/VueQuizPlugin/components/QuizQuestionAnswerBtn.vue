<template>
  <button 
		class="quiz-answer-btn"
		:class="determineAnswerBtnClass(item.result)"
		type="button"
		@click="store.processUserAnswer(item.result)">
		{{ item.answer }}
	</button>
</template>

<script setup>
import { useQuizStore } from '@/VueQuizPlugin/stores/QuizStore';

const store = useQuizStore();

const determineAnswerBtnClass = (result) => {
	if(store.answerIsCorrect === true && result === '1') return 'correct'
	if(store.answerIsCorrect === false && result === '0') return'incorrect'
}

defineProps({
	item : {
		type: Object,
		required: true,
	}
})
</script>

<style scoped>
.quiz-answer-btn {
	background: blueviolet;
	color: white;
}
.correct {
	background: green;
}
.incorrect {
	background: red;
}
</style>