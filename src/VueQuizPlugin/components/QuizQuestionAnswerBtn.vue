<template>
	<button 
		:id="`answer-${store.currentQuestion}-${index}-${componentId}`"
		class="quiz-answer-btn"
		:disabled="store.waiting && store.isScored && options.revealAnswer"
		:class="`${selectedClass} ${correctClass} ${incorrectClass}`"
		@click="chooseAnswer(item.result)"
		>
		{{ item.answer }}
	</button>
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

const selectedClass = computed(() => {
	return store.waiting && props.index === store.currentAnswer ? 'selected' : '';
});

const chooseAnswer = (result) => {
	store.triggerHeightCalc = true;
	store.currentAnswer = props.index;
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
	width: 100%;
	background: #413d3a;
	color: white;
	border: 1px solid transparent;
	padding: 1rem 4rem;
	font-size: 1em;
	font-weight: 500;
	font-family: inherit;
	cursor: pointer;
	transition: all 0.25s;
}

.quiz-answer-btn + .quiz-answer-btn {
	border-top: 1px solid #5e5c59;
}

.quiz-answer-btn:where(:not(:disabled):hover),
.quiz-answer-btn:focus,
.quiz-answer-btn:focus-visible {
	background: #356f7c;
}
.quiz-answer-btn.selected {
	background: #40aec7;
}
.quiz-answer-btn.correct {
	background: #4d7e55;
}
.quiz-answer-btn.incorrect {
	background: #934343;
}
</style>