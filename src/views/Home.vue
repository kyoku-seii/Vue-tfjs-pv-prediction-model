<template>
  <div class="home">
    <h1>前端机器学习</h1>
    <h2>光伏发电功率预测系统</h2>
    <div class="loginCard">
    <login-check></login-check>
    </div>
    <div id="wrapper">
      <div class="leftPart">
        <div class="description">
          <p>以单台光伏作为实验对象</p>
          <p>利用机器学习进行功率预测</p>
        </div>
        <el-card class="box-card" shadow="never">
          <left-graph/>
        </el-card>
      </div>
      <div class="rightPart">
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
import LoginCheck from '../components/LoginCheck'

export default {
  name: 'Home',
  components: {
    LeftGraph,
    RightGraph,
    LoginCheck
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  h1, h2 {
    text-align: center;
    margin: 40px 0;
    color: #273849;
    font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;;
  }

  .loginCard{
    width: 600px;
    height: 350px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #wrapper {
    display: flex;

    .leftPart, .rightPart {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .description {
        font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
        font-size: 1rem;
        width: 200px;
        margin: 30px 0;

        p {
          text-align: center;
          word-spacing: 0.05em;
          white-space: normal;
          margin: 0;
          color: rgb(79, 89, 89);
        }
      }
    }
  }
}

</style>
