<template>
  <div class="article-wrapper">this is training
    <button @click="show">123</button>
  </div>
</template>

<script>
export default {
  name: 'Training',
  inject: ['getData'],
  computed: {
    aaa: function () {
      return this.getData()
    }
  },
  methods: {
    show () {
      console.log(this.aaa)
    }
  }
}
</script>

<style scoped>

</style>
