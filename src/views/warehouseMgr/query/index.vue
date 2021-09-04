<template>
  <div class="query_stock_wrapper">
    <!-- 查询区 -->
    <div class="query_stock">
      <el-form :inline="true" :rules="rules" ref="queryForm" :model="queryForm" class="demo-queryForm">
        <el-form-item label="产品编号">
          <el-input v-model="queryForm.productCode"></el-input>
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input v-model="queryForm.name"></el-input>
        </el-form-item>
        <el-form-item label="库存最小值" prop="min">
          <el-input v-model="queryForm.min"></el-input>
        </el-form-item>
        <el-form-item label="库存最大值" prop="max">
          <el-input v-model="queryForm.max"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch('queryForm')" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 产品显示 -->
    <el-table :data="queryList" style="width: 901px" border>
      <el-table-column type="index" label="编号" width="100"> </el-table-column>
      <el-table-column prop="productCode" label="采购单编号" width="150"> </el-table-column>
      <el-table-column prop="name" label="产品名称" width="200"> </el-table-column>
      <el-table-column prop="num" label="库存数量" width="150"> </el-table-column>
      <el-table-column prop="poNum" label="采购在途数" width="150"> </el-table-column>
      <el-table-column prop="soNum" label="预销售数" width="150"> </el-table-column>
    </el-table>
    <!-- 分页栏 -->
    <div class="pagination">
      <el-pagination @current-change="handleCurrentPageChange" background layout="prev, pager, next" :total="totalList"> </el-pagination>
    </div>
  </div>
</template>

<script>
import { apiGetStock } from '@/request/api'

export default {
  data() {
    return {
      queryForm: {
        productCode: '',
        name: '',
        min: 0,
        max: ''
      },
      rules: {
        min: [{ pattern: /^([1-9]\d*)|0$/, message: '不能为负数的整数', trigger: 'blur' }],
        max: [{ pattern: /^([1-9]\d*)|0$/, message: '不能为负数的整数', trigger: 'blur' }]
      },
      currentPage: 1,
      queryList: [],
      totalList: 0
    }
  },
  methods: {
    //查询
    onSearch(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.getStockList(this.queryForm.productCode, this.queryForm.name, this.queryForm.min, this.queryForm.max, this.currentPage)
        }
      })
    },
    //获取对应的销售单数据
    getStockList(productCode, name, min, max, page = 1) {
      apiGetStock({
        productCode,
        name,
        min,
        max,
        page
      }).then(res => {
        this.queryList = res.list
        this.totalList = res.total
      })
    },

    //页数改变
    handleCurrentPageChange(page) {
      this.currentPage = page
      this.getStockList('', '', '', '', this.currentPage)
    }
  },
  mounted() {
    this.getStockList('', '', '', '', 1)
  }
}
</script>
<style lang="less" scoped>
.query_stock_wrapper {
  padding-left: 20px;
}
</style>
