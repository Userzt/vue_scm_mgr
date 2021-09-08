<template>
  <div class="query_stock_wrapper">
    <!-- 查询区 -->
    <div class="query_stock" v-show="!isClick">
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
      <!-- 产品显示 -->
      <el-table :data="queryList" style="width: 901px" @row-click="warehouseReport" border>
        <el-table-column type="index" label="编号" width="100"> </el-table-column>
        <el-table-column prop="productCode" label="采购单编号" width="150"> </el-table-column>
        <el-table-column prop="name" label="产品名称" width="200"> </el-table-column>
        <el-table-column prop="num" label="库存数量" width="150"> </el-table-column>
        <el-table-column prop="poNum" label="采购在途数" width="150"> </el-table-column>
        <el-table-column prop="soNum" label="预销售数" width="150"> </el-table-column>
      </el-table>
    </div>

    <!-- 点击某一行看库存记录 -->
    <div class="look_report" v-show="isClick">
      <div class="stocktype_select">
        <el-button type="primary" @click="inStock">入库记录</el-button>
        <el-button type="primary" @click="outStock">出库记录</el-button>
        <el-button type="primary" @click="reback">返回</el-button>
      </div>
      <div class="product_name">
        <p>当前查看：{{ currentProduct }}</p>
      </div>
      <!-- 入库记录 -->
      <el-table :data="stockReportList" style="width: 100%" border v-show="isInstock">
        <el-table-column type="index" label="编号" width="150"> </el-table-column>
        <el-table-column prop="stockTime" label="入库时间" width="200"> </el-table-column>
        <el-table-column prop="orderCode" label="相关采购单号" width="150"> </el-table-column>
        <el-table-column prop="createUser" label="入库经手人" width="150"> </el-table-column>
        <el-table-column prop="stockNum" label="入库数量" width="150"> </el-table-column>
        <el-table-column prop="stockType" label="入库类型" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.stockType === 1">采购入库</span>
            <span v-else-if="scope.row.stockType === 2">销售入库</span>
            <span v-else-if="scope.row.stockType === 3">盘点入库</span>
            <span v-else-if="scope.row.stockType === 4">盘点出库</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 出库记录 -->
      <el-table :data="stockReportList" style="width: 100%" border v-show="!isInstock">
        <el-table-column type="index" label="编号" width="150"> </el-table-column>
        <el-table-column prop="stockTime" label="入库时间" width="200"> </el-table-column>
        <el-table-column prop="orderCode" label="相关采购单号" width="150"> </el-table-column>
        <el-table-column prop="createUser" label="出库经手人" width="150"> </el-table-column>
        <el-table-column prop="stockNum" label="出库数量" width="150"> </el-table-column>
        <el-table-column prop="stockType" label="出库类型" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.stockType === 1">采购入库</span>
            <span v-else-if="scope.row.stockType === 2">销售入库</span>
            <span v-else-if="scope.row.stockType === 3">盘点入库</span>
            <span v-else-if="scope.row.stockType === 4">盘点出库</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页栏 -->
    <div class="pagination">
      <el-pagination @current-change="handleCurrentPageChange" background layout="prev, pager, next" :total="totalList"> </el-pagination>
    </div>
  </div>
</template>

<script>
import { apiGetStock, apiGetStockAlterRecord } from '@/request/api'

export default {
  data() {
    return {
      isClick: false,
      isInstock: true,
      stockReportList: [],
      currentProductCode: '',
      currentType: 1,
      currentProduct: '',
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
    //点击表格某一行查看库存记录
    warehouseReport(row) {
      this.currentProductCode = row.productCode
      this.currentProduct = row.name
      console.log(row)
      this.isClick = true
      this.GetStockAlterRecord(row.productCode, 1, 1)
    },
    //入库记录
    inStock() {
      this.isInstock = true
      this.currentType = 1
      this.GetStockAlterRecord(this.currentProductCode, 1, 1)
    },
    //出库记录
    outStock() {
      this.isInstock = false
      this.currentType = 2
      this.GetStockAlterRecord(this.currentProductCode, 2, 1)
    },
    //返回
    reback() {
      this.isClick = false
      this.getStockList('', '', '', '', 1)
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
    //获得指定产品的库存变更记录
    GetStockAlterRecord(productCode, stockType, page) {
      apiGetStockAlterRecord({
        productCode,
        stockType,
        page
      }).then(res => {
        this.totalList = res.data.total
        this.stockReportList = res.data.list
      })
    },

    //页数改变
    handleCurrentPageChange(page) {
      this.currentPage = page
      if (this.isClick === false) {
        this.getStockList('', '', '', '', this.currentPage)
      } else {
        this.GetStockAlterRecord(this.currentProductCode, this.currentType, this.currentPage)
      }
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
  .stocktype_select {
    margin-bottom: 20px;
    .el-button {
      margin-left: 0 !important;
      border-radius: 0 !important;
      border-right: 1px solid #fff !important;
    }
  }
  .product_name{
    margin-bottom: 20px;
    font-size: 16px;
    color: rgb(128, 126, 126);
  }
}
</style>
