<template>
  <div ref="resultSlideEl">
    <div v-if="resultItem.type === 'personality'">
      <div><img class="result-img" :src="resultItem.result.image" alt=""></div>
      <h1>{{ resultItem.result.title }}</h1>
    </div>
    <div v-else-if="resultItem.type === 'scored'">
      <h1>Congratulations, you scored {{ resultItem.result }}!</h1>
    </div>
    <div v-else>
      <h1>Unknown quiz type, no result calculated</h1>
    </div>
    <div class="controls">
      <button class="btn-standard" type="button" @click="store.reset()">Play again</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useQuizStore } from '@/VueQuizPlugin/stores/QuizStore';
import { useOptionsStore } from '@/VueQuizPlugin/stores/OptionsStore';
import { storeToRefs } from 'pinia';

const store = useQuizStore();
const options = useOptionsStore();
const { imageAspectRatio } = storeToRefs(options);

const resultSlideEl = ref(null);

onMounted(() => {
  store.nextSlideHeight = resultSlideEl.value.clientHeight;
})

defineProps({
  resultItem: {
    type: Object,
    required: true,
  }
})

</script>

<style scoped>
.result-img {
  display: block;
  aspect-ratio: v-bind(imageAspectRatio);
  width: 100%;
}
</style>