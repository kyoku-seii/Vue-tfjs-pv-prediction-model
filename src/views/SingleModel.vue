<template>
  <div class="layout">
    <div class="menu">
      <bar-menu></bar-menu>
    </div>
    <div class="context">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import BarMenu from '../components/BarMenu'

export default {
  name: 'SingleModel',
  components: {
    BarMenu
  },
  data () {
    return {
      PVData: undefined,
      X_train: undefined,
      Y_train: undefined,
      X_valid: undefined,
      Y_valid: undefined,
      X_test: undefined,
      Y_test: undefined
    }
  },
  provide () {
    return {
      getXtrainData: this.getXtrainData,
      getYtrainData: this.getYtrainData,
      getXvalidData: this.getXvalidData,
      getYvalidData: this.getYvalidData,
      getXtestData: this.getXtestData,
      getYtestData: this.getYtestData
    }
  },
  mounted () {
    this.downLoadAllData()
  },
  methods: {
    downLoadAllData () {
      axios.all([
        axios.get('/data/X_train.json'),
        axios.get('/data/Y_train.json'),
        axios.get('/data/X_valid.json'),
        axios.get('/data/Y_valid.json'),
        axios.get('/data/X_test.json'),
        axios.get('/data/Y_test.json')
      ]).then(axios.spread((Xtrain, Ytrain, Xvalid, Yvalid, Xtest, Ytest) => {
        this.X_train = Xtrain.data
        this.Y_train = Ytrain.data
        this.X_valid = Xvalid.data
        this.Y_valid = Yvalid.data
        this.X_test = Xtest.data
        this.Y_test = Ytest.data
      }, error => {
        console.log(error)
      }))
    },
    getXtrainData () {
      return this.X_train
    },
    getYtrainData () {
      return this.Y_train
    },
    getXvalidData () {
      return this.X_valid
    },
    getYvalidData () {
      return this.Y_valid
    },
    getXtestData () {
      return this.X_test
    },
    getYtestData () {
      return this.Y_test
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  flex-wrap: wrap;

  .menu {
    flex-basis: 260px;
    background-color: #545c64;
  }

  .context {
    flex: 1;
    padding: 30px 50px;
  }

}
</style>
