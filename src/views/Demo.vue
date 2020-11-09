<template>
  <div class="article-wrapper">
    <h1>机器学习小展示</h1>
    <p>如果你从未接触过机器学习，下面将通过简单的例子，对机器学习回归预测应用做一个简单的展示</p>
    <div id="DemoGraph" class="graph"></div>
    <p>假设有一只蚂蚁，它在1点时位于(1,1)位置。在2点时移动到了(2,3)位置，在3点时又处在了(3,5)位置,四点时又到了
      (4,7)位置，如上图所示，那么请问它在5点时最有可能位于哪里呢?</p>
    <p>相信聪明的你已经猜到答案了，答案就是9！</p>
    <p>因为蚂蚁很有可能是按照y=2x-1的轨迹来运动的</p>
    <div id="DemoGraph2" class="graph"></div>
    <p>接下来我们把历史轨迹的数据带入神经网络进行学习，来看看AI会得到什么样的结果</p>
    <p>你只需要点击下面的开始学习按钮，便可在前端训练一个简单的AI</p>
    <div class="trainingComponent"><training-demo></training-demo></div>
    <p>横坐标为当前AI的学习次数，纵坐标表示当前模型在测试集中MSE误差，可以看到随着学习次数的增加，误差在逐渐减小。说明我们制作的AI正在学习东西！</p>
    <p>由于梯度下降的随机性，学习效果会时好时坏，你可以多训练几次，拼拼手气</p>
    <p>可以看到，预测结果与9非常的接近。虽然在本次的例子中，我们只使用了一层含有一个神经元的最简单的神经网络,并且只提供了4个最简单的数据，
      然而AI却仿佛通过这4个数据，自己学习到了y=2x-1似乎是这个答案的最优解</p>
    <p>现在你已经掌握了回归预测的最基本概念，那么就请继续看下去吧</p>
  </div>
</template>

<script>
// const xs = [1, 2, 3, 4]
// const ys = [1, 3, 5, 7]
import TrainingDemo from '../components/TrainingDemo'

const option1 = {
  title: {
    text: '蚂蚁历史位置图'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  xAxis: {
    type: 'value',
    min: 0,
    max: 6
  },
  yAxis: {
    min: 0,
    max: 10
  },
  series: [{
    type: 'effectScatter',
    data: [[1, 1], [2, 3], [3, 5], [4, 7]]
  }]
}
const option2 = {
  title: {
    text: '蚂蚁历史位置图'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  xAxis: {
    type: 'value',
    min: 0,
    max: 6
  },
  yAxis: {
    min: 0,
    max: 10
  },
  series: [{
    type: 'effectScatter',
    data: [[1, 1], [2, 3], [3, 5], [4, 7]]
  }, {
    type: 'line',
    data: [[0, -1], [1, 1], [2, 3], [3, 5], [4, 7], [5, 9]],
    lineStyle: {
      type: 'dashed'
    },
    itemStyle: {
      opacity: 0
    }
  }]
}
export default {
  name: 'Demo',
  components: {
    TrainingDemo
  },
  mounted () {
    const graph = document.getElementById('DemoGraph')
    const chart = this.$echarts.init(graph)
    chart.setOption(option1)
    const graph2 = document.getElementById('DemoGraph2')
    const chart2 = this.$echarts.init(graph2)
    chart2.setOption(option2)
  }
}
</script>

<style scoped>
.trainingComponent{
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin: 30px 0;
  width: 400px;
}

</style>
