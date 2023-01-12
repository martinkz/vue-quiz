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
    <section class="quiz-slide-wrap">
      <Transition name="slide-up">
        <QuizQuestion 
        v-if="!store.showResult"
        :key="store.currentQuestionData"
        :question-item="store.currentQuestionData"
        class="quiz-slide" />
        <QuizResult v-else class="quiz-slide" :result-item="store.getResultItem()" />
      </Transition>
    </section>
  </div>
</template>

<script setup>
// import { reactive } from "vue"
import QuizQuestion from '@/VueQuizPlugin/components/QuizQuestion.vue'
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
</script>


<style scoped>
.quiz-container {
  border-radius: 20px;
  box-shadow:0 0 15px rgba(0,0,0,0.2);
  overflow: hidden;
}
.quiz-slide-wrap {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  /* background: #6c5bdf; */
  background: #40aec7;
  overflow: hidden;
  text-align: center;
}

.quiz-slide {
  grid-row: 1;
  grid-column: 1;
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.2s linear;
  
}
.slide-up-enter-from {
  opacity: 0;
  translate: 0 100px;
}
.slide-up-leave-to {
  opacity: 0;
  translate: 0 -100px;
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
