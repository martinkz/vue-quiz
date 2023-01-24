<template>
  <div ref="slideEl">
    <slot name="questionSlot" :data="questionItem"></slot>
    <QuizQuestionAnswerBtn v-for="(item, idx) in questionItem.answers" :key="item" :item="item" :index="idx" />
    <div v-if="options.nextButton" v-show="store.waiting" ref="controlsRef" class="controls">
      <button class="btn-standard" type="button" @click="store.nextStep()">
        <slot name="nextBtn"></slot>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import QuizQuestionAnswerBtn from '@/VueQuizPlugin/components/QuizQuestionAnswerBtn.vue';
import { useQuizStore } from '@/VueQuizPlugin/stores/QuizStore';
import { useOptionsStore } from '@/VueQuizPlugin/stores/OptionsStore';
import { storeToRefs } from 'pinia';

const store = useQuizStore();
const options = useOptionsStore();
const controlsRef = ref(null);
const controlsHeight = ref(0);
const slideEl = ref(null);
const { imageAspectRatio } = storeToRefs(options);
let btnHeight;

onMounted(() => {
  store.nextSlideHeight = slideEl.value.clientHeight;

  if (controlsRef.value) {
    controlsRef.value.style.display = 'block';
    btnHeight = controlsRef.value.getBoundingClientRect().height;
    controlsRef.value.style.display = 'none';
    controlsHeight.value = btnHeight + 'px';
  }
});

if (options.nextButton) {
  watch(() => store.waiting, () => {
    store.nextSlideHeight += btnHeight;
  });
}

defineProps({
  questionItem: {
    type: Object,
    required: true,
  }
});
</script>

<style scoped>
h1 {
  margin: 0;
  padding: 2rem;
  /* background: #6c5bdf; */
  background: #40aec7;
}
</style>