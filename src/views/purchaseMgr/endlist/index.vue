<template>
  <div class="endlist_wrapper">
    <PaytypeQueryBar @cashOnDelivery="cashOnDelivery" @paymentToDelivery="paymentToDelivery" @advancePaymentToDelivery="advancePaymentToDelivery" />

    <!-- 采购单展示区 -->
    <div class="all_buylist" style="width:1501px">
      <el-table :data="buyList" border style="width: 100%">
        <el-table-column type="index" label="序号" width="100"> </el-table-column>
        <el-table-column prop="poId" label="采购单编号" width="150"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
        <el-table-column prop="venderName" label="供应商名称" width="100"> </el-table-column>
        <el-table-column prop="account" label="创建用户" width="100"></el-table-column>
        <el-table-column prop="tipFee" label="附加费用" width="100"></el-table-column>
        <el-table-column prop="productTotal" label="产品总价" width="100"></el-table-column>
        <el-table-column prop="poTotal" label="采购单总价" width="100"></el-table-column>
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

    <!-- 采购单明细弹框 -->
    <el-dialog title="详情" :visible.sync="dialogDetailsVisible">
      <el-table :data="poitems">
        <el-table-column property="poId" label="供货商编号" width="150"></el-table-column>
        <el-table-column property="productCode" label="产品编号" width="100"></el-table-column>
        <el-table-column property="productName" label="产品名字" width="170"></el-table-column>
        <el-table-column property="unitPrice" label="产品单价" width="100"></el-table-column>
        <el-table-column property="num" label="产品数量" width="150"></el-table-column>
        <el-table-column property="unitName" label="数量单位" width="100"></el-table-column>
        <el-table-column property="itemPrice" label="明细总价" width="150"></el-table-column>
      </el-table>
    </el-dialog>
    <!-- 分页栏 -->
    <div class="pagination">
      <el-pagination @current-change="handleCurrentPageChange" background layout="prev, pager, next" :total="totalBuylist"> </el-pagination>
    </div>
  </div>
</template>

<script>
import { apiBuylistQuery, apiGetPomainQueryItem, apiPomainEnd } from '@/request/api'
import PaytypeQueryBar from '@/components/PaytypeQueryBar'

export default {
  components: {
    PaytypeQueryBar
  },
  data() {
    return {
      buyList: [],
      totalBuylist: 1,
      currentPage: 1,
      poitems: [],
      dialogDetailsVisible: false
    }
  },
  methods: {
    //货到付款
    cashOnDelivery() {
      this.getSupplierList(1, 3, this.currentPage)
    },
    //款到发货
    paymentToDelivery() {
      this.getSupplierList(2, 2, this.currentPage)
    },
    //预付款到发货
    advancePaymentToDelivery() {
      this.getSupplierList(3, 3, this.currentPage)
    },
    //打开详情
    showDetails(row) {
      this.dialogDetailsVisible = true
      this.getPomainQueryItem(row.poId)
    },
    //了结
    settle(row) {
      this.$confirm('此操作将了结该采购单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          apiPomainEnd({
            poId: row.poId,
            payType: row.payType,
            page: this.currentPage
          }).then(res => {
            if (res.code === 2) {
              this.$message({
                type: 'success',
                message: res.message
              })
              this.buyList = res.data.list
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
    //获取指定付款方式的新增采购单数据
    getSupplierList(payType = '', status = '', page = 1) {
      apiBuylistQuery({
        payType,
        status,
        page
      }).then(res => {
        this.buyList = res.list
        this.totalBuylist = res.total
      })
    },
    //获取指定采购单的明细
    getPomainQueryItem(poId) {
      apiGetPomainQueryItem({
        poId
      }).then(res => {
        this.poitems = res
      })
    },
    //页数改变
    handleCurrentPageChange(page) {
      this.currentPage = page
      this.getSupplierList(this.currentPage)
    }
  },
  mounted() {
    this.getSupplierList(1, 3, this.currentPage)
  }
}
</script>
<style lang="less" scoped>
.endlist_wrapper {
  padding-left: 20px;
}
</style>
