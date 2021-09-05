<template>
  <div class="query_wrapper">
    <el-form :inline="true" ref="queryForm" :model="queryForm" label-width="80px">
      <el-form-item label="销售单编号" label-width="85px">
        <el-input v-model="queryForm.soId" placeholder="单号"></el-input>
      </el-form-item>
      <el-form-item label="客户" label-width="50px">
        <el-select v-model="queryForm.customerCode ">
          <el-option label="" value=""></el-option>
          <el-option v-for="item in customerList" :key="item.customerCode " :label="item.name" :value="item.customerCode ">
            {{ item.name }} - - {{ item.customerCode  }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="起始时间|结束时间" label-width="140px">
        <el-date-picker v-model="queryForm.startDate" type="datetime" placeholder="选择起始时间" class="start_time_input"> </el-date-picker>
        <el-date-picker v-model="queryForm.endDate" type="datetime" placeholder="选择结束时间"> </el-date-picker>
      </el-form-item>
      <el-form-item label="付款方式" label-width="85px">
        <el-select v-model="queryForm.payType" placeholder="请选择">
          <el-option label="" value=""></el-option>
          <el-option label="货到付款" value="1"></el-option>
          <el-option label="款到发货" value="2"></el-option>
          <el-option label="预付款到发货" value="3"></el-option>
        </el-select>
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
      <el-button type="primary" @click="query" icon="el-icon-search">查询</el-button>
    </el-form>

    <!-- 查询到的数据渲染 -->
    <el-table :data="queryList" border style="width: 1301px">
      <el-table-column type="index" label="编号" width="100"> </el-table-column>
      <el-table-column prop="soId" label="销售单编号" width="150"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
      <el-table-column prop="customerName" label="客户名字" width="150"> </el-table-column>
      <el-table-column prop="account" label="创建用户" width="100"></el-table-column>
      <el-table-column prop="tipFee" label="附加费用" width="100"></el-table-column>
      <el-table-column prop="productTotal" label="采购产品总价" width="150"></el-table-column>
      <el-table-column prop="soTotal" label="采购单总价" width="100"></el-table-column>
      <el-table-column prop="payType" label="付款方式" width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.payType == 1">货到付款</span>
          <span v-else-if="scope.row.payType == 2">款到发货</span>
          <span v-else-if="scope.row.payType == 3">预付款到发货</span>
        </template>
      </el-table-column>
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
      <el-pagination @current-change="handleCurrentPageChange" background layout="prev, pager, next" :total="totalQuerylist"> </el-pagination>
    </div>
  </div>
</template>

<script>
import { apiGetSomainQuery ,apiGetCustomer} from '@/request/api'

export default {
  data() {
    return {
      queryForm: {
        soId: '',
        customerCode : '',
        payType: '',
        startDate: '',
        endDate: '',
        status: '',
        page: 1
      },
      //所有供应商
      customerList: [],
      //查询到的数据
      queryList: [],
      currentPage: 1,
      totalQuerylist: 0
    }
  },
  methods: {
    //查询
    query() {
      this.getSaleList()
    },
    //获取所有的客户
   getCustomerAll() {
      apiGetCustomer({}).then(res => {
        this.customerList = res.list
      })
    },
    //获取查询到的数据
    getSaleList() {
      apiGetSomainQuery({
        soId: this.queryForm.soId,
        customerCode : this.queryForm.customerCode ,
        payType: this.queryForm.payType,
        startDate: this.queryForm.startDate,
        endDate: this.queryForm.endDate,
        status: this.queryForm.status,
        page: this.currentPage
      }).then(res => {
        this.queryList = res.list
        this.totalQuerylist = res.total
      })
    },
    //页数改变
    handleCurrentPageChange(page) {
      this.currentPage = page
      this.getSaleList()
    }
  },
  mounted() {
    this.getCustomerAll()
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
