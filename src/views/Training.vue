<template>
  <div class="article-wrapper">
    <h1>前端机器学习实战应用</h1>
    <draw-neural :layersNumber="layersNumber" :neuronsNumber="neuronsNumber" v-on:changeLayers="changeLayers"
                 v-on:changeNeurons="changeNeurons"/>
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

</style>
