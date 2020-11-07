<template>
  <vue-echarts :options="options"/>
</template>

<script>
import 'echarts/extension/bmap/bmap'

const point = [{
  name: '北海道と東北',
  value: [142.865199, 43.216122, 353.25]
}, {
  name: '東京',
  value: [139.74534, 35.656749, 4793.99]
}, {
  name: '近畿',
  value: [135.786426, 34.996498, 3641.55]
}, {
  name: '九州沖縄',
  value: [130.41034, 33.576881, 3136.74]
}, {
  name: '四国',
  value: [134.551158, 34.074235, 1120.94]
}, {
  name: '中部',
  value: [138.194771, 36.652289, 4503.64]
}, {
  name: '中国',
  value: [132.455293, 34.391876, 1448.22]
}]
const point2 = [
  {
    name: '東京',
    value: [139.74534, 35.656749, 4793.99]
  }, {
    name: '中部',
    value: [138.194771, 36.652289, 4503.64]
  }, {
    name: '近畿',
    value: [135.786426, 34.996498, 3641.55]
  }
]
export default {
  name: 'RightGraph',
  data () {
    return {
      options: {}
    }
  },
  mounted () {
    this.options = {
      title: {
        text: '区域级光伏预测'
      },
      bmap: {
        key: 'dZKgqGzvGcdGkK8sT3b7P9OAt2z2aPgs',
        center: [139.744477, 35.658626],
        zoom: 6,
        roam: true
      },
      tooltip: {
        formatter: function (e) {
          return e.name + ': ' + e.value[2] + '[kw]'
        }
      },
      series: [{
        name: 'PV output',
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: point,
        encode: {
          value: 2
        },
        itemStyle: {
          color: '#1E8449',
          opacity: 0.5
        },
        symbolSize: (val) => {
          return val[2] / 100
        },
        label: {
          show: false,
          position: 'right',
          formatter: (v) => {
            return v.name
          }
        },
        emphasis: {
          label: { show: true }
        }
      }, {
        name: 'top 3',
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        data: point2,
        itemStyle: {
          color: '#1E8449',
          opacity: 0.5
        },
        symbolSize: (val) => {
          return val[2] / 100
        },
        encode: { value: 2 },
        label: {
          show: true,
          position: 'right',
          formatter: (v) => {
            return v.name
          }
        },
        hoverAnimation: true,
        rippleEffect: { brushType: 'stroke' }
      }]
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
