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

const time = ref(formatTime(options.timer));
let timerInterval;

if (store.timerActive === true) {
  startTimer(options.timer);
}

watch(() => store.timerActive, (newVal) => {
  if (newVal === true) {
    startTimer(options.timer);
  } else {
    clearInterval(timerInterval);
  }
});

function startTimer(duration) {
  let timer = duration;

  timerInterval = setInterval(function timerFunc() {
    time.value = formatTime(timer);

    if (--timer < 0) {
      clearInterval(timerInterval);
      time.value = "00:00";
      store.endEarly();
    }
    // Return function and execute immediately, so that you don't have to wait for at least one 1s interval
    return timerFunc;
  }(), 1000);
}

function formatTime(timer) {
  let minutes, seconds;

  minutes = parseInt(timer / 60, 10);
  seconds = parseInt(timer % 60, 10);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return minutes + ":" + seconds;
}
</script>

<style scoped>

</style>