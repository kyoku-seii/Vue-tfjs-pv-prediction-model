<template>
  <div>
    <p>当前训练数据总量 : {{ dataAmount }}</p>
    <p>当前验证数据总量 : {{ validAmount }}</p>
    <p>当前测试数据总量 : {{ testAmount }}</p>
    <div class="panel">
      <el-button :disabled="isTraining" :loading="isTraining" @click="startTrain" style="width:130px">开始学习</el-button>
      <el-progress :percentage="processPercent" status="success" style="width:600px;margin-left: 50px"></el-progress>
    </div>
    <div class="lossWrapper">
      <div id="loss"></div>
      <div id="validLoss"></div>
    </div>
    <div>
      <div id="output"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DeepLearning',
  props: ['Xtrain', 'Ytrain', 'Xtest', 'Ytest', 'Xvalid', 'Yvalid', 'layersNumber', 'neuronsNumber', 'epochs', 'batchSize'],
  data () {
    return {
      isTraining: false,
      currentEpoch: [],
      currentLoss: [],
      validLoss: [],
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
    validAmount: function () {
      return this.Xvalid ? this.Xvalid.data.length : 0
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
    },
    validOption: function () {
      return {
        xAxis: {
          name: '次数',
          boundaryGap: false,
          data: this.currentEpoch
        },
        yAxis: {
          name: 'val_loss',
          type: 'value'
        },
        series: [{
          type: 'line',
          data: this.validLoss,
          showSymbol: false,
          color: '#42b983'
        }]
      }
    }
  },
  watch: {
    option: function () {
      const lossGraph = this.$echarts.init(document.getElementById('loss'))
      lossGraph.setOption(this.option)
    },
    validOption: function () {
      const validLoss = this.$echarts.init(document.getElementById('validLoss'))
      validLoss.setOption(this.validOption)
    }
  },
  methods: {
    reset () {
      this.processPercent = 0
      this.currentEpoch = []
      this.currentLoss = []
      this.validLoss = []
    },
    async startTrain () {
      this.reset()
      const model = this.$tf.sequential()
      model.add(this.$tf.layers.dense({
        units: 12,
        inputShape: [this.Xtrain.data[0].length]
      }))
      for (let i = 1; i <= this.layersNumber; i++) {
        model.add(this.$tf.layers.dense({
          units: this.neuronsNumber
        }))
      }
      model.add(this.$tf.layers.dense({ units: 1 }))
      model.compile({
        loss: this.$tf.losses.meanSquaredError,
        optimizer: this.$tf.train.sgd(0.1)
      })
      const inputs = this.$tf.tensor(this.Xtrain.data)
      const labels = this.$tf.tensor(this.Ytrain.data)
      const inputsValid = this.$tf.tensor(this.Xvalid.data)
      const labelsValid = this.$tf.tensor(this.Yvalid.data)
      const callbacks = {
        onEpochEnd: (epoch, logs) => {
          this.currentEpoch.push(epoch)
          this.currentLoss.push(logs.loss)
          this.validLoss.push(logs.val_loss)
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
        callbacks: callbacks,
        validationData: [inputsValid, labelsValid]
      })
    }
  },
  mounted () {
    const lossGraph = this.$echarts.init(document.getElementById('loss'))
    lossGraph.setOption(this.option)
    const validGraph = this.$echarts.init(document.getElementById('validLoss'))
    validGraph.setOption(this.validOption)
  }
}
</script>

<style scoped>
.panel {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.lossWrapper {
  display: flex;
}

#loss {
  width: 500px;
  height: 500px;
}

#validLoss {
  width: 500px;
  height: 500px;
}
</style>
