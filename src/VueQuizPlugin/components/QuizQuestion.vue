<template>
	<div>
		<h1>{{ questionItem.question }}</h1>
		<div><img class="question-img" :src="questionItem.image" alt=""></div>
		<QuizQuestionAnswerBtn v-for="item in questionItem.answers" :key="item" :item="item" />
		<transition name="expand">
			<div v-if="options.nextButton" v-show="store.waiting" ref="controlsRef" class="controls">
					<button type="button" @click="store.nextStep()">Next</button>
			</div>
		</transition>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import QuizQuestionAnswerBtn from '@/VueQuizPlugin/components/QuizQuestionAnswerBtn.vue';
import { useQuizStore } from '@/VueQuizPlugin/stores/QuizStore';
import { useOptionsStore } from '@/VueQuizPlugin/stores/OptionsStore';

const store = useQuizStore();
const options = useOptionsStore();
const controlsRef = ref(null)
let controlsHeight = ref(0)

onMounted(() => {
	if (controlsRef.value) {
		controlsRef.value.style.display = 'block';
		controlsHeight.value = controlsRef.value.getBoundingClientRect().height + 'px';
		controlsRef.value.style.display = 'none';
	}
})

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

.expand-leave-active,
.expand-enter-active {
	transition: all 300ms ease;
	overflow: hidden;
}

.expand-enter-to,
.expand-leave-from {
	height: v-bind(controlsHeight);
}

.expand-enter-from,
.expand-leave-to {
	height: 0;
}
</style>