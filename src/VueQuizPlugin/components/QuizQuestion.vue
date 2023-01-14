<template>
	<div ref="slideEl">
		<h1>{{ questionItem.question }}</h1>
		<div><img class="question-img" :src="questionItem.image" alt=""></div>
		<QuizQuestionAnswerBtn v-for="(item,idx) in questionItem.answers" :key="item" :item="item" :index="idx" />
		<transition name="expand">
			<div v-if="options.nextButton" v-show="store.waiting" ref="controlsRef" class="controls">
					<button class="btn-standard" type="button" @click="store.nextStep()">Next</button>
			</div>
		</transition>
	</div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue"
import QuizQuestionAnswerBtn from '@/VueQuizPlugin/components/QuizQuestionAnswerBtn.vue';
import { useQuizStore } from '@/VueQuizPlugin/stores/QuizStore';
import { useOptionsStore } from '@/VueQuizPlugin/stores/OptionsStore';

const store = useQuizStore();
const options = useOptionsStore();
const controlsRef = ref(null)
let controlsHeight = ref(0)
let slideEl = ref(null);
let btnHeight;

onMounted(() => {
	store.nextSlideHeight = slideEl.value.clientHeight;
	// console.log(slideEl.value.getBoundingClientRect().height, slideEl.value.clientHeight);
	if (controlsRef.value) {
		controlsRef.value.style.display = 'block';
		btnHeight = controlsRef.value.getBoundingClientRect().height;
		controlsHeight.value = btnHeight + 'px';
		controlsRef.value.style.display = 'none';
	}
})

if (options.nextButton) {
	watch(() => store.waiting, () => {
		store.nextSlideHeight += btnHeight;
	})
}

defineProps({
	questionItem: {
		type: Object,
		required: true,
	}
})
</script>

<style scoped>
h1 {
	margin: 0;
	padding: 2rem;
	/* background: #6c5bdf; */
	background: #40aec7;
}
.question-img {
	display: block;
	aspect-ratio: 3 / 2;
	width: 100%;
	/* width: 900px;
	height: 600px; */
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