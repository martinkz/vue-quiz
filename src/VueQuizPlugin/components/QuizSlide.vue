<template>
  <div ref="slideEl">
    <slot name="questionSlot" :data="questionItem"></slot>
    <div class="quiz-answers-wrap">
      <QuizQuestionAnswerBtn v-for="(item, idx) in questionItem.answers" :key="item" :item="item" :index="idx" />
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
import { storeToRefs } from 'pinia';

const store = useQuizStore();
const options = useOptionsStore();
// const controlsRef = ref(null);
const slideEl = ref(null);
const { imageAspectRatio } = storeToRefs(options);
let btnHeight;

onMounted(() => {
  store.nextSlideHeight = slideEl.value.clientHeight;
  // console.log("Slide mounted: "+store.nextSlideHeight);
  // if (controlsRef.value) {
  //   controlsRef.value.style.display = 'block';
  //   btnHeight = controlsRef.value.getBoundingClientRect().height;
  //   controlsRef.value.style.display = 'none';
  // }
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
  questionItem: {
    type: Object,
    required: true,
  }
});
</script>
