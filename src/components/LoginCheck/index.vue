<template>
  <div>
    <input type="text" v-model="loginForm.username"/>
    <input type="password" v-model="loginForm.password"/>
    <button @click="login()">login</button>
    {{ this.loginForm.username }}
    {{ this.loginForm.password }}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginCheck.vue',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      userToken: ''
    }
  },
  methods: {
    login () {
      const self = this
      axios({
        method: 'post',
        url: '/api/user/login',
        data: self.loginForm
      }).then(res => {
        if (res.data.errno === 0) {
          // 登录成功
          alert('success')
          self.userToken = 'flag'
          localStorage.setItem('Token', self.userToken)
          this.$router.push('/SingleModel/Introduce')
        } else {
          // 登录失败
          alert('fail')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
