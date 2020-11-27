<template>
  <div>
    <div id="DynamicG"></div>
  </div>
</template>

<script>

const axisData = []
export default {
  name: 'DynamicGraph',
  props: ['forecastResult', 'Ytest'],
  data () {
    return {
      n: 0
    }
  },
  created () {
    for (let i = 0; i < 24; i = i + 0.5) {
      const hour = i.toString().split('.')[0]
      const minutes = i.toString().split('.')[1] ? '30' : '00'
      axisData.push(hour + ':' + minutes)
    }
  },
  computed: {
    x: function () {
      return this.slideWindow(this.n + 29, axisData)
    },
    y1: function () {
      return this.slideWindow(this.n, this.forecastResult)
    },
    y2: function () {
      return this.slideWindow(this.n, this.Ytest, 6)
    },
    option () {
      return {
        title: {
          text: '单台光伏的预测数据'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['实际功率', '预测功率']
        },
        xAxis: {
          data: this.x
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
          data: this.y2
        }, {
          name: '预测功率',
          type: 'line',
          data: this.y1
        }]
      }
    }
  },
  mounted () {
    const DynamicG = document.getElementById('DynamicG')
    const chart = this.$echarts.init(DynamicG)
    this.timer = setInterval(() => {
      chart.setOption(this.option)
      this.n = (this.n + 1) % this.Ytest.length
    }, 1000)
  },
  methods: {
    slideWindow: function (n, array, length = 7) {
      if (array.length < 1) return []
      if (n >= array.length) {
        n = n % array.length
      }
      const res = []
      for (let i = 0; i < length; i++) {
        const q = (i + n) >= array.length ? (i + n) % array.length : (i + n)
        res.push(array[q])
      }
      return res
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
#DynamicG {
  margin-top: 30px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 500px;
}
</style>
