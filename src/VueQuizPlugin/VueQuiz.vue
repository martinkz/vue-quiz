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
import QuizQuestion from '@/VueQuizPlugin/components/QuizQuestion.vue'
import QuizResult from '@/VueQuizPlugin/components/QuizResult.vue'
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
