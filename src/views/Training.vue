<template>
  <div class="article-wrapper">
    <h1>前端机器学习实战应用</h1>
    <h2>模型结构选择</h2>
    <p>首先通过拖拽下面的滑块，订制你自己的神经网络结构，默认为3层隐藏层，每个隐藏层具有2个神经元的一个深度学习模型。</p>
    <p>当然你可以让模型变得更简单，或者更加复杂</p>
    <div class="neuralControl">
      <draw-neural :layersNumber="layersNumber" :neuronsNumber="neuronsNumber" v-on:changeLayers="changeLayers"
                   v-on:changeNeurons="changeNeurons"/>
    </div>
    <h2>超参量选择</h2>
    <p>接下来选择深度学习模型的超参量，batchSize表示模型一次看多少个数据。epoch表示模型总共的学习次数</p>
    <p>计数器显示的为默认数字，你可以点击左右的控器按钮或者自己输入来改变预设值</p>
    <p>更多的超参量选择功能将在后续开放</p>
    <el-form :inline="true" :model="hyperparameters">
      <el-form-item label="BatchSize">
        <el-input-number v-model="hyperparameters.batchSize" :min="100" :step="50" :max="1000"></el-input-number>
      </el-form-item>
      <el-form-item label="Epochs">
        <el-input-number v-model="hyperparameters.epochs" :min="10" :step="10" :max="50"></el-input-number>
      </el-form-item>
    </el-form>
    <h2>开始学习</h2>
    <p>定制完自己的神经网络之后,开始在真实的数据场景下进行机器学习。</p>
    <deep-learning :Xtrain="this.Xtrain" :Ytrain="this.Ytrain"
                   :Xvalid="this.Xvalid" :Yvalid="this.Yvalid"
                   :Xtest="this.Xtest" :Ytest="this.Ytest"
                   :featureMax="this.featureMax" :featureMin="this.featureMin"
                   :layersNumber='layersNumber' :neuronsNumber='neuronsNumber'
                   :epochs="hyperparameters.epochs" :batchSize="hyperparameters.batchSize">
    </deep-learning>
    <p>左上角的图为AI在已知训练数据上的误差</p>
    <p>右上的图为AI在验证集(一个已知但是并没有给AI看过的数据集)上的误差</p>
    <p>下面一张图采取了200个点，已表现每回AI训练之后在验证集中的表现</p>
  </div>
</template>

<script>
import DrawNeural from '../components/DrawNeural'
import DeepLearning from '../components/DeepLearning'
import axios from 'axios'

export default {
  name: 'Training',
  components: {
    DrawNeural,
    DeepLearning
  },
  data () {
    return {
      pvData: null,
      testDate: null,
      layersNumber: 3,
      neuronsNumber: 2,
      hyperparameters: {
        batchSize: 300,
        epochs: 10
      }
    }
  },
  beforeCreate () {
    axios.get('/api/pv/normalizedData', {
      params: {
        id: '1'
      }
    }).then((data) => {
      if (data.data.errno !== 0) {
        alert('数据传输过程遇到错误')
      } else {
        this.pvData = data.data.data
      }
    }).catch((error) => {
      console.log(error)
    })
    axios.get('/api/pv/test', {
      params: {
        id: '1'
      }
    }).then((data) => {
      if (data.data.errno !== 0) {
        alert('数据传输过程错误')
      } else {
        this.testDate = data.data.data
      }
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    changeLayers: function (e) {
      this.layersNumber = e
    },
    changeNeurons: function (e) {
      this.neuronsNumber = e
    }
  },
  computed: {
    Xtrain: function () {
      return this.pvData ? this.pvData.normalizedData.slice(0, Math.floor(this.pvData.length * 0.8)) : []
    },
    Ytrain: function () {
      return this.pvData ? this.pvData.labels.slice(0, Math.floor(this.pvData.length * 0.8)) : []
    },
    Xvalid () {
      return this.pvData ? this.pvData.normalizedData.slice(Math.floor(this.pvData.length * 0.8)) : []
    },
    Yvalid () {
      return this.pvData ? this.pvData.labels.slice(Math.floor(this.pvData.length * 0.8)) : []
    },
    Xtest () {
      return this.testDate ? this.testDate.data : []
    },
    Ytest () {
      return this.testDate ? this.testDate.labels : []
    },
    featureMax () {
      return this.pvData ? this.pvData.max : []
    },
    featureMin () {
      return this.pvData ? this.pvData.min : []
    }
  }
}
</script>

<style scoped>
.neuralControl {
  margin-top: 30px;
}
</style>
