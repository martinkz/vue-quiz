<template>
  <button class="quiz-answer-btn" @click="answerBtnClick(item.result)" type="button">{{ item.answer }}</button>
</template>

<script setup>
import { inject } from 'vue'
defineProps({
	item : {
		type: Object,
		required: true,
	}
})
const answerBtnClick = inject('answerBtnClick')
</script>

<style scoped>
.quiz-answer-btn {
	background-color: blueviolet;
	color: white;
}
</style>