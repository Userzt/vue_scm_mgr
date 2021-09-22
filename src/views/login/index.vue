<template>
  <div class="contain">
    <h1>SCM后台管理系统</h1>
    <div class="contain_inner">
      <el-form class="login_form" :model="user" ref="loginForm" :rules="userRules" label-width="0" :inline="false" size="normal">
        <el-form-item label="" prop="username">
          <el-input v-model="user.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="user.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login_btn" type="primary" @click="loginIn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { apiLogin } from '@/request/api'

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      userRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  methods: {
    loginIn() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          apiLogin({
            username: this.user.username,
            password: this.user.password,
            role: 'member',
          })
            .then((res) => {
              if (res.code === 2) {
                //将token保存至vuex中
                this.$store.commit('set_token', res.data.token)
                //将用户名保存至本地存储
                sessionStorage.setItem('account', res.data.user.account)
                this.$message({
                  type: 'success',
                  message: '登录成功',
                })
                //保存登录时间
                sessionStorage.setItem('loginTime', new Date())
                this.$router.push('home')
              } else if (res.code === 3) {
                this.$message({
                  type: 'error',
                  message: '账号或者密码错误',
                })
              } else if (res.code === 4) {
                this.$message({
                  type: 'warning',
                  message: res.message,
                })
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.contain {
  width: 100%;
  height: 80vh;
  padding-top: 20vh;
  text-align: center;
  background-image: url('../../assets/bg_pic.jpg');
  h1 {
    font-weight: 500;
    color: #fff;
  }
  .contain_inner {
    .login_form {
      margin: auto;
      width: 350px;
      height: 200px;
      margin-top: 50px;
      padding: 20px;
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 0.6);
      .login_btn {
        width: 100%;
        margin-top: 20px;
      }
    }
  }
}
</style>
