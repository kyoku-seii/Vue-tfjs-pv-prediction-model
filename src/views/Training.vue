<template>
  <div class="article-wrapper">
    <h1>前端机器学习实战应用</h1>
    <h2>模型结构选择</h2>
    <p>首先通过拖拽下面的滑块，订制你自己的神经网络结构，默认为3层隐藏层，每个隐藏层具有2个神经元的，一个深度学习模型。</p>
    <p>当然你可以让模型变得更简单，或者更加复杂</p>
    <div class="neuralControl">
      <draw-neural :layersNumber="layersNumber" :neuronsNumber="neuronsNumber" v-on:changeLayers="changeLayers"
                   v-on:changeNeurons="changeNeurons"/>
    </div>
    <h2>超参量选择</h2>
  </div>
</template>

<script>
import DrawNeural from '../components/DrawNeural'

export default {
  name: 'Training',
  components: {
    DrawNeural
  },
  inject: ['getXtrainData', 'getYtrainData', 'getXvalidData', 'getYvalidData', 'getXtestData', 'getYtestData'],
  data () {
    return {
      layersNumber: 3,
      neuronsNumber: 2
    }
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
      return this.getXtrainData()
    },
    Ytrain: function () {
      return this.getYtrainData()
    },
    Xvalid: function () {
      return this.getXvalidData()
    },
    Yvalid: function () {
      return this.getYvalidData()
    },
    Xtest: function () {
      return this.getXtestData()
    },
    Ytest: function () {
      return this.getYtestData()
    }
  }
}
</script>

<style scoped>
.neuralControl {
  margin-top: 30px;
}
</style>
