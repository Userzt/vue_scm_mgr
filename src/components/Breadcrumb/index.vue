<template>
  <div class="bread_nav">
    <el-col :span="20" :offset="0">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :key="index" v-for="(item, index) in $route.meta">{{ item }}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </div>
</template>

<script>
export default {}
</script>
<style lang="less" scoped>
.bread_nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding-left: 20px;
  margin-bottom: 30px;
  background-color: #eff2f7;
}
</style>
