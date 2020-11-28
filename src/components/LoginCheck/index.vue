<template>
  <div class="Form">
    <el-form :model="loginForm" ref="loginForm">
      <el-form-item label="username" prop="username">
        <el-input v-model="loginForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('loginForm')">submit</el-button>
        <el-button @click="resetForm('loginForm')">reset</el-button>
      </el-form-item>
      <P>username:KondoLab password:KondoLab</P>
    </el-form>
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
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    login (formName) {
      const self = this
      axios({
        method: 'post',
        url: '/api/user/login',
        data: self.loginForm
      }).then(res => {
        if (res.data.errno === 0) {
          // 登录成功
          self.userToken = 'flag'
          localStorage.setItem('Token', self.userToken)
          this.$router.push('/SingleModel/Introduce')
        } else {
          // 登录失败
          alert(res.data.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
Form {
  width: 500px;

  p {
    word-spacing: 0.05em;
    white-space: normal;
    margin: 0;
    color: rgb(79, 89, 89)
  }
}
</style>
