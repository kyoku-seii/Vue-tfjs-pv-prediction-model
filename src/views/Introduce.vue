<template>
  <div class="article-wrapper">
    <div class="article">
      <h1>title</h1>
      <div>这里将是介绍页</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'A',
  mounted () {
    console.log(2222)
  }
}
</script>

<style lang="scss" scoped>
.article-wrapper {
  max-width: 1000px;
  word-wrap: break-word;
  word-break: break-all;
}
</style>
