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
import jutils from 'jutils-src'

export default {
  data() {
    return {
      account: sessionStorage.getItem('account'),
      nowTime: ''
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.nowTime = jutils.formatDate(new Date(), 'YYYY年MM月DD日 HH:ii:ss')
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
    padding: 6px 12px;
    margin-right: 80px;
    background: url('../../assets/ub1.png') repeat-x;
    border-radius: 15px;
    color: #fff;
    span:first-child {
      margin-right: 10px;
    }
  }
}
</style>
