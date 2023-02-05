<template>
  <div ref="slideEl">
    <section class="slide-header">
      <slot v-if="store.currentSlideType==='intro'" name="intro" :data="slideData">
        <h1 v-if="slideData.title">{{ slideData.title }}</h1>
        <img v-if="slideData.image" class="slide-img" :src="slideData.image" alt="">
      </slot>
      
      <slot v-if="store.currentSlideType==='question'" name="question" :data="slideData">
        <h1 v-if="slideData.question">{{ slideData.question }}</h1>
        <img v-if="slideData.image" class="slide-img" :src="slideData.image" alt="">
      </slot>
      
      <template v-if="store.currentSlideType==='result'">
        <slot name="result" :data="{ type, result } = slideData">
          <template v-if="type === 'personality'">
            <img v-if="result.image" class="slide-img" :src="result.image" alt="">
            <h1 v-if="result.title">{{ result.title }}</h1>
          </template>
          <template v-else-if="type === 'scored'">
            <h1>Congratulations, you scored {{ result.score }}!</h1>
          </template>
        </slot>
      </template>
    </section>

    <div v-if="store.currentSlideType==='question'" class="quiz-answers-wrap">
      <QuizQuestionAnswerBtn v-for="(item, idx) in slideData.answers" :key="item" :item="item" :index="idx" />
    </div>

    <div v-if="store.currentSlideType==='intro'" class="controls">
      <button class="quiz-btn-standard" type="button" @click="store.triggerHeightCalc=true; store.start()">Start</button>
    </div>

    <div v-if="store.currentSlideType === 'question' && options.nextButton" v-show="store.waiting" class="controls">
      <button class="quiz-btn-standard" type="button" @click="store.nextStep()">
        <slot name="nextBtn">Next</slot>
      </button>
    </div>

    <div v-if="store.currentSlideType==='result'" class="controls">
      <button class="quiz-btn-standard" type="button" @click="store.reset()">
        <slot name="playAgainBtn">Play again</slot>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, inject } from "vue";
import QuizQuestionAnswerBtn from '@/VueQuizPlugin/components/QuizQuestionAnswerBtn.vue';
import { useQuizStore } from '@/VueQuizPlugin/stores/QuizStore';

const componentId = inject('componentId');
const store = useQuizStore(componentId);
const options = inject('componentOptions');
const slideEl = ref(null);

onMounted(() => {
  store.nextSlideHeight = slideEl.value.clientHeight;
});

if (options.nextButton) {
  watch(() => store.waiting, async() => {
    // console.log("QuizSlide pre-tick height: " + slideEl.value.clientHeight);
    await nextTick();
    if (slideEl.value) { // For some reason this watcher only triggers on store.waiting = true, but when <VueQuiz> is empty (no slots or other content), it triggers on false too, causing a console error
      store.nextSlideHeight = slideEl.value.clientHeight;
      // console.log("QuizSlide store.waiting: " + store.nextSlideHeight);
    }
  });
}

defineProps({
  slideData: {
    type: Object,
    required: true,
  }
});
</script>
