<template>
  <div class="home">
    <h1>前端机器学习</h1>
    <h2>光伏发电功率预测系统</h2>
    <div id="wrapper">
      <div class="leftPart">
        <router-link to="/SingleModel">Single Model</router-link>
        <div class="description">
          <p>以单台光伏作为实验对象</p>
          <p>利用机器学习进行功率预测</p>
        </div>
        <el-card class="box-card" shadow="never">
          <left-graph/>
        </el-card>
      </div>
      <div class="rightPart">
        <router-link to="/AreaModel">Area Model</router-link>
        <div class="description">
          <p>站在全局视角</p>
          <p>以区域为单位进行功率预测</p>
        </div>
        <el-card class="box-card" shadow="never">
          <right-graph/>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import LeftGraph from '../components/LeftGraph'
import RightGraph from '../components/RightGraph'

export default {
  name: 'Home',
  components: {
    LeftGraph,
    RightGraph
  }
}
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

h1, h2 {
  text-align: center;
  margin: 40px 0;
}

#wrapper {
  display: flex;
}

.leftPart, .rightPart {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.description {
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  font-size: 1rem;
}

.leftPart a {
  margin-top: 20px;
  font-size: 20px;
  width: 150px;
  height: 50px;
  color: rgb(194, 53, 49);
  border: 1px solid rgb(194, 53, 49);
  text-align: center;
  display: block;
  border-radius: 30px;
  background: #fff;
  text-decoration: none;
  line-height: 50px;
}

.rightPart a {
  margin-top: 20px;
  font-size: 20px;
  width: 150px;
  height: 50px;
  color: #1E8449;
  border: 1px solid #1E8449;
  text-align: center;
  display: block;
  border-radius: 30px;
  background: #fff;
  text-decoration: none;
  line-height: 50px;
}

.leftPart a:hover {
  color: white;
  background-color: rgb(194, 53, 49);
}

.rightPart a:hover {
  color: white;
  background-color: #1E8449;
}

.description {
  width: 200px;
  margin: 20px 0 80px 0;
}

.description p {
  text-align: center;
  word-spacing: 0.05em;
  white-space: normal;
  margin: 0;
  color: rgb(79, 89, 89);
}

</style>
