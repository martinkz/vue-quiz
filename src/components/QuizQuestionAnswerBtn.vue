<template>
  <button class="quiz-answer-btn" @click="answerBtnClick(item.result)" type="button">{{ item.answer }}</button>
</template>

<script>

	export default {
		props: {
			item : {
				type: Object,
				required: true,
			}
		},

		inject: ['answerBtnClick'],
	}

</script>

<style scoped>
.quiz-answer-btn {
	background-color: blueviolet;
	color: white;
}
</style>