<template>
  <input
		:id="`answer-${store.currentQuestion}-${index}`"
		:name="`answer${store.currentQuestion}`"
		type="radio"
		:value="item.answer"
		:disabled="store.waiting && store.isScored"
		class="sr-only"
		@change="chooseAnswer(item.result)">
	<label 
		:for="`answer-${store.currentQuestion}-${index}`"
		class="quiz-answer-btn"
		:class="btnClass">
		{{ item.answer }}
	</label>
</template>

<script setup>
import { ref } from "vue";
import { useQuizStore } from '@/VueQuizPlugin/stores/QuizStore';

const store = useQuizStore();
let btnClass = ref('')

const chooseAnswer = (result) => {
	store.processUserAnswer(result);

	if(store.isScored) {
		if (result === '1') btnClass.value = 'correct';
		else if (result === '0') btnClass.value = 'incorrect';
	}
}

defineProps({
	item : {
		type: Object,
		required: true,
	},
	index: {
		type: Number,
		required: true,
	}
})
</script>

<style scoped>
.quiz-answer-btn {
	display: block;
	background: blueviolet;
	color: white;
	border-radius: 8px;
	border: 1px solid transparent;
	padding: 0.6em 1.2em;
	font-size: 1em;
	font-weight: 500;
	font-family: inherit;
	cursor: pointer;
	transition: border-color 0.25s;
}

input[type="radio"]:not(:disabled) + .quiz-answer-btn:hover {
	border-color: #646cff;
}

.quiz-answer-btn:focus,
.quiz-answer-btn:focus-visible {
	outline: 4px auto -webkit-focus-ring-color;
}
input[type="radio"]:checked + label {
	background: rgb(47, 90, 230);
}
input[type="radio"]:checked + .correct {
	background: green;
}

input[type="radio"]:checked + .incorrect {
	background: red;
}
</style>