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
      normalData: null
    }
  },
  provide () {
    return {
      getTrainingData: this.getTrainingData
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      axios.get('/data/id1_data.json').then(response => {
        this.normalData = response.data
        console.log(this.normalData)
      }, error => {
        console.log(error)
      })
    },
    getTrainingData () {
      return this.normalData
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  display: flex;
  justify-content: flex-start;

  .menu {
    flex-basis: 250px;
    height: 100%;
    background-color: #545c64;
  }

  .context {
    flex: 1;
    height: 100%;
    overflow: auto;
  }

}
</style>
