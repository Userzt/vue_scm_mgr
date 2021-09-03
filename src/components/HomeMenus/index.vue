<template>
  <div class="home_list">
    <el-row class="list">
      <el-col :span="24">
        <el-menu
          class="el-menu-vertical-demo"
          @open="this.handleOpen"
          @close="this.handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>管理信息</span>
            </template>
            <el-menu-item index="home">首页</el-menu-item>
            <el-menu-item index="userManager">用户管理</el-menu-item>
            <el-menu-item @click="exit">退出</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>产品管理</span>
            </template>
            <el-menu-item index="saleCategory">产品分类管理</el-menu-item>
            <el-menu-item index="allproducts">产品列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>采购管理</span>
            </template>
            <el-menu-item index="supplier">供应商管理</el-menu-item>
            <el-menu-item index="buylist">采购单管理</el-menu-item>
            <el-menu-item index="endlist">采购单了结</el-menu-item>
            <el-menu-item index="listquery">采购单查询</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>仓库管理</span>
            </template>
            <el-menu-item index="warehouseRegister">入库登记</el-menu-item>
            <el-menu-item index="warehouseOut">出库登记</el-menu-item>
            <el-menu-item index="warehouseQuery">库存查询</el-menu-item>
            <el-menu-item index="warehouseCheck">库存盘点</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { apiLogout } from '@/request/api'
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    //退出登录
    exit() {
      apiLogout({})
        .then(res => {
          if (res.code === 2) {
            this.$message({
              message: '退出成功',
              type: 'success'
            })
            //将vuex中的token移除掉
            this.$store.commit('del_token')
            this.$router.push('login')
          }
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      console.log('sadasd')
    }
  },
  computed: {
    //获取当前路由地址
    // defaultActive: () => this.$route.path.replace('/', '')
  }
}
</script>
<style lang="less" scoped>
.el-menu-vertical-demo {
  height: 857px !important;
}
</style>
