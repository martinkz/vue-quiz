<template>
  <button class="quiz-answer-btn" type="button" @click="store.nextStep(item.result)">{{ item.answer }}</button>
</template>

<script setup>
import { useQuizStore } from '@/stores/QuizStore';

const store = useQuizStore();

defineProps({
	item : {
		type: Object,
		required: true,
	}
})
</script>

<style scoped>
.quiz-answer-btn {
	background-color: blueviolet;
	color: white;
}
</style>