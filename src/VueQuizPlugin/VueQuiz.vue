<template>
  <div v-if="!store.loading" class="quiz-slide-wrap">
    <Transition name="slide-up">
      <QuizQuestion 
      v-if="!store.showResult"
      :key="store.currentQuestionData"
      :question-item="store.currentQuestionData"
      class="quiz-slide" />
      <QuizResult v-else class="quiz-slide" :result-item="store.getResultItem()" />
    </Transition>
  </div>
</template>

<script setup>
// import { reactive } from "vue"
import QuizQuestion from '@/VueQuizPlugin/QuizQuestion.vue'
import QuizResult from '@/VueQuizPlugin/QuizResult.vue'
import { useQuizStore } from '@/stores/QuizStore'

const store = useQuizStore()
store.init()
</script>


<style scoped>
  .quiz-slide-wrap {
    display: grid;
    grid-template-columns: 1fr;
  }

  .quiz-slide {
    grid-row: 1;
    grid-column: 1;
  }

  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: all 0.25s linear;
		
  }

  .slide-up-enter-from {
    opacity: 0;
    translate: 0 200px;
  }

  .slide-up-leave-to {
    opacity: 0;
    translate: 0 -200px;
  }
</style>
