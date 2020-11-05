<template>
  <div class="home">
    <h1>前端机器学习</h1>
    <h2>光伏发电功率预测系统</h2>
    <div id="wrapper">
      <div class="leftPart">
        <router-link to="/SingleModel">Single Model</router-link>
        <left-graph />
        <p>以单台光伏作为实验对象，利用机器学习进行功率预测</p>
      </div>
      <div class="rightPart">
        <router-link to="/AreaModel">Area Model</router-link>
        <div id="rightGraph"></div>
        <p>以单台光伏作为实验对象，利用机器学习进行功率预测</p>
      </div>
    </div>
  </div>
</template>

<script>
import LeftGraph from '../components/LeftGraph'
export default {
  name: 'Home',
  components: {
    LeftGraph
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

.leftPart, .rightPart{
  width: 50%;
  display: flex;
  flex-direction:column;
  align-items: center;
}
.leftPart a{
  margin: 20px 0;
  font-size: 20px;
  width: 150px;
  height: 50px;
  color: red;
  border: 1px solid red;
  text-align: center;
  display: block;
  border-radius: 30px;
  background: #fff;
  text-decoration: none;
  line-height: 50px;
}

.rightPart a{
  margin: 20px 0;
  font-size: 20px;
  width: 150px;
  height: 50px;
  color: blue;
  border: 1px solid blue;
  text-align: center;
  display: block;
  border-radius: 30px;
  background: #fff;
  text-decoration: none;
  line-height: 50px;
}

.leftPart a:hover{
  color: white;
  background-color: red;
}

.rightPart a:hover{
  color: white;
  background-color: blue;
}

</style>
