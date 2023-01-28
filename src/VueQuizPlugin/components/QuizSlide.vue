<template>
  <div ref="slideEl">
    <header class="slide-header">
      <slot v-if="store.currentSlideType==='question'" name="questionSlot" :data="slideData"></slot>
      
      <template v-if="store.currentSlideType==='result'">
        <slot name="resultSlot" :data="{ type, result } = slideData">
          <template v-if="type === 'personality'">
            <img v-if="result.image" class="slide-img" :src="result.image" alt="">
            <h1 v-if="result.title">{{ result.title }}</h1>
          </template>
          <template v-else-if="type === 'scored'">
            <h1>Congratulations, you scored {{ result }}!</h1>
          </template>
        </slot>
      </template>
    </header>

    <div v-if="store.currentSlideType==='result'" class="controls">
      <button class="btn-standard" type="button" @click="store.reset()">
        <slot name="playAgainBtn">Play again</slot>
      </button>
    </div>

    <div v-if="store.currentSlideType==='question'" class="quiz-answers-wrap">
      <QuizQuestionAnswerBtn v-for="(item, idx) in slideData.answers" :key="item" :item="item" :index="idx" />
    </div>
    <div v-if="options.nextButton" v-show="store.waiting" ref="controlsRef" class="controls">
      <button class="btn-standard" type="button" @click="store.nextStep()">
        <slot name="nextBtn">Next</slot>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import QuizQuestionAnswerBtn from '@/VueQuizPlugin/components/QuizQuestionAnswerBtn.vue';
import { useQuizStore } from '@/VueQuizPlugin/stores/QuizStore';
import { useOptionsStore } from '@/VueQuizPlugin/stores/OptionsStore';

const store = useQuizStore();
const options = useOptionsStore();
const slideEl = ref(null);

onMounted(() => {
  store.nextSlideHeight = slideEl.value.clientHeight;
});

if (options.nextButton) {
  watch(() => store.waiting, async() => {
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
