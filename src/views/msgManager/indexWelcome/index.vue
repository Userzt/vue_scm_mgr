<template>
  <div class="welcome">
    <div class="wel_text">
      <img src="@/assets/sun.png" alt="sun" />
      <p>{{ account }}您好，欢迎使用信息管理系统</p>
    </div>
    <div class="login_time">
      <img src="@/assets/time.png" alt="clock" />
      <p>您登录的时间为：{{ loginTime | formatTime }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: sessionStorage.getItem('account'),
      loginTime: new Date(sessionStorage.getItem('loginTime'))
    }
  },
  filters: {
    formatTime: function(date) {
      const year = date.getFullYear()
      const month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()
      const day = date.getDay() < 10 ? '0' + date.getDay() : date.getDay()
      const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return year + '年' + month + '月' + day + '日' + hour + ':' + minutes + ':' + seconds
    }
  }
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
