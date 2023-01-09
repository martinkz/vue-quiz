<template>
  <button 
		class="quiz-answer-btn"
		:class="btnClass"
		type="button"
		@click="determineAnswerBtnClass(item.result)">
		{{ item.answer }}
	</button>
</template>

<script setup>
import { ref } from "vue";
import { useQuizStore } from '@/VueQuizPlugin/stores/QuizStore';

const store = useQuizStore();

let btnClass = ref('')

const determineAnswerBtnClass = (result) => {
	store.processUserAnswer(result);
	
	if(!store.waiting) {
		if (store.answeredBtnHighlight) btnClass.value = 'highlight';
		if (store.answerIsCorrect === true) btnClass.value = 'correct';
		if (store.answerIsCorrect === false) btnClass.value = 'incorrect';
	}
	
	store.setWaiting();
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
.highlight {
	background: rgb(47, 90, 230);
}
</style>