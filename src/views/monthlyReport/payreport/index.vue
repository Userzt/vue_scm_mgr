<template>
  <div class="poreport_wrapper">
    <ReportQueryBar title="月度收支报表" @query="query($event)" />
    <div class="datanum_show">
      <span>收款总金额：{{ (queryData.recePrice ? queryData.recePrice : 0).toFixed(2) }} 元</span>
      <span>付款总金额：{{ (queryData.payPrice ? queryData.payPrice : 0).toFixed(2) }} 元</span>
      <span>收款交易次数：{{ queryData.receCount }}</span>
      <span>付款交易次数：{{ queryData.payCount }}</span>
    </div>
    <div class="change_btn">
      <el-button type="primary" plain @click="receipt">收款明细</el-button>
      <el-button type="primary" plain @click="pay">付款明细</el-button>
    </div>

    <!-- 收款明细 -->
    <el-table :data="dataList" border style="width: 881px" v-show="isReceiptTable">
      <el-table-column type="index" label="序号" width="80"> </el-table-column>
      <el-table-column prop="soId" label="销售单号" width="120"> </el-table-column>
      <el-table-column prop="createTime" label="销售单日期" width="200"> </el-table-column>
      <el-table-column prop="pay_time" label="收款日期" width="160"></el-table-column>
      <el-table-column prop="pay_price" label="收款金额" width="100"></el-table-column>
      <el-table-column prop="account" label="经手人" width="120"></el-table-column>
      <el-table-column prop="status" label="处理状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">新增</span>
          <span v-else-if="scope.row.status == 2">已收货</span>
          <span v-else-if="scope.row.status == 3">已付款</span>
          <span v-else-if="scope.row.status == 4">已了结</span>
          <span v-else-if="scope.row.status == 5">已预付</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 付款明细 -->
    <el-table :data="dataList" border style="width: 881px" v-show="!isReceiptTable">
      <el-table-column type="index" label="序号" width="80"> </el-table-column>
      <el-table-column prop="poId" label="采购单号" width="120"> </el-table-column>
      <el-table-column prop="createTime" label="采购日期" width="200"> </el-table-column>
      <el-table-column prop="pay_time" label="付款日期" width="160"></el-table-column>
      <el-table-column prop="pay_price" label="付款金额" width="100"></el-table-column>
      <el-table-column prop="account" label="经手人" width="120"></el-table-column>
      <el-table-column prop="status" label="处理状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">新增</span>
          <span v-else-if="scope.row.status == 2">已收货</span>
          <span v-else-if="scope.row.status == 3">已付款</span>
          <span v-else-if="scope.row.status == 4">已了结</span>
          <span v-else-if="scope.row.status == 5">已预付</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页栏 -->
    <div class="pagination">
      <el-pagination @current-change="handleCurrentPageChange" background layout="prev, pager, next" :total="totalList"> </el-pagination>
    </div>
  </div>
</template>

<script>
import ReportQueryBar from '@/components/ReportQueryBar'
import { apiGetReportPayment, apiGetReceiptDetail, apiGetPayDetail } from '@/request/api'
import jutils from 'jutils-src'

export default {
  components: {
    ReportQueryBar
  },
  data() {
    return {
      queryData: {
        recePrice: '',
        payPrice: '',
        receCount: '',
        payCount: ''
      },
      dataList: [],
      currentPage: 1,
      totalList: 0,
      monthData: '',
      isReceiptTable: true
    }
  },
  methods: {
    query(month) {
      this.month = month
      this.monthData = month
      if (month === '' || month === null) {
        this.$message({
          type: 'warning',
          message: '请输入月份'
        })
      } else {
        apiGetReportPayment({
          time: jutils.formatDate(month, 'YYYY-MM'),
          page: this.currentPage
        }).then(res => {
          this.queryData = res
        })
        this.getReceiptList()
      }
    },
    //收款明细
    receipt() {
      this.isReceiptTable = true
      this.currentPage = 1
      this.getReceiptList()
    },
    //付款明细
    pay() {
      this.isReceiptTable = false
      this.currentPage = 1
      this.getPayList()
    },
    //获取收款明细数据
    getReceiptList() {
      apiGetReceiptDetail({
        time: jutils.formatDate(this.monthData, 'YYYY-MM'),
        page: this.currentPage
      }).then(res => {
        this.dataList = res.list
        this.totalList = res.total
      })
    },
    //获取付款明细数据
    getPayList() {
      apiGetPayDetail({
        time: jutils.formatDate(this.monthData, 'YYYY-MM'),
        page: this.currentPage
      }).then(res => {
        this.dataList = res.list
        this.totalList = res.total
      })
    },
    //页数改变
    handleCurrentPageChange(page) {
      this.currentPage = page
      if (this.isReceiptTable === true) {
        this.getReceiptList()
      } else {
        this.getPayList()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.poreport_wrapper {
  padding-left: 20px;
  padding-right: 400px;
  .datanum_show {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    span {
      font-size: 16px;
      font-weight: 600;
    }
  }
  .change_btn {
    margin-bottom: 30px;
    margin-top: 10px;
  }
}
</style>
