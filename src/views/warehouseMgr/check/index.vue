<template>
  <div class="check_wrapper">
    <el-table :data="stockList" style="width: 1001px" border>
      <el-table-column type="index" label="编号" width="100"> </el-table-column>
      <el-table-column prop="productCode" label="采购单编号" width="150"> </el-table-column>
      <el-table-column prop="name" label="产品名称" width="200"> </el-table-column>
      <el-table-column prop="num" label="库存数量" width="150"> </el-table-column>
      <el-table-column prop="poNum" label="采购在途数" width="150"> </el-table-column>
      <el-table-column prop="soNum" label="预销售数" width="150"> </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="check(scope.row)">盘点</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 盘点情况 -->
    <el-dialog title="盘点" :visible.sync="dialogFormVisible">
      <el-form :model="checkForm" :rules="rules" ref="checkForm" class="demo-checkForm">
        <el-form-item label="变化数量" label-width="80px" prop="num">
          <el-input v-model="checkForm.num" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="变化类型" label-width="80px" prop="type">
          <el-select v-model="checkForm.type" placeholder="请选择类型">
            <el-option label="损耗" value="损耗"></el-option>
            <el-option label="盘余" value="盘余"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="变化原因" label-width="80px" prop="description">
          <el-input v-model="checkForm.description"></el-input>
        </el-form-item>
        <el-form-item label="" label-width="83.5%">
          <el-button type="normal" @click="cancelCheck">取消</el-button>
          <el-button type="primary" plain @click="confirmCheck('checkForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 分页栏 -->
    <div class="pagination">
      <el-pagination @current-change="handleCurrentPageChange" background layout="prev, pager, next" :total="totalList"> </el-pagination>
    </div>
  </div>
</template>

<script>
import { apiGetStock, apiCheckStock } from '@/request/api'

export default {
  data() {
    return {
      stockList: [],
      totalList: 0,
      currentPage: 1,
      dialogFormVisible: false,
      productCode: '',
      originNum: '',
      checkForm: {
        num: '',
        type: '',
        description: ''
      },
      rules: {
        num: [
          { pattern: /^[1-9]\d*$/, message: '请输入正整数', trigger: 'blur' },
          { required: true, message: '请输入变化数量', trigger: 'blur' }
        ],
        type: [{ required: true, message: '请选择变化类型', trigger: 'blur' }],
        description: [{ required: true, message: '请输入变化原因', trigger: 'blur' }]
      }
    }
  },
  methods: {
    //盘点
    check(row) {
      this.productCode = row.productCode
      this.originNum = row.num
      this.dialogFormVisible = true
    },
    //确认盘点
    confirmCheck(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          apiCheckStock({
            productCode: this.productCode,
            originNum: this.originNum,
            num: this.checkForm.num,
            type: this.checkForm.type,
            description: this.checkForm.description,
            page: this.currentPage
          }).then(res => {
            if (res.code === 2) {
              this.$message({
                type: 'success',
                message: res.message
              })
              this.getStockList('', '', '', '', 1)
              this.dialogFormVisible = false
              this.checkForm.num = ''
              this.checkForm.type = ''
              this.checkForm.description = ''
            } else {
              this.$message({
                type: 'warning',
                message: res.message
              })
            }
          })
        }
      })
    },
    //取消盘点
    cancelCheck() {
      this.dialogFormVisible = false
      this.checkForm.num = ''
      this.checkForm.type = ''
      this.checkForm.description = ''
    },
    //页数改变
    handleCurrentPageChange(page) {
      this.currentPage = page
      this.getStockList('', '', '', '', this.currentPage)
    },
    //获得库存采购单数据
    getStockList(productCode, name, min, max, page = 1) {
      apiGetStock({
        productCode,
        name,
        min,
        max,
        page
      }).then(res => {
        this.stockList = res.list
        this.totalList = res.total
      })
    }
  },
  mounted() {
    this.getStockList('', '', '', '', 1)
  }
}
</script>
<style lang="less" scoped>
.check_wrapper {
  padding-left: 20px;
}
</style>
