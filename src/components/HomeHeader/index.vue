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
import { getTime } from '@/utils/timeFormat'

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
      this.nowTime = getTime(new Date())
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
