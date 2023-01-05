<template>
	<div>
		<h1>{{ questionItem.question }}</h1>
		<div><img class="question-img" :src="questionItem.image" alt=""></div>
		<QuizQuestionAnswerBtn v-for="item in questionItem.answers" :key="item" :item="item" />
		<div class="controls">
			<button type="button" @click="store.reset()">Next</button>
		</div>
	</div>
</template>

<script setup>
import QuizQuestionAnswerBtn from '@/VueQuizPlugin/components/QuizQuestionAnswerBtn.vue';
import { useQuizStore } from '@/VueQuizPlugin/stores/QuizStore';

const store = useQuizStore();

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