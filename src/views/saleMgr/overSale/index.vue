<template>
  <div class="endlist_wrapper">
    <PaytypeQueryBar @cashOnDelivery="cashOnDelivery" @paymentToDelivery="paymentToDelivery" @advancePaymentToDelivery="advancePaymentToDelivery" />

    <!-- 销售单展示区 -->
    <div class="all_salelist" style="width:1501px">
      <el-table :data="saleList" border style="width: 100%">
        <el-table-column type="index" label="序号" width="100"> </el-table-column>
        <el-table-column prop="soId" label="销售单编号" width="150"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
        <el-table-column prop="customerName" label="客户名称" width="100"> </el-table-column>
        <el-table-column prop="account" label="创建用户" width="100"></el-table-column>
        <el-table-column prop="tipFee" label="附加费用" width="100"></el-table-column>
        <el-table-column prop="productTotal" label="产品总价" width="100"></el-table-column>
        <el-table-column prop="soTotal" label="销售单总价" width="100"></el-table-column>
        <el-table-column prop="payType" label="付款方式" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.payType == 1">货到付款</span>
            <span v-else-if="scope.row.payType == 2">款到发货</span>
            <span v-else-if="scope.row.payType == 3">预付款到发货</span>
          </template>
        </el-table-column>
        <el-table-column prop="prePayFee" label="最低预付金额" width="150"></el-table-column>
        <el-table-column prop="status" label="处理状态" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">新增</span>
            <span v-else-if="scope.row.status == 2">已收货</span>
            <span v-else-if="scope.row.status == 3">已付款</span>
            <span v-else-if="scope.row.status == 4">已了结</span>
            <span v-else-if="scope.row.status == 5">已预付</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="showDetails(scope.row)" type="text" size="small" class="details_btn">详情</el-button>
            <el-button type="text" size="small" @click="settle(scope.row)">了结</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 销售单明细弹框 -->
    <el-dialog title="详情" :visible.sync="dialogDetailsVisible">
      <el-table :data="soitems">
        <el-table-column property="productCode" label="产品编号" width="100"></el-table-column>
        <el-table-column property="productName" label="产品名称" width="200"></el-table-column>
        <el-table-column property="unitPrice" label="销售单价" width="150"></el-table-column>
        <el-table-column property="num" label="产品数量" width="150"></el-table-column>
        <el-table-column property="unitName" label="数量单位" width="100"></el-table-column>
        <el-table-column property="itemPrice" label="产品明细总价" width="200"></el-table-column>
      </el-table>
    </el-dialog>
    <!-- 分页栏 -->
    <div class="pagination">
      <el-pagination @current-change="handleCurrentPageChange" background layout="prev, pager, next" :total="totalSalelist"> </el-pagination>
    </div>
  </div>
</template>

<script>
import { apiSomainEnd, apiGetSomainQuery, apiGetSomainQueryItem } from '@/request/api'
import PaytypeQueryBar from '@/components/PaytypeQueryBar'

export default {
  components: {
    PaytypeQueryBar
  },
  data() {
    return {
      saleList: [],
      totalSalelist: 1,
      currentPage: 1,
      soitems: [],
      dialogDetailsVisible: false
    }
  },
  methods: {
    //货到付款
    cashOnDelivery() {
      this.getSomainList(1, 3, this.currentPage)
    },
    //款到发货
    paymentToDelivery() {
      this.getSomainList(2, 2, this.currentPage)
    },
    //预付款到发货
    advancePaymentToDelivery() {
      this.getSomainList(3, 3, this.currentPage)
    },
    //打开详情
    showDetails(row) {
      this.dialogDetailsVisible = true
      this.getSomainQueryItem(row.soId)
    },
    //了结
    settle(row) {
      this.$confirm('此操作将了结该销售单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          apiSomainEnd({
            soId: row.soId,
            payType: row.payType,
            page: this.currentPage
          }).then(res => {
            if (res.code === 2) {
              this.$message({
                type: 'success',
                message: res.message
              })
              this.saleList = res.data.list
            } else {
              this.$message({
                type: 'error',
                message: res.message
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消了结'
          })
        })
    },
    //获取指定付款方式的新增销售单数据
    getSomainList(payType = '', status = '', page = 1) {
      apiGetSomainQuery({
        payType,
        status,
        page
      }).then(res => {
        this.saleList = res.list
        this.totalSalelist = res.total
      })
    },
    //获取指定销售单的明细
    getSomainQueryItem(soId) {
      apiGetSomainQueryItem({
        soId
      }).then(res => {
        this.soitems = res
      })
    },
    //页数改变
    handleCurrentPageChange(page) {
      this.currentPage = page
      this.getSomainList(this.currentPage)
    }
  },
  mounted() {
    this.getSomainList(1, 3, this.currentPage)
  }
}
</script>
<style lang="less" scoped>
.endlist_wrapper {
  padding-left: 20px;
}
</style>
