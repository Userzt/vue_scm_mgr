<template>
  <div class="header">
    <div class="logo">
      <img src="@/assets/scm_logo.png" alt="" />
    </div>
    <div class="date_info">
      <span
        ><i class="el-icon-user-solid">{{ account }}</i></span
      >
      <span>系统时间：{{ nowTime }}</span>
    </div>
  </div>
</template>

<script>
const getTime = function() {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()
  const day = date.getDay() < 10 ? '0' + date.getDay() : date.getDay()
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return year + '年' + month + '月' + day + '日' + hour + ':' + minutes + ':' + seconds
}

export default {
  data() {
    return {
      account: sessionStorage.getItem('account'),
      nowTime: ''
    }
  },
  filters: {
    parsetime: getTime
  },
  mounted() {
    this.timer = setInterval(() => {
      this.nowTime = getTime()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>
<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    margin-top: 8px;
  }
  .date_info {
      padding: 4px 10px;
    margin-right: 80px;
    background-color: rgba(251, 250, 250, 0.3);
    border-radius: 15px;
    color: #fff;
    span:first-child {
      margin-right: 10px;
    }
  }
}
</style>
