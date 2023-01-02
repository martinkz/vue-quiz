<template>
  <div>
    <div v-if="resultItem.type === 'personality'">
      <h1>{{ resultItem.result.title }}</h1>
    </div>
    <div v-else-if="resultItem.type === 'scored'">
      <h1>Congratulations, you scored {{ resultItem.result }}!</h1>
    </div>
    <div v-else>
      <h1>Unknown quiz type, no result calculated</h1>
    </div>
    <div class="controls">
      <button type="button" @click="store.reset()">Play again</button>
    </div>
  </div>
</template>

<script setup>
import { useQuizStore } from '@/stores/QuizStore';

const store = useQuizStore();

defineProps({
  resultItem: {
    type: Object,
    required: true,
  }
})

</script>

<style scoped>

</style>