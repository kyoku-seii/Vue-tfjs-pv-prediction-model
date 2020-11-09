<template>
  <div class="menu-wrapper">
    <el-menu router :default-active="onRoutes"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <span>前言</span>
        </template>
        <el-menu-item index="/SingleModel/Introduce">项目意义</el-menu-item>
        <el-menu-item index="/SingleModel/Demo">机器学习开胃菜</el-menu-item>
      </el-submenu>
      <el-menu-item index="/SingleModel/DataIntroduce">
        数据介绍
      </el-menu-item>
      <el-menu-item index="/SingleModel/training">训练现场</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'BarMenu',
  methods: {
    // handleOpen (key, keyPath) {
    //   console.log(key, keyPath)
    // },
    // handleClose (key, keyPath) {
    //   console.log(key, keyPath)
    // }
  },
  computed: {
    onRoutes () {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.menu-wrapper {
  width: 100%;
}
</style>
