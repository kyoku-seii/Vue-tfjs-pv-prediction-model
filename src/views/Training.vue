<template>
  <div class="article-wrapper">this is training</div>
</template>

<script>
export default {
  name: 'Training',
  inject: ['getTrainingData'],
  computed: {
    TrainingData () {
      return this.getTrainingData()
    }
  }
}
</script>

<style scoped>

</style>
