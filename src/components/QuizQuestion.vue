<template>
	<div>
		<h1>{{ questionItem.question }}</h1>
		<QuizQuestionAnswerBtn v-for="item in questionItem.answers" :item="item" />
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

</style>