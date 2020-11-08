<template>
  <div>
    <button @click="test">start</button>
    <div id="chartDom"></div>
  </div>
</template>

<script>
import * as tf from '@tensorflow/tfjs'

const xs = [1, 2, 3, 4]
const ys = [1, 3, 5, 7]
export default {
  name: 'SingleModel',
  data () {
    return {
      currentEpoch: [],
      epoch: 50,
      currentLoss: []
    }
  },
  computed: {
    option: function () {
      return {
        xAxis: {
          boundaryGap: false,
          data: this.currentEpoch
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          type: 'line',
          data: this.currentLoss,
          showSymbol: false
        }]
      }
    }
  },
  watch: {
    option: function () {
      this.draw()
    }
  },
  methods: {
    reset () {
      this.currentEpoch = []
      this.currentLoss = []
    },
    draw () {
      const chartDom = document.getElementById('chartDom')
      const chart = this.$echarts.init(chartDom)
      chart.setOption(this.option)
    },
    async test () {
      this.reset()
      console.log(this.currentEpoch)
      const model = tf.sequential()
      model.add(tf.layers.dense({
        units: 1,
        inputShape: [1]
      }))
      model.compile({
        loss: tf.losses.meanSquaredError,
        optimizer: tf.train.sgd(0.1)
      })
      const inputs = tf.tensor(xs)
      const labels = tf.tensor(ys)
      const callbacks = {
        onEpochEnd: (epoch, logs) => {
          this.currentEpoch.push(epoch)
          this.currentLoss.push(logs.loss)
        }
      }
      await model.fit(inputs, labels, {
        batchSize: 2,
        epochs: this.epoch,
        callbacks: callbacks
      })

      const output = model.predict(tf.tensor([5]))
      console.log(output.dataSync())
    }
  },
  mounted () {
    const chartDom = document.getElementById('chartDom')
    const chart = this.$echarts.init(chartDom)
    chart.setOption(this.option)
    fetch('/data/id1_data.json')
      .then(function (response) {
        return response.json()
      })
      .then(function (myJson) {
        console.log(myJson)
      })
  }
}
</script>

<style scoped>
#chartDom {
  width: 600px;
  height: 500px;
}
</style>
