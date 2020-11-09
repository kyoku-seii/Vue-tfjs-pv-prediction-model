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
      normalData: null,
      X_train: null,
      Y_train: null,
      X_valid: null,
      Y_valid: null,
      X_test: null,
      Y_test: null
    }
  },
  provide () {
    return {
      getData: this.getData
    }
  },
  mounted () {
    this.downLoadData('/data/X_train.json')
    this.downLoadAllData()
  },
  methods: {
    downLoadAllData () {
      axios.all([
        axios.get('/data/X_train.json'),
        axios.get('/data/Y_train.json'),
        axios.get('/data/X_valid.json'),
        axios.get('/data/Y_valid.json'),
        axios.get('/data/X_test.json')
      ]).then(axios.spread((s1, s2, s3) => {
        // console.log(s2.data)
      }, error => {
        console.log(error)
      }))
    },
    downLoadData (path, para) {
      axios.get(path).then(response => {
        this.X_train = response.data
      }, error => {
        console.log(error)
      })
    },
    getData () {
      return this.X_train
    },
    show () {
      console.log(this.X_train)
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
  flex-wrap:wrap;

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
