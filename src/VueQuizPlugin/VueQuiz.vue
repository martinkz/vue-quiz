<template>
  <div v-if="!store.loading" class="quiz-container">
    <header class="quiz-header">
      <QuizTimer v-if="options.timedQuiz" />
      <div class="progress-bar">
        <label class="sr-only" for="progress">Your progress</label>
        <progress id="progress" :value="store.currentQuestion" :max="store.numSlides"> {{ store.numSlides / store.currentQuestion }}</progress>
      </div>
      <div class="status">{{ `${store.currentQuestion} / ${store.numSlides}` }}</div>
    </header>
    <section ref="slideWrapEl" class="quiz-slide-wrap">
      <Transition name="slide-up">
        <QuizSlide v-if="!store.showResult" :key="store.currentQuestionData" :question-item="store.currentQuestionData" class="quiz-slide">
          <template v-for="(slot, index) of Object.keys($slots)" :key="index" #[slot]="slotProps">
            <slot :name="slot" :slot-props="slotProps.data"></slot>
          </template>
        </QuizSlide>
        <QuizResult v-else class="quiz-slide" :result-item="store.getResultItem()" />
      </Transition>
    </section>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from "vue"
import QuizSlide from '@/VueQuizPlugin/components/QuizSlide.vue'
import QuizResult from '@/VueQuizPlugin/components/QuizResult.vue'
import QuizTimer from '@/VueQuizPlugin/components/QuizTimer.vue'
import { useQuizStore } from '@/VueQuizPlugin/stores/QuizStore'
import { useOptionsStore } from '@/VueQuizPlugin/stores/OptionsStore'

const store = useQuizStore()
store.init()

const props = defineProps({
  options: {
    type: Object,
    required: false,
    default: () => ({})
  }
})

const options = useOptionsStore()
options.update(props.options)

const height = ref('auto');

watch(() => store.nextSlideHeight, (newVal) => {
  if (!store.initialLoad) {
    // console.log('VueQuiz: ' + newVal, store.initialLoad);
    height.value = newVal + 'px';
  }
})

watch(() => store.waiting, () => {
  if (store.initialLoad) {
    store.nextSlideHeight = slideWrapEl.value.clientHeight;
    // console.log("store.waiting 2: " + store.nextSlideHeight);
    store.initialLoad = false;
  }
});

const slideWrapEl = ref(null);

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
  /* overflow: hidden; */
}

.quiz-slide {
  width: 100%;
  grid-row: 1;
  grid-column: 1;
  /* overflow: hidden; */
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: opacity 0.4s linear;
  
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
}
.slide-up-enter-to,
.slide-up-leave-from {
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
