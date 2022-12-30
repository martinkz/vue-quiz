<template>
  <div v-if="resultItem.type === 'personality'">
    <h1>{{ resultItem.result.title }}</h1>
  </div>
  <div v-else-if="resultItem.type === 'scored'">
    <h1>Congratulations, you scored {{ resultItem.result }}!</h1>
  </div>
  <div v-else>
    <h1>Unknown quiz type, no result calculated</h1>
  </div>
</template>

<script>
  // import QuizQuestionAnswerBtn from '@/components/QuizQuestionAnswerBtn.vue';

  export default {
    components: {
      
    },

    props: {
      resultItem: {
        type: Object,
        required: true,
      }
    },

    methods: {

    }
  }
</script>

<style scoped>

</style>