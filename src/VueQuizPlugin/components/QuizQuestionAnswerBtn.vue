<template>
	<button 
		:id="`answer-${store.currentQuestion}-${index}-${componentId}`"
		class="quiz-answer-btn"
		:disabled="store.waiting && store.isScored && options.revealAnswer"
		:class="`${selectedClass} ${correctClass} ${incorrectClass}`"
		@click="chooseAnswer(item.result)"
		>
		<slot name="answerContent" :answer-data="item">{{ item.answer }}</slot>
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