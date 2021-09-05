<template>
  <div class="payquery_wrapper">
    <el-form :inline="true" ref="queryForm" :model="queryForm" label-width="80px">
      <el-form-item label="开始时间" label-width="70px">
        <el-date-picker v-model="queryForm.startDate" type="datetime" placeholder="选择起始时间" class="start_time_input"> </el-date-picker>
      </el-form-item>
      <el-form-item label="截止时间" label-width="70px">
        <el-date-picker v-model="queryForm.endDate" type="datetime" placeholder="选择结束时间"> </el-date-picker>
      </el-form-item>
      <el-form-item label="收支类型:">
        <el-radio-group v-model="queryForm.type">
          <el-radio label="收入">收入</el-radio>
          <el-radio label="支出">支出</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="付款方式" label-width="85px">
        <el-select v-model="queryForm.payType" placeholder="请选择">
          <el-option label="" value=""></el-option>
          <el-option label="货到付款" value="1"></el-option>
          <el-option label="款到发货" value="2"></el-option>
          <el-option label="预付款到发货" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="相关单据号" label-width="85px">
        <el-input v-model="queryForm.no" placeholder="单号"></el-input>
      </el-form-item>
      <el-button type="primary" @click="query" icon="el-icon-search">查询</el-button>
    </el-form>

    <!-- 渲染搜索得到的数据 -->
    <el-table :data="queryList" border style="width: 1301px">
      <el-table-column type="index" label="编号" width="100"> </el-table-column>
      <el-table-column prop="payTime" label="付款时间" width="200"></el-table-column>
      <el-table-column prop="ordercode" label="相关单据号" width="150"> </el-table-column>
      <el-table-column prop="account" label="经手人" width="100"></el-table-column>
      <el-table-column prop="payPrice" label="付款金额" width="100"></el-table-column>
      <el-table-column prop="payType" label="单据付款方式" width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.payType == 1">货到付款</span>
          <span v-else-if="scope.row.payType == 2">款到发货</span>
          <span v-else-if="scope.row.payType == 3">预付款到发货</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { apiGetFinanceQuery } from '@/request/api'

export default {
  data() {
    return {
      queryForm: {
        no: '',
        type: '收入',
        payType: '',
        startDate: '',
        endDate: '',
        page: 1
      },
      //查询到的数据
      queryList: [],
      currentPage: 1,
      totalQuerylist: 0
    }
  },
  methods: {
    //查询
    query() {
      this.getQueryList()
    },
    //获取查询到的数据
    getQueryList() {
      apiGetFinanceQuery({
        no: this.queryForm.no,
        type: this.queryForm.type,
        payType: this.queryForm.payType,
        startDate: this.queryForm.startDate,
        endDate: this.queryForm.endDate,
        page: this.currentPage
      }).then(res => {
        console.log(res)
        this.queryList = res.list
        this.totalQuerylist = res.total
      })
    },
    //页数改变
    handleCurrentPageChange(page) {
      this.currentPage = page
      this.getQueryList()
    }
  }
}
</script>
<style lang="less" scoped>
.payquery_wrapper {
  padding-left: 20px;
}
</style>
