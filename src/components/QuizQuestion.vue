<template>
	<div>
		<h1>{{ questionItem.question }}</h1>
		<QuizQuestionAnswerBtn v-for="item in questionItem.answers" :item="item" />
	</div>
</template>

<script>
	import QuizQuestionAnswerBtn from '@/components/QuizQuestionAnswerBtn.vue';

	export default {
		components: {
			QuizQuestionAnswerBtn,
		},

		props: {
			questionItem: {
				type: Object,
				required: true,
			}
		},
	}
</script>

<style scoped>

</style>