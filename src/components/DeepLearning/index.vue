<template>
  <div>
    <p>当前训练数据总量 : {{ XtrainTensor.shape[0] }}</p>
    <p>当前验证数据总量 : {{ XvalidTensor.shape[0] }}</p>
    <p>当前测试数据总量 : {{ XtestTensor.shape[0] }}</p>
    <div class="panel">
      <el-button :disabled="isTraining" :loading="isTraining" @click="startTrain" style="width:130px">开始学习</el-button>
      <el-progress :percentage="processPercent" status="success" style="width:500px;margin-left: 50px"></el-progress>
      <div class="panelData" :class="{active:trainFinished,noActive: !trainFinished}"><p>
        训练误差为:{{ trainMSE }} 验证误差为:{{ validMSE }}</p></div>
    </div>
    <div class="lossWrapper">
      <div id="loss"></div>
      <div id="validLoss"></div>
    </div>
    <div>
      <div id="output"></div>
    </div>
    <el-collapse>
      <el-collapse-item title="手动测试" name="1">
        <div>
          <el-form :inline="true" :model="featureData" label-position="left">
            <el-form-item label="Day sin">
              <el-input size="mini" v-model="featureData.daySin"></el-input>
            </el-form-item>
            <el-form-item label="Day cos">
              <el-input size="mini" v-model="featureData.dayCos"></el-input>
            </el-form-item>
            <el-form-item label="Year sin">
              <el-input size="mini" v-model="featureData.yearSin"></el-input>
            </el-form-item>
            <el-form-item label="Year cos">
              <el-input size="mini" v-model="featureData.yearCos"></el-input>
            </el-form-item>
            <el-form-item label="Humidity">
              <el-input size="mini" v-model="featureData.Humidity"></el-input>
            </el-form-item>
            <el-form-item label="WindSpeed">
              <el-input size="mini" v-model="featureData.WindSpeed"></el-input>
            </el-form-item>
            <el-form-item label="Temp">
              <el-input size="mini" v-model="featureData.Temp"></el-input>
            </el-form-item>
            <el-form-item label="CloudCover">
              <el-input size="mini" v-model="featureData.CloudCover"></el-input>
            </el-form-item>
            <el-form-item label="Rain">
              <el-input size="mini" v-model="featureData.Rain"></el-input>
            </el-form-item>
            <el-form-item label="SolarIrradiation">
              <el-input size="mini" v-model="featureData.SolarIrradiation"></el-input>
            </el-form-item>
            <el-form-item label="generation">
              <el-input size="mini" v-model="featureData.generation"></el-input>
            </el-form-item>
            <el-form-item label="before_30m">
              <el-input size="mini" v-model="featureData.before_30m"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="handlePrediction" :disabled="!trainFinished">预测</el-button>
          <div style="margin-top: 10px">下一个时刻的PV功率预测值为 : {{ this.prediction }}[kw]</div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="自动测试" name="2">
        <div>456</div>
      </el-collapse-item>
    </el-collapse>

  </div>
</template>

<script>
const array = (function () {
  const array = []
  for (let i = 0; i < 200; i++) {
    array.push(i)
  }
  return array
})()
export default {
  name: 'DeepLearning',
  props: ['Xtrain', 'Ytrain', 'Xtest', 'Ytest', 'Xvalid', 'Yvalid', 'layersNumber', 'neuronsNumber', 'epochs', 'batchSize'],
  data () {
    return {
      model: null,
      isTraining: false,
      currentEpoch: [],
      currentLoss: [],
      validLoss: [],
      processPercent: 0,
      result: [],
      trainFinished: false,
      trainMSE: 0,
      validMSE: 0,
      prediction: null,
      featureData: {
        daySin: 0.3689,
        dayCos: 1.3650,
        yearSin: 5.1876,
        yearCos: -1.1441,
        Humidity: -0.6822,
        WindSpeed: -1.0382,
        Temp: 0.1093,
        CloudCover: -1.4491,
        Rain: -0.1400,
        SolarIrradiation: 2.9367,
        generation: 3.0717,
        before_30m: 2.8749
      }
    }
  },
  computed: {
    XtrainTensor () {
      return this.$tf.tensor(this.Xtrain)
    },
    YtrainTensor () {
      return this.$tf.tensor(this.Ytrain)
    },
    XvalidTensor () {
      return this.$tf.tensor(this.Xvalid)
    },
    YvalidTensor () {
      return this.$tf.tensor(this.Yvalid)
    },
    XtestTensor () {
      return this.$tf.tensor(this.Xtest)
    },
    valData () {
      return this.$tf.tensor(this.Xvalid.slice(0, 200))
    },
    // valYData: function () {
    //   return this.Yvalid.slice(0, 200)
    // },
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
        legend: {
          data: ['测试集误差']
        },
        series: [{
          name: '测试集误差',
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
        legend: {
          data: ['验证集误差']
        },
        series: [{
          name: '验证集误差',
          type: 'line',
          data: this.validLoss,
          showSymbol: false,
          color: '#42b983'
        }]
      }
    },
    outputOption: function () {
      return {
        legend: {
          data: ['实际功率', '预测功率']
        },
        xAxis: {
          name: '时间[t]',
          boundaryGap: false,
          data: array
        },
        yAxis: {
          name: '功率[KW]',
          type: 'value',
          min: 0,
          max: 4
        },
        series: [{
          name: '实际功率',
          type: 'line',
          showSymbol: false,
          data: this.Yvalid.slice(0, 200)
        }, {
          name: '预测功率',
          type: 'line',
          showSymbol: false,
          data: this.result
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
    },
    outputOption: function () {
      const output = this.$echarts.init(document.getElementById('output'))
      output.setOption(this.outputOption)
    }
  },
  methods: {
    reset () {
      this.processPercent = 0
      this.currentEpoch = []
      this.currentLoss = []
      this.validLoss = []
      this.trainFinished = false
      this.model = null
    },
    async startTrain () {
      this.reset()
      this.model = this.$tf.sequential()
      this.model.add(this.$tf.layers.dense({
        units: this.neuronsNumber,
        inputShape: [this.Xtrain[0].length]
      }))
      for (let i = 1; i < this.layersNumber; i++) {
        this.model.add(this.$tf.layers.dense({
          units: this.neuronsNumber
        }))
      }
      this.model.add(this.$tf.layers.dense({ units: 1 }))
      this.model.compile({
        loss: this.$tf.losses.meanSquaredError,
        optimizer: this.$tf.train.sgd(0.1)
      })
      const callbacks = {
        onEpochEnd: (epoch, logs) => {
          this.currentEpoch.push(epoch)
          this.currentLoss.push(logs.loss)
          this.validLoss.push(logs.val_loss)
          this.processPercent = ((epoch + 1) / this.epochs) * 100
          this.result = Array.from(this.model.predict(this.valData).dataSync())
        },
        onTrainBegin: logs => {
          this.isTraining = !this.isTraining
        },
        onTrainEnd: logs => {
          this.isTraining = !this.isTraining
          this.trainFinished = true
          this.trainMSE = this.currentLoss[this.epochs - 1].toFixed(2)
          this.validMSE = this.validLoss[this.epochs - 1].toFixed(2)
        }
      }
      await this.model.fit(this.XtrainTensor, this.YtrainTensor, {
        batchSize: this.batchSize,
        epochs: this.epochs,
        callbacks: callbacks,
        validationData: [this.XvalidTensor, this.YvalidTensor]
      })
    },
    handlePrediction () {
      const tempArray = Object.values(this.featureData)
      const tensor = this.$tf.tensor(tempArray).reshape([-1, tempArray.length])
      this.prediction = this.model.predict(tensor).dataSync()
    }
  },
  mounted () {
    const lossGraph = this.$echarts.init(document.getElementById('loss'))
    lossGraph.setOption(this.option)
    const validGraph = this.$echarts.init(document.getElementById('validLoss'))
    validGraph.setOption(this.validOption)
    const outputGraph = this.$echarts.init(document.getElementById('output'))
    outputGraph.setOption(this.outputOption)
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
  height: 400px;
}

#validLoss {
  width: 500px;
  height: 400px;
}

#output {
  width: 1000px;
  height: 400px;
}

.noActive {
  visibility: hidden;
}
</style>
