<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
html, body, #app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

.article-wrapper {
  max-width: 1000px;
  word-wrap: break-word;
  word-break: break-all;

  .graph {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin: 30px 0;
    width: 400px;
    height: 400px;
  }

  h1, h2, h3 {
    color: #273849;
    font-weight: bolder;
    font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  }

  p {
    margin: 1.2em 0;
    line-height: 1.6em;
    word-spacing: 0.05em;
    font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
    font-size: 1rem;
    color: #304455;
  }
}
</style>
