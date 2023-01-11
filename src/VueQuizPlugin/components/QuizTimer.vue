<template>
  <div>
    <span>{{ time }}</span>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useQuizStore } from '@/VueQuizPlugin/stores/QuizStore';
import { useOptionsStore } from '@/VueQuizPlugin/stores/OptionsStore'

const store = useQuizStore();
const options = useOptionsStore()

let time = ref('');

watch(() => store.timerActive, (newVal) => {
  if (newVal === true) {
    startTimer(options.timer);
  }
});

function startTimer(duration) {
  let timer = duration;
  let minutes, seconds;

  let timerInterval = setInterval(function timerFunc() {
    minutes = parseInt(timer / 60, 10); 
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    time.value = minutes + ":" + seconds;

    if (--timer < 0) {
      clearInterval(timerInterval);
      time.value = "";
      store.endEarly();
    }
    // Return function and execute immediately, so that you don't have to wait for at least one 1s interval
    return timerFunc;
  }(), 1000);
}
</script>

<style scoped>

</style>