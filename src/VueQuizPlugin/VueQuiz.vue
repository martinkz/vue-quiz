<template>
  <div v-if="!store.loading" class="quiz-container">
    <header class="quiz-header">
      <QuizTimer v-if="options.timedQuiz" />
      <div class="progress-bar">
        <label class="sr-only" for="progress">Your progress</label>
        <progress id="progress" :value="store.progressBarValue" :max="store.numQuestions+1"> {{ store.numQuestions / store.currentQuestion }}</progress>
      </div>
      <div class="status">{{ `${store.currentQuestion} / ${store.numQuestions}` }}</div>
    </header>
    <section ref="slideWrapEl" class="quiz-slide-wrap">
      <Transition :name="slideTransition">
        <QuizSlide 
        :key="store.currentQuestionData" 
        :slide-data="store.currentQuestionData" 
        class="quiz-slide">
          <template v-for="(slot, index) of Object.keys($slots)" :key="index" #[slot]="slotProps">
            <slot :name="slot" :slot-props="slotProps.data"></slot>
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

<style scoped>
.quiz-container {
  width: 100%;
  border-radius: 20px;
  box-shadow:0 0 15px rgba(0,0,0,0.2);
  overflow: hidden;
}
.quiz-slide-wrap {
  display: grid;
  grid-template-columns: 1fr;
  justify-items: start;
  align-items: start;
  text-align: center;
  transition: all 0.4s linear;
  height: v-bind(height);
}

.quiz-slide {
  width: 600px;
  max-width: 100%;
  grid-row: 1;
  grid-column: 1;
}

.quiz-animation-enter-active,
.quiz-animation-leave-active {
  transition: opacity 0.4s linear;
  
}
.quiz-animation-enter-from,
.quiz-animation-leave-to {
  opacity: 0;
}
.quiz-animation-enter-to,
.quiz-animation-leave-from {
  opacity: 1;
}

.quiz-header {
  display: flex;
  justify-content: stretch;
  align-items: center;
  font-size: 1.2rem;
  gap: 2rem;
  padding: 1.5rem 2rem;
  /* background: #493aa9; */
  background: #423d3a;
}
.progress-bar {
  flex: 1 1 auto;
}
progress {
  display: block;
  border-radius: 9px;
  width: 100%;
  height: 16px;
  border: none;
  overflow: hidden;
}
progress::-webkit-progress-bar {
  background: #62605e;
  border-radius: 9px;
}
progress::-webkit-progress-value {
  background: #ddd5cf;
  border-radius: 9px;
}
progress::-moz-progress-bar {
  background: #ddd5cf;
  border-radius: 9px;
}
</style>
