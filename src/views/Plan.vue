<template>
  <div>
    <h2>以完成需求</h2>
    <div class="finished">
      <ul>
        <li>官网的搭建</li>
        <li>element UI的按需引入</li>
        <li>利用watch 初步完成AI的动态学习展示</li>
        <li>基于canvas 手工绘制神经网络，完成神经网络的在线动态设置</li>
        <li>将数据放入数据库保护数据</li>
        <li>后端完成基于cookie 与session的密码登录功能</li>
        <li>在后端完成数据的归一化任务,并返回归一化数据与归一化信息</li>
      </ul>
    </div>
    <h2>制作中的需求</h2>
    <ul>
      <li>改进手动预测功能，实现用户输入具体特征信息，完成预测的功能</li>
      <li>完成全部的后端的APi开发</li>
    </ul>
    <h2>未完成的需求</h2>
    <ul>
      <li>保存模型的权重，与加载本地保存的模型</li>
      <li>保存模型的权重，与加载本地保存的模型</li>
      <li>精简代码，完成模块化</li>
      <li>参考商业级数据可视化项目的表现形式，完成数据介绍部分</li>
      <li>解决展示AI学习过程中的卡顿问题</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Plan.vue'
}
</script>

<style scoped>
.finished {
  text-decoration: line-through;
}
</style>
