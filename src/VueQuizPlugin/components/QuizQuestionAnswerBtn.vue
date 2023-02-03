<template>
  <input
		:id="`answer-${store.currentQuestion}-${index}-${componentId}`"
		:name="`answer${store.currentQuestion}-${componentId}`"
		type="radio"
		:value="item.answer"
		:disabled="store.waiting && store.isScored && (options.revealAnswer || !options.nextBtn)"
		class="sr-only"
		@change="chooseAnswer(item.result)">
	<label 
		:for="`answer-${store.currentQuestion}-${index}-${componentId}`"
		class="quiz-answer-btn"
		:class="correctClass + incorrectClass">
		{{ item.answer }}
	</label>
</template>

<script setup>
import { ref, computed, inject } from "vue";
import { useQuizStore } from '@/VueQuizPlugin/stores/QuizStore';
const props = defineProps({
	item: {
		type: Object,
		required: true,
	},
	index: {
		type: Number,
		required: true,
	}
})

const componentId = inject('componentId');
const store = useQuizStore(componentId);
const options = inject('componentOptions');
const incorrectClass = ref('');

// Always show the correct answer
const correctClass = computed( () => {
	return options.revealAnswer && store.waiting && store.isScored && props.item.result === '1' ? 'correct' : ''
});

const chooseAnswer = (result) => {
	store.triggerHeightCalc = true;
	store.processUserAnswer(result, options);

	// Highlight the incorrect answer only on the clicked button
	if (store.isScored && options.revealAnswer && result === '0') {
		incorrectClass.value = 'incorrect';
	}
}


</script>

<style scoped>
.quiz-answer-btn {
	display: block;
	/* background: #392e83; */
	background: #413d3a;
	color: white;
	/* border-radius: 8px; */
	border: 1px solid transparent;
	padding: 1rem 4rem;
	font-size: 1em;
	font-weight: 500;
	font-family: inherit;
	cursor: pointer;
	transition: all 0.25s;
}

.quiz-answer-btn + input + .quiz-answer-btn {
	border-top: 1px solid #5e5c59;
}

input[type="radio"]:not(:disabled) + .quiz-answer-btn:hover {
	background: #40aec7;
}

.quiz-answer-btn:focus,
.quiz-answer-btn:focus-visible {
	outline: 4px auto -webkit-focus-ring-color;
}
input[type="radio"]:checked + label {
	background: #40aec7;
}
input[type="radio"] + label.correct {
	background: #35a150;
}

input[type="radio"] + label.incorrect {
	background: #b33d3d;
}
</style>