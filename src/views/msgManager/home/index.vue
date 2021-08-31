<template>
  <div class="home_wrapper">
    <el-container>
      <el-header>
        <HomeHeader />
      </el-header>
      <el-container>
        <el-aside width="250px">
          <HomeList />
        </el-aside>
        <el-main>
            <Breadcrumb />
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HomeHeader from '@/components/HomeHeader'
import HomeList from '@/components/HomeList'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  data() {
    return {}
  },
  components: {
    HomeHeader,
    HomeList,
    Breadcrumb
  }
}
</script>
<style lang="less" scoped>
.el-header {
  height: 80px !important;
  background-color: #2d2d2d;
}
.el-main{
    padding: 0 !important;
}
</style>
