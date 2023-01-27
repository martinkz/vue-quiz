<template>
  <div ref="slideEl">
    <div v-if="resultItem.type === 'personality'">
      <div><img class="result-img" :src="resultItem.result.image" alt=""></div>
      <h1>{{ resultItem.result.title }}</h1>
    </div>
    <div v-else-if="resultItem.type === 'scored'">
      <h1>Congratulations, you scored {{ resultItem.result }}!</h1>
    </div>
    <div class="controls">
      <button class="btn-standard" type="button" @click="store.reset()">Play again</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from "vue"
import { useQuizStore } from '@/VueQuizPlugin/stores/QuizStore';
import { useOptionsStore } from '@/VueQuizPlugin/stores/OptionsStore';

const store = useQuizStore();
const options = useOptionsStore();


const slideEl = ref(null);

onMounted(() => {
  store.nextSlideHeight = slideEl.value.clientHeight;
})

if (options.nextButton) {
  watch(() => store.waiting, async () => {
    await nextTick();
    if (slideEl.value) {
      store.nextSlideHeight = slideEl.value.clientHeight;
      // console.log("QuizSlide store.waiting: " + store.nextSlideHeight);
    }
  });
}

defineProps({
  resultItem: {
    type: Object,
    required: true,
  }
})

</script>

