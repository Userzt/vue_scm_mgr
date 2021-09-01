<template>
  <div class="sale_sort_warpper">
    <div class="sale_mgr" v-show="!isUpdate">
      <div class="add_sale">
        <el-button type="primary" icon="el-icon-plus" @click="saleAdd">添加</el-button>
      </div>
      <div class="all_sale">
        <el-table :data="saleList" border style="width: 100%">
          <el-table-column type="index" label="序号" width="150"> </el-table-column>
          <el-table-column prop="categoryId" label="分类序列号" width="150"> </el-table-column>
          <el-table-column prop="name" label="产品类别名称" width="150"> </el-table-column>
          <el-table-column prop="remark" label="描述" width="250"></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="upadateSale(scope.row)" type="text" size="small">修改</el-button>
              <el-button type="text" size="small" @click="delSale(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页栏 -->
      <div class="pagination">
        <el-pagination @current-change="handleCurrentPageChange" background layout="prev, pager, next" :total="totalSale"> </el-pagination>
      </div>
    </div>

    <!-- 修改产品分类 -->
    <div class="sale_update" v-show="isUpdate">
      <div class="tit">
        <span>基本信息</span>
      </div>
      <div class="update_form">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="分类序列号" prop="categoryId">
            <el-input v-model="ruleForm.categoryId" disabled></el-input>
          </el-form-item>
          <el-form-item label="分类名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="remark">
            <el-input v-model="ruleForm.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
            <el-button @click="reback">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetSaleCategory, apiUpdateSaleCategory, apiDelSaleCategory } from '@/request/api'

export default {
  data() {
    return {
      saleList: [],
      isUpdate: false,
      totalSale: 1,
      currentPage: 1,
      ruleForm: {
        categoryId: '',
        name: '',
        remark: ''
      },
      rules: {
        categoryId: [{ required: true, message: '请输入用户账号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入用户名字', trigger: 'blur' }]
      }
    }
  },
  methods: {
    //添加产品分类
    saleAdd() {
      this.$router.push('addCategory')
    },
    //获取产品分类数据
    getSaleList() {
      apiGetSaleCategory({
        page: this.currentPage
      }).then(res => {
        this.totalSale = res.total
        this.saleList = res.list
      })
    },
    //页数改变
    handleCurrentPageChange(page) {
      this.currentPage = page
      this.getSaleList()
    },
    //编辑用户信息
    upadateSale(row) {
      this.isUpdate = true
      this.ruleForm.categoryId = row.categoryId
      this.ruleForm.name = row.name
      this.ruleForm.remark = row.remark
    },
    //删除产品分类
    delSale(row) {
      this.$confirm('此操作将删除该产品分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          apiDelSaleCategory({
            categoryId: row.categoryId,
            page: this.currentPage
          }).then(res => {
            console.log(res)
            if (res.code === 2) {
              this.$message({
                type: 'success',
                message: res.message
              })
              this.saleList = res.data
              this.getSaleList()
            } else if (res.code === 4) {
              this.$message({
                type: 'warning',
                message: '该分类下存在商品，无法删除！'
              })
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
            message: '已取消删除'
          })
        })
    },
    //提交修改
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          apiUpdateSaleCategory({
            categoryId: this.ruleForm.categoryId,
            name: this.ruleForm.name,
            remark: this.ruleForm.remark
          })
            .then(res => {
              if (res.code === 2) {
                this.$message({
                  type: 'success',
                  message: res.message
                })
                this.isUpdate = false
                this.getSaleList()
              } else {
                this.$message({
                  type: 'warning',
                  message: res.message
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          return false
        }
      })
    },
    //修改用户信息返回
    reback() {
      this.isUpdate = false
    }
  },
  mounted() {
    this.getSaleList()
  }
}
</script>
<style lang="less" scoped>
.sale_mgr {
  padding-left: 20px;
  .add_sale {
    margin-bottom: 40px;
  }
  .all_sale {
    width: 851px;
  }
  .pagination {
    margin-top: 30px;
  }
}

//修改用户
.sale_update {
  padding: 30px;
  .update_form {
    width: 800px;
    margin-top: 40px;
  }
  .tit {
    border-bottom: 2px solid #ccc;
    padding-bottom: 6px;
    span {
      border-bottom: 2px solid #66c9f3;
      padding-bottom: 5px;
    }
  }
}
</style>
