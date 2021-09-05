<template>
  <div class="poreport_wrapper">
    <ReportQueryBar title="月度采购报表" @query="query($event)" />
    <div class="datanum_show">
      <span>采购单总数：{{ queryData.totalnum }}</span>
      <span>已了结数：{{ queryData.endtotalnum }}</span>
      <span>采购单总金额：{{ (queryData.pototal ? queryData.pototal : 0).toFixed(2) }} 元</span>
      <span>已付款金额：{{ (queryData.totalpay ? queryData.totalpay : 0).toFixed(2) }} 元</span>
    </div>

    <!-- 渲染查询到的数据 -->
    <el-table :data="dataList" border style="width: 1141px">
      <el-table-column type="index" label="序号" width="80"> </el-table-column>
      <el-table-column prop="poId" label="采购单编号" width="120"> </el-table-column>
      <el-table-column prop="venderName" label="供应商名称" width="120"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
      <el-table-column prop="account" label="创建用户" width="100"></el-table-column>
      <el-table-column prop="poTotal" label="采购单总金额" width="120"></el-table-column>
      <el-table-column prop="tipFee" label="未付款金额" width="100"></el-table-column>
      <el-table-column prop="payType" label="付款方式" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.payType == 1">货到付款</span>
          <span v-else-if="scope.row.payType == 2">款到发货</span>
          <span v-else-if="scope.row.payType == 3">预付款到发货</span>
        </template>
      </el-table-column>
      <el-table-column prop="prePayFee" label="最低预付金额" width="120"></el-table-column>
      <el-table-column prop="status" label="采购单状态" width="100">
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
import { apiGetReportPomain } from '@/request/api'
import jutils from 'jutils-src'

export default {
  components: {
    ReportQueryBar
  },
  data() {
    return {
      queryData: {
        totalnum: '',
        endtotalnum: '',
        pototal: '',
        totalpay: ''
      },
      dataList: [],
      monthData: '',
      currentPage: 1,
      totalList: 0
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
        this.getData()
      }
    },
    //获取查询数据
    getData() {
      apiGetReportPomain({
        time: jutils.formatDate(this.monthData, 'YYYY-MM'),
        page: this.currentPage
      }).then(res => {
        this.queryData = res
        this.dataList = res.details.list
        this.totalList = res.details.total
      })
    },
    //页数改变
    handleCurrentPageChange(page) {
      this.currentPage = page
      this.getData()
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
}
</style>
