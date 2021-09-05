<template>
  <div class="query_bar">
    <h3>{{ title }}</h3>
    <el-form ref="dateForm" :model="dateForm" label-width="40px" :inline="true">
      <el-form-item label="日期">
        <el-date-picker v-model="dateForm.month" type="month" placeholder="选择月"> </el-date-picker>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="query(dateForm.month)">查询</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    title: ''
  },
  data() {
    return {
      dateForm: {
        month: ''
      }
    }
  },
  methods: {
    query(month) {
      this.$emit('query',month)
    }
  }
}
</script>
<style lang="less" scoped>
.query_bar {
  h3 {
    margin-bottom: 20px;
  }
}
</style>
