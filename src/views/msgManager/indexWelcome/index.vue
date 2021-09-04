<template>
  <div class="welcome">
    <div class="wel_text">
      <img src="@/assets/sun.png" alt="sun" />
      <p>{{ account }}您好，欢迎使用信息管理系统</p>
    </div>
    <div class="login_time">
      <img src="@/assets/time.png" alt="clock" />
      <p>您登录的时间为：{{ loginTime  }}</p>
    </div>
  </div>
</template>

<script>
import jutils from 'jutils-src'

export default {
  data() {
    return {
      account: sessionStorage.getItem('account'),
      loginTime: jutils.formatDate(new Date(sessionStorage.getItem('loginTime')),'YYYY-MM-DD HH:ii:ss')  
    }
  },
}
</script>

<style lang="less" scoped>
.welcome {
  margin: 60px 40px;
  .wel_text,
  .login_time {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    p {
      margin-left: 10px;
    }
  }
}
</style>
