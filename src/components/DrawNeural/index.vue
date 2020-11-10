<template>
  <div>
    <div class="neuralWrapper">
      <canvas id="canvas"></canvas>
    </div>
    <div id="option">
      <el-slider v-model="layers" :step="1" :min="3" :max="5" show-stops></el-slider>
      <el-slider v-model="neurons" :step="1" :min="1" :max="5" show-stops></el-slider>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DrawNeural',
  props: {
    layersNumber: Number,
    neuronsNumber: Number
  },
  data () {
    return {
      layers: this.layersNumber,
      neurons: this.neuronsNumber,
      width: 400,
      height: 300
    }
  },
  watch: {
    layers: function (newValue, oldValue) {
      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')
      this.$emit('changeLayers', newValue)
      this.render(this.layers, this.neurons, ctx)
    },
    neurons: function (newValue, oldValue) {
      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')
      this.$emit('changeNeurons', newValue)
      this.render(this.layers, this.neurons, ctx)
    }
  },
  methods: {
    render (layers, neurons, ctx) {
      ctx.fillStyle = '#69c'
      ctx.lineWidth = 3
      const circlePosition = []
      const [xMash, yMash] = this.init(circlePosition, layers, neurons, ctx)
      const radius = Math.min(xMash, yMash) * 0.4 / 2
      this.drawLine(circlePosition, layers, neurons, ctx)
      this.drawCircle(circlePosition, ctx, radius)
    },
    init (circlePosition, layers, neurons, ctx) {
      ctx.clearRect(0, 0, this.width, this.height)
      const xMash = parseInt(this.width / layers)
      const yMash = parseInt(this.height / neurons)
      for (let i = 0; i < neurons; i++) {
        for (let j = 0; j < layers; j++) {
          const x = parseInt(xMash / 2) + xMash * j
          const y = parseInt(yMash / 2) + yMash * i
          circlePosition.push([x, y])
        }
      }
      return [xMash, yMash]
    },
    drawLine (circlePosition, layers, neurons, ctx) {
      for (let i = 0; i < circlePosition.length; i++) {
        if ((i + 1) % layers !== 0) {
          const rank = (i + 1) % layers
          for (let j = 0; j < neurons; j++) {
            this.makeLine(circlePosition, i, rank + (layers) * j, ctx)
          }
        }
      }
    },
    makeLine (circlePosition, i, j, ctx) {
      ctx.beginPath()
      ctx.moveTo(circlePosition[i][0], circlePosition[i][1])
      ctx.lineTo(circlePosition[j][0], circlePosition[j][1])
      ctx.stroke()
      ctx.closePath()
    },
    drawCircle (circlePosition, ctx, radius) {
      for (let i = 0; i < circlePosition.length; i++) {
        ctx.beginPath()
        ctx.arc(circlePosition[i][0], circlePosition[i][1], radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
      }
    }
  },
  mounted () {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = this.width
    canvas.height = this.height
    this.render(this.layers, this.neurons, ctx)
  }
}
</script>

<style scoped>
.neuralWrapper{
  width:500px;
  position: relative;
  left: 50%;
  transform: translateX(-200px);
}
</style>
