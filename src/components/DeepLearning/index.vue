<template>
  <div>
    <p>当前训练数据总量 : {{ dataAmount }}</p>
    <p>当前测试数据总量 : {{ testAmount }}</p>
    <div class="panel">
      <el-button :disabled="isTraining" :loading="isTraining" @click="startTrain" style="width:130px">开始学习</el-button>
      <el-progress :percentage="processPercent" status="success" style="width:600px;margin-left: 50px"></el-progress>
    </div>
    <div id="loss"></div>
  </div>
</template>

<script>

export default {
  name: 'DeepLearning',
  props: ['Xtrain', 'Ytrain', 'Xtest', 'Ytest', 'layersNumber', 'neuronsNumber', 'epochs', 'batchSize'],
  data () {
    return {
      isTraining: false,
      currentEpoch: [],
      currentLoss: [],
      processPercent: 0
    }
  },
  computed: {
    dataAmount: function () {
      return this.Xtrain ? this.Xtrain.data.length : 0
    },
    testAmount: function () {
      return this.Xtest ? this.Xtest.data.length : 0
    },
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
    async startTrain () {
      this.reset()
      const model = this.$tf.sequential()
      model.add(this.$tf.layers.dense({
        units: 12,
        inputShape: [this.Xtrain.data[0].length]
      }))
      model.add(this.$tf.layers.dense({ units: 1 }))
      model.compile({
        loss: this.$tf.losses.meanSquaredError,
        optimizer: this.$tf.train.sgd(0.1)
      })
      const inputs = this.$tf.tensor(this.Xtrain.data)
      const labels = this.$tf.tensor(this.Ytrain.data)
      const callbacks = {
        onEpochEnd: (epoch, logs) => {
          this.currentEpoch.push(epoch)
          this.currentLoss.push(logs.loss)
          this.processPercent = ((epoch + 1) / this.epochs) * 100
        },
        onTrainBegin: logs => {
          this.isTraining = !this.isTraining
        },
        onTrainEnd: logs => {
          this.isTraining = !this.isTraining
        }
      }
      await model.fit(inputs, labels, {
        batchSize: this.batchSize,
        epochs: this.epochs,
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
.panel {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

#loss {
  width: 500px;
  height: 500px;
}
</style>
