<template>
  <div id="left-chart"></div>
</template>

<script>
export default {
  name: 'LeftGraph',
  mounted () {
    const chartDom = document.getElementById('left-chart')
    const chart = this.$echarts.init(chartDom)
    const axisData = []
    const dataReal = [0.59, 0.95, 1.51, 2.09, 2.27, 2.46, 2.60, 2.66, 2.72, 2.69, 2.52, 2.50, 2.36, 2.19, 1.95, 1.63, 1.25, 0.82, 0.47, 0.21, 0.07, 0.04, 0.00]
    const dataPre = [0.02, 0.76, 1.09, 1.69, 2.24, 2.31, 2.45, 2.52, 2.54, 2.56, 2.49, 2.26, 2.26, 2.07, 1.89, 1.61, 1.27, 0.93, 0.52, 0.27, 0.08, 0.01, 0.02]
    for (let i = 7; i <= 18; i = i + 0.5) {
      const hour = i.toString().split('.')[0]
      const minutes = i.toString().split('.')[1] ? '30' : '00'
      axisData.push(hour + ':' + minutes)
    }

    let n = 0
    setInterval(() => {
      const option = {
        title: {
          text: '单台光伏的预测数据'
        },
        legend: {
          data: ['实际功率', '预测功率']
        },
        xAxis: {
          data: (function () {
            const res = []
            for (let i = 0; i < 7; i++) {
              const q = (i + n) >= axisData.length ? (i + n) % axisData.length : (i + n)
              res.push(axisData[q])
            }
            return res
          })()
        },
        yAxis: {
          type: 'value',
          scale: true,
          name: 'PV功率',
          max: 3,
          min: 0
        },
        series: [{
          name: '实际功率',
          type: 'bar',
          data: (function () {
            const res = []
            for (let i = 0; i < 7; i++) {
              const q = (i + n) >= axisData.length ? (i + n) % axisData.length : (i + n)
              res.push(dataReal[q])
            }
            return res
          })()
        }, {
          name: '预测功率',
          type: 'line',
          data: (function () {
            const res = []
            for (let i = 0; i < 7; i++) {
              const q = (i + n) >= axisData.length ? (i + n) % axisData.length : (i + n)
              res.push(dataPre[q])
            }
            return res
          })()
        }]
      }

      chart.setOption(option)

      n = (n + 1) % axisData.length
    }, 2000)
  }
}
</script>

<style scoped>
#left-chart{
  width: 600px;
  height: 500px;
}
</style>
