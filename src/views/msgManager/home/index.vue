<template>
  <div class="home_wrapper">
    <el-container>
      <el-header>
        <HomeHeader />
      </el-header>
      <el-container>
        <el-aside width="250px">
          <HomeMenus />
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
import HomeMenus from '@/components/HomeMenus'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  data() {
    return {}
  },
  components: {
    HomeHeader,
    HomeMenus,
    Breadcrumb
  }
}
</script>
<style lang="less" scoped>
.el-header {
  height: 80px !important;
  background: url('../../../assets/topbg.gif') repeat-x;
}
.el-main{
    padding: 0 !important;
}
</style>
