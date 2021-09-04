<template>
  <div class="query_wrapper">
    <el-form :inline="true" ref="queryForm" :model="queryForm" label-width="80px">
      <el-form-item label="销售单编号" label-width="85px">
        <el-input v-model="queryForm.soId" placeholder="单号"></el-input>
      </el-form-item>
      <el-form-item label="客户" label-width="50px">
        <el-select v-model="queryForm.venderCode">
          <el-option label="" value=""></el-option>
          <el-option v-for="item in venderList" :key="item.venderCode" :label="item.name" :value="item.venderCode">
            {{ item.name }} - - {{ item.venderCode }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="起始时间|结束时间" label-width="140px">
        <el-date-picker v-model="queryForm.startDate" type="datetime" placeholder="选择起始时间" class="start_time_input"> </el-date-picker>
        <el-date-picker v-model="queryForm.endDate" type="datetime" placeholder="选择结束时间"> </el-date-picker>
      </el-form-item>
      <el-form-item label="处理状态">
        <el-select v-model="queryForm.status" placeholder="请选择">
          <el-option label="" value=""></el-option>
          <el-option label="新增" value="1"></el-option>
          <el-option label="已收货" value="2"></el-option>
          <el-option label="已付款" value="3"></el-option>
          <el-option label="已了结" value="4"></el-option>
          <el-option label="已预付" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="付款方式" label-width="85px">
        <el-select v-model="queryForm.payType" placeholder="请选择">
          <el-option label="" value=""></el-option>
          <el-option label="货到付款" value="1"></el-option>
          <el-option label="款到发货" value="2"></el-option>
          <el-option label="预付款到发货" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="query" icon="el-icon-search">查询</el-button>
    </el-form>
  </div>
</template>

<script>
import { apiBuylistQuery, apiGetVenderAll } from '@/request/api'

export default {
  data() {
    return {
      queryForm: {
        soId: '',
        venderCode: '',
        payType: '',
        startDate: '',
        endDate: '',
        status: '',
        page: 1
      },
      //所有供应商
      venderList: [],
      //查询到的数据
      queryList: [],
      currentPage: 1,
      totalBuylist: 0
    }
  },
  methods: {
    //查询
    query() {
      this.getSupplierList()
    },
    //获取所有供应商列表
    getVenderAll() {
      apiGetVenderAll({}).then(res => {
        this.venderList = res
      })
    },
    //获取查询到的数据
    getSupplierList() {
      apiBuylistQuery({
        soId: this.queryForm.soId,
        venderCode: this.queryForm.venderCode,
        payType: this.queryForm.payType,
        startDate: this.queryForm.startDate,
        endDate: this.queryForm.endDate,
        status: this.queryForm.status,
        page: this.currentPage
      }).then(res => {
        this.queryList = res.list
        this.totalBuylist = res.total
      })
    },
    //页数改变
    handleCurrentPageChange(page) {
      this.currentPage = page
      this.getSupplierList()
    }
  },
  mounted() {
    this.getVenderAll()
  }
}
</script>
<style lang="less" scoped>
.query_wrapper {
  padding-left: 20px;
  .start_time_input {
    margin-right: 10px;
  }
}
</style>
