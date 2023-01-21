<template>
  <div ref="introSlideEl">
    <div>
      <h1>{{ introItem.title }}</h1>
      <div><img class="img" :src="introItem.image" alt=""></div>
      <!-- <p>{{ introItem.text }}</p> -->
    </div>
    <div class="controls">
      <button class="btn-standard" type="button" @click="store.start()">Start</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuizStore } from '@/VueQuizPlugin/stores/QuizStore';
import { useOptionsStore } from '@/VueQuizPlugin/stores/OptionsStore';
import { storeToRefs } from 'pinia';

const store = useQuizStore();
const options = useOptionsStore();
const { imageAspectRatio } = storeToRefs(options);

const introSlideEl = ref(null);

onMounted(() => {
  store.nextSlideHeight = introSlideEl.value.clientHeight;
});

defineProps({
  introItem: {
    type: Object,
    required: true,
  }
})

</script>

<style scoped>
.img {
  display: block;
  aspect-ratio: v-bind(imageAspectRatio);
  width: 100%;
}
</style>