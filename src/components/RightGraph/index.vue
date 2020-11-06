<template>
  <vue-echarts :options="data"/>
</template>

<script>
export default {
  name: 'RightGraph',
  data () {
    return {
      data: {
        xAxis: { type: 'category' },
        yAxis: {},
        series: [{
          type: 'line',
          data: [100, 200, 300]
        }]
      }
    }
  }
}
</script>

<style scoped>
.echarts {
  width: 600px;
  height: 500px;
}
</style>
