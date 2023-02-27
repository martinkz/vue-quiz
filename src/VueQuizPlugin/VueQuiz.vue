<template>
  <div v-if="!store.loading" class="quiz-container">
    <header class="quiz-header">
      <QuizTimer v-if="options.timedQuiz" />
      <div class="quiz-progress-bar">
        <label class="sr-only" for="progress">Your progress</label>
        <progress class="quiz-progress" :value="store.progressBarValue" :max="store.numQuestions+1"> {{ store.numQuestions / store.currentQuestion }}</progress>
      </div>
      <div v-if="store.currentQuestion > 0" class="quiz-status">
        <slot name="currentStatus" :status="{ 'currentQuestion': store.currentQuestion, 'max': store.numQuestions }">{{ `${store.currentQuestion} / ${store.numQuestions}` }}</slot>
      </div>
    </header>
    <section ref="slideWrapEl" class="quiz-slide-wrap">
      <Transition :name="slideTransition">
        <QuizSlide 
        :key="store.currentQuestionData" 
        :slide-data="store.currentQuestionData" 
        class="quiz-slide">
          <template v-for="(slot, index) of Object.keys($slots)" :key="index" #[slot]="slotProps">
            <slot :name="slot" :slot-props="slotProps.data ?? slotProps.answerProps"></slot>
          </template>
        </QuizSlide>
      </Transition>
    </section>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, nextTick, provide, inject } from "vue"
import QuizSlide from '@/VueQuizPlugin/components/QuizSlide.vue'
import QuizTimer from '@/VueQuizPlugin/components/QuizTimer.vue'
import { useQuizStore } from '@/VueQuizPlugin/stores/QuizStore'
import { v4 } from "uuid";

const componentId = v4();
provide('componentId', componentId);

const options = {
  ...inject('pluginUseOptions'),
  ...props.options
};
provide('componentOptions', options);

const store = useQuizStore(componentId);
store.init(options);

const props = defineProps({
  options: {
    type: Object,
    required: false,
    default: () => ({})
  }
});

const slideTransition = computed(() => {
  return options.animation ? 'quiz-animation' : '';
});

const slideWrapEl = ref(null);
const height = ref('auto');

if (options.animation) {
  watch(() => store.nextSlideHeight, (newVal) => {
    if (!store.initialLoad) {
      // console.log('Height change watch: ' + newVal, store.initialLoad);
      height.value = newVal + 'px';
    }
  });

  watch(() => store.triggerHeightCalc, () => {
    // console.log("triggerHeightCalc: " + store.triggerHeightCalc)
    if (store.initialLoad && store.triggerHeightCalc) {
      store.nextSlideHeight = slideWrapEl.value.clientHeight;
      // console.log("store.waiting from VueQuiz: " + store.nextSlideHeight);
      store.initialLoad = false;
      store.triggerHeightCalc = false;
    }
  });

  onMounted(() => {
    onResize();
  });

  const onResize = () => {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateSlideHeight, 200);
    });
  };

  const updateSlideHeight = async () => {
    if (slideWrapEl.value !== null) {
      height.value = 'auto';
      await nextTick(); // Might not be needed?
      store.nextSlideHeight = slideWrapEl.value.clientHeight;
      store.initialLoad = false;
    }
  }
}
</script>

<style src="./assets/style.css"></style>

<style>
.quiz-slide-wrap {
  transition: all 0.4s linear;
  height: v-bind(height);
}
</style>
