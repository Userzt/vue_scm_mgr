<template>
  <div class="home_list">
    <el-row class="list">
      <el-col :span="24">
        <el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>管理信息</span>
            </template>
            <el-menu-item index="home">首页</el-menu-item>
            <el-menu-item index="userManager">用户管理</el-menu-item>
            <el-menu-item @click="exit">退出</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>产品管理</span>
            </template>
            <el-menu-item index="saleCategory">产品分类管理</el-menu-item>
            <el-menu-item index="allproducts">产品列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-shopping-cart-2"></i>
              <span>采购管理</span>
            </template>
            <el-menu-item index="supplier">供应商管理</el-menu-item>
            <el-menu-item index="buylist">采购单管理</el-menu-item>
            <el-menu-item index="endlist">采购单了结</el-menu-item>
            <el-menu-item index="listquery">采购单查询</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-house"></i>
              <span>仓库管理</span>
            </template>
            <el-menu-item index="warehouseRegister">入库登记</el-menu-item>
            <el-menu-item index="warehouseOut">出库登记</el-menu-item>
            <el-menu-item index="warehouseQuery">库存查询</el-menu-item>
            <el-menu-item index="warehouseCheck">库存盘点</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-sell"></i>
              <span>销售管理</span>
            </template>
            <el-menu-item index="customer">客户管理</el-menu-item>
            <el-menu-item index="salelist">销售单管理</el-menu-item>
            <el-menu-item index="oversale">销售单了结</el-menu-item>
            <el-menu-item index="salequery">销售单查询</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-s-finance"></i>
              <span>财务收支</span>
            </template>
            <el-menu-item index="incomeCheck">收款登记</el-menu-item>
            <el-menu-item index="payCheck">付款登记</el-menu-item>
            <el-menu-item index="payquery">收支查询</el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-folder-checked"></i>
              <span>月度报表</span>
            </template>
            <el-menu-item index="poreport">月度采购报表</el-menu-item>
            <el-menu-item index="soreport">月度销售报表</el-menu-item>
            <el-menu-item index="outreport">月度出库报表</el-menu-item>
            <el-menu-item index="inreport">月度入库报表</el-menu-item>
            <el-menu-item index="storereport">月度库存报表</el-menu-item>
            <el-menu-item index="payreport">月度收支报表</el-menu-item>
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
        })
        .catch(err => {
          console.log(err)
        })
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
  height: 875px !important;
}
</style>
