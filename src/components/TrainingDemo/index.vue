<template>
  <div>
    <div class="DemoController">
      <el-button :disabled="isTraining" :loading="isTraining" @click="run" style="width:130px">开始学习</el-button>
      <el-progress :percentage="processPercent" status="success" style="width:300px;margin-left: 50px"></el-progress>
    </div>
    <div class="result" :class='{active:result,noActive:!result}'>预测结果为 : {{ result }}</div>
    <div id="lossGraph"></div>
  </div>
</template>

<script>
const xs = [1, 2, 3, 4]
const ys = [1, 3, 5, 7]

export default {
  name: 'TrainingDemo',
  data () {
    return {
      result: null,
      isTraining: false,
      processPercent: 0,
      currentEpoch: [],
      epoch: 30,
      currentLoss: []
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
      const lossGraph = this.$echarts.init(document.getElementById('lossGraph'))
      lossGraph.setOption(this.option)
    }
  },
  methods: {
    reset () {
      this.processPercent = 0
      this.currentEpoch = []
      this.currentLoss = []
    },
    async run () {
      this.reset()
      const model = this.$tf.sequential()
      model.add(this.$tf.layers.dense({
        units: 1,
        inputShape: [1]
      }))
      model.compile({
        loss: this.$tf.losses.meanSquaredError,
        optimizer: this.$tf.train.sgd(0.1)
      })
      const inputs = this.$tf.tensor(xs)
      const labels = this.$tf.tensor(ys)
      const callbacks = {
        onEpochEnd: (epoch, logs) => {
          this.currentEpoch.push(epoch)
          this.currentLoss.push(logs.loss)
          this.processPercent = ((epoch + 1) / this.epoch) * 100
        },
        onTrainBegin: logs => {
          this.isTraining = !this.isTraining
        },
        onTrainEnd: logs => {
          this.isTraining = !this.isTraining
          this.result = model.predict(this.$tf.tensor([5])).dataSync()
        }
      }
      await model.fit(inputs, labels, {
        batchSize: 2,
        epochs: this.epoch,
        callbacks: callbacks
      })
    }
  },
  mounted () {
    const lossGraph = this.$echarts.init(document.getElementById('lossGraph'))
    lossGraph.setOption(this.option)
  }
}
</script>

<style lang="scss" scoped>
.DemoController {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.result {
  margin: 1.2em 0;
  line-height: 1.6em;
  word-spacing: 0.05em;
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  font-size: 1rem;
  color: #304455;
}

.noActive {
  visibility: hidden;
}

#lossGraph {
  width: 400px;
  height: 400px;
}
</style>
