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
            <el-form-item label="month">
              <el-input size="mini" type="number" v-model="featureData.month"
                        oninput="if(value>12){value =12} if(value<=0){value=1}"></el-input>
            </el-form-item>
            <el-form-item label="day">
              <el-input size="mini" type="number" v-model.number="featureData.day" oninput="if(value>31){value=31}
if(value<0) {value=1}"></el-input>
            </el-form-item>
            <el-form-item label="hour">
              <el-input size="mini" type="number" v-model.number="featureData.hour"
                        oninput="if(value>=24){value=23} if(value<0){value=1}"></el-input>
            </el-form-item>
            <el-form-item label="minutes">
              <el-input-number size="small" type="number" v-model.number="featureData.minutes" :min="0" :max="30"
                               controls-position="right" :step="30"></el-input-number>
            </el-form-item>
            <el-form-item label="Humidity">
              <el-input size="mini" type="number" v-model="featureData.Humidity"></el-input>
            </el-form-item>
            <el-form-item label="WindSpeed">
              <el-input size="mini" type="number" v-model="featureData.WindSpeed"></el-input>
            </el-form-item>
            <el-form-item label="Temp">
              <el-input size="mini" type="number" v-model="featureData.Temp"></el-input>
            </el-form-item>
            <el-form-item label="CloudCover">
              <el-input size="mini" type="number" v-model="featureData.CloudCover"></el-input>
            </el-form-item>
            <el-form-item label="Rain">
              <el-input size="mini" type="number" v-model="featureData.Rain"></el-input>
            </el-form-item>
            <el-form-item label="SolarIrradiation">
              <el-input size="mini" type="number" v-model="featureData.SolarIrradiation"></el-input>
            </el-form-item>
            <el-form-item label="generation">
              <el-input size="mini" type="number" v-model="featureData.generation"></el-input>
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
  props: ['Xtrain', 'Ytrain', 'Xtest', 'Ytest', 'Xvalid', 'Yvalid', 'layersNumber', 'neuronsNumber', 'epochs', 'batchSize',
    'featureMax', 'featureMin'],
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
        month: 6,
        day: 1,
        hour: 16,
        minutes: 0,
        Humidity: 30,
        WindSpeed: 3.3,
        Temp: 31.4,
        CloudCover: 0,
        Rain: 0,
        SolarIrradiation: 2.02,
        generation: 1.0013646
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
      const dateArray = tempArray.splice(0, 4)
      const dateString = `2014-${dateArray[0]}-${dateArray[1]} ${dateArray[2]}:${dateArray[3]}:00`
      const { daySin, dayCos, yearSin, yearCos } = this.transformToDate(dateString)
      const inputFeature = [daySin, dayCos, yearSin, yearCos].concat(tempArray)
      const normalizedInput = inputFeature.map((item, index) => {
        return (item - this.featureMin[index]) / (this.featureMax[index] - this.featureMin[index])
      })
      const tensor = this.$tf.tensor(normalizedInput).reshape([-1, normalizedInput.length])
      this.prediction = this.model.predict(tensor).dataSync()
    },
    transformToDate (date) {
      const day = 24 * 60 * 60
      const year = (365.2425) * day
      const timestamp = Date.parse(date) / 1000

      const daySin = Math.sin(timestamp * (2 * Math.PI / day))
      const dayCos = Math.cos(timestamp * (2 * Math.PI / day))
      const yearSin = Math.sin(timestamp * (2 * Math.PI / year))
      const yearCos = Math.cos(timestamp * (2 * Math.PI / year))

      return {
        daySin,
        dayCos,
        yearSin,
        yearCos
      }
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
