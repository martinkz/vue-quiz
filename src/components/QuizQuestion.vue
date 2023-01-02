<template>
	<div>
		<h1>{{ questionItem.question }}</h1>
		<div><img class="question-img" :src="questionItem.image" alt=""></div>
		<QuizQuestionAnswerBtn v-for="item in questionItem.answers" :key="item" :item="item" />
	</div>
</template>

<script setup>

import QuizQuestionAnswerBtn from '@/components/QuizQuestionAnswerBtn.vue';

defineProps({
	questionItem: {
		type: Object,
		required: true,
	}
})
</script>

<style scoped>
	.question-img {
		margin: 0 auto;
	}
</style>