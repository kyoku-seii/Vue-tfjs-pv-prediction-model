<template>
  <div>
    <button @click="show"></button>
    <el-button :disabled="isTraining" :loading="isTraining" @click="run" style="width:130px">开始学习</el-button>
    <div id="loss"></div>
  </div>
</template>

<script>
import * as tf from '@tensorflow/tfjs'

export default {
  name: 'DeepLearning',
  props: ['Xtrain', 'Ytrain', ' epoch'],
  data () {
    return {
      isTraining: false,
      currentEpoch: [],
      currentLoss: [],
      processPercent: 0
    }
  },
  computed: {
    option: function () {
      return {
        xAxis: {
          name: '次数',
          boundaryGap: false,
          data: this.currentEpoch
        },
        yAxis: {
          name: '误差',
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
      const lossGraph = this.$echarts.init(document.getElementById('loss'))
      lossGraph.setOption(this.option)
    }
  },
  methods: {
    reset () {
      this.processPercent = 0
      this.currentEpoch = []
      this.currentLoss = []
    },
    show () {
      const inputs = tf.tensor(this.Xtrain.data)
      const labels = tf.tensor(this.Ytrain.data)
      console.log(labels.shape, inputs.shape)
    },
    async run () {
      this.reset()
      const model = tf.sequential()
      model.add(tf.layers.dense({
        units: 12,
        inputShape: [this.Xtrain.data[0].length]
      }))
      model.add(tf.layers.dense({ units: 1 }))
      model.compile({
        loss: tf.losses.meanSquaredError,
        optimizer: tf.train.sgd(0.1)
      })
      const inputs = tf.tensor(this.Xtrain.data)
      const labels = tf.tensor(this.Ytrain.data)
      const callbacks = {
        onEpochEnd: (epoch, logs) => {
          this.currentEpoch.push(epoch)
          this.currentLoss.push(logs.loss)
        },
        onTrainBegin: logs => {
          this.isTraining = !this.isTraining
        },
        onTrainEnd: logs => {
          this.isTraining = !this.isTraining
        }
      }
      await model.fit(inputs, labels, {
        batchSize: 200,
        epochs: 20,
        callbacks: callbacks
      })
    }
  },
  mounted () {
    const lossGraph = this.$echarts.init(document.getElementById('loss'))
    lossGraph.setOption(this.option)
  }
}
</script>

<style scoped>
#loss {
  width: 400px;
  height: 400px;
}
</style>
