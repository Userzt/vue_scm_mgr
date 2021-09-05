<template>
  <div class="poreport_wrapper">
    <ReportQueryBar title="月度入库报表" @query="query($event)" />
    <div class="datanum_show">
      <span>入库单据数：{{ queryData.total }}</span>
      <span>产品总数量:{{ queryData.totalNum }}</span>
      <span>入库产品总金额{{ (queryData.productTotal ? queryData.productTotal : 0).toFixed(2) }} 元</span>
    </div>

    <!-- 渲染查询到的数据 -->
    <el-table :data="dataList" border style="width: 931px">
      <el-table-column type="index" label="序号" width="80"> </el-table-column>
      <el-table-column prop="poId" label="采购单编号" width="150"> </el-table-column>
      <el-table-column prop="stockTime" label="入库日期" width="160"></el-table-column>
      <el-table-column prop="productCode" label="产品编号" width="150"></el-table-column>
      <el-table-column prop="name" label="产品名称" width="150"></el-table-column>
      <el-table-column prop="stockNum" label="产品数" width="120"></el-table-column>
      <el-table-column prop="productTotal" label="产品总金额" width="120"></el-table-column>
    </el-table>
    <!-- 分页栏 -->
    <div class="pagination">
      <el-pagination @current-change="handleCurrentPageChange" background layout="prev, pager, next" :total="totalList"> </el-pagination>
    </div>
  </div>
</template>

<script>
import ReportQueryBar from '@/components/ReportQueryBar'
import { apiGetReportInstock } from '@/request/api'
import jutils from 'jutils-src'

export default {
  components: {
    ReportQueryBar
  },
  data() {
    return {
      queryData: {
        total: '',
        totalNum: '',
        productTotal: ''
      },
      dataList: [],
      currentPage: 1,
      totalList: 0,
      monthData: ''
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
      apiGetReportInstock({
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
  padding-right: 700px;
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
