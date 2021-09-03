<template>
  <div class="all_product_warpper">
    <div class="product_mgr" v-show="!isUpdate">
      <div class="add_product">
        <el-button type="primary" icon="el-icon-plus" @click="productAdd">添加</el-button>
      </div>
      <!-- 查询区 -->
      <div class="search_product">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="产品编号">
            <el-input v-model="searchForm.productCode"></el-input>
          </el-form-item>
          <el-form-item label="产品名称">
            <el-input v-model="searchForm.name"></el-input>
          </el-form-item>
          <el-form-item label="产品类别">
            <el-select v-model="searchForm.categoryId" placeholder="请选择分类">
              <el-option label="" value=""></el-option>
              <el-option v-for="item in allSaleCategory" :key="item.categoryId" :label="item.name" :value="item.categoryId"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 产品展示区 -->
      <div class="all_product">
        <el-table :data="productList" border style="width: 100%">
          <el-table-column type="index" label="序号" width="100"> </el-table-column>
          <el-table-column prop="productCode" label="产品编号" width="150"> </el-table-column>
          <el-table-column prop="name" label="产品名称" width="150"> </el-table-column>
          <el-table-column prop="unitName" label="数量单位" width="100"></el-table-column>
          <el-table-column prop="categoryName" label="分类名称" width="150"></el-table-column>
          <el-table-column prop="createDate" label="添加日期" width="200"></el-table-column>
          <el-table-column prop="price" label="销售价格" width="100"></el-table-column>
          <el-table-column prop="remark" label="产品描述" width="250"></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="upadateProduct(scope.row)" type="text" size="small">修改</el-button>
              <el-button type="text" size="small" @click="delProduct(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页栏 -->
      <div class="pagination">
        <el-pagination @current-change="handleCurrentPageChange" background layout="prev, pager, next" :total="totalProduct"> </el-pagination>
      </div>
    </div>

    <!-- 修改产品 -->
    <div class="product_update" v-show="isUpdate">
      <div class="tit">
        <span>基本信息</span>
      </div>
      <div class="update_form">
        <el-form :model="productForm" :rules="rules" ref="productForm" label-width="100px" class="demo-productForm">
          <el-form-item label="产品编号" prop="productCode">
            <el-input v-model="productForm.productCode" disabled></el-input>
          </el-form-item>
          <el-form-item label="产品名称" prop="name">
            <el-input v-model="productForm.name"></el-input>
          </el-form-item>
          <el-form-item label="数量单位" prop="unitName">
            <el-input v-model="productForm.unitName"></el-input>
          </el-form-item>
          <el-form-item label="产品分类" prop="categoryId">
            <el-select v-model="productForm.categoryId">
              <el-option v-for="item in allSaleCategory" :key="item.categoryId" :label="item.name" :value="item.categoryId"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销售价" prop="price">
            <el-input v-model="productForm.price"></el-input>
          </el-form-item>
          <el-form-item label="添加日期" prop="createDate">
            <el-input v-model="productForm.createDate" disabled></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="remark">
            <el-input v-model="productForm.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('productForm')">修改</el-button>
            <el-button @click="reback">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetProduct, apiDelProduct, apiGetAllSaleCategory, apiUpdateProduct } from '@/request/api'

export default {
  data() {
    return {
      productList: [],
      totalProduct: 1,
      isUpdate: false,
      currentPage: 1,
      allSaleCategory: [],

      //产品表单
      productForm: {
        productCode: '',
        name: '',
        unitName: '',
        categoryName: '',
        createDate: '',
        price: '',
        remark: '',
        categoryId: ''
      },
      rules: {
        productCode: [{ required: true, message: '请输入产品编号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
        unitName: [{ required: true, message: '请输入该产品数量单位', trigger: 'blur' }],
        categoryId: [{ required: true, message: '请选择产品分类名称', trigger: 'blur' }],
        price: [
          { required: true, message: '请选择产品价格', trigger: 'blur' },
          { pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/, message: '请输入格式正确的价格', trigger: 'blur' }
        ]
      },

      //查询表单
      searchForm: {
        productCode: '',
        name: '',
        categoryId: ''
      }
    }
  },
  methods: {
    //添加产品
    productAdd() {
      this.$router.push('addproducts')
    },
    //查询产品
    onSearch() {
      console.log(this.currentPage)
      this.getProductList(this.currentPage, this.searchForm.productCode, this.searchForm.name, this.searchForm.categoryId)
    },
    //获取产品数据
    getProductList(page = 1, productCode = '', name = '', categoryld = '') {
      apiGetProduct({
        page,
        productCode,
        name,
        categoryld
      }).then(res => {
        console.log(res.list)
        this.productList = res.list
        this.totalProduct = res.total
      })
    },
    //页数改变
    handleCurrentPageChange(page) {
      this.currentPage = page
      this.getProductList(this.currentPage)
    },
    //编辑用户信息
    upadateProduct(row) {
      console.log(row)
      this.isUpdate = true
      this.productForm.productCode = row.productCode
      this.productForm.name = row.name
      this.productForm.unitName = row.unitName
      this.productForm.categoryId = row.categoryId
      this.productForm.price = row.price
      this.productForm.createDate = row.createDate
      this.productForm.remark = row.remark
    },
    //删除产品
    delProduct(row) {
      this.$confirm('此操作将删除该产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log('sadd')
          apiDelProduct({
            productCode: row.productCode,
            page: this.currentPage
          }).then(res => {
            console.log(res)
            if (res.code === 2) {
              this.$message({
                type: 'success',
                message: res.message
              })
              this.productList = res.data
              this.getProductList(this.currentPage)
            } else if (res.code === 4) {
              this.$message({
                type: 'warning',
                message: '该产品存在相关的销售单或采购单，无法删除！'
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
          apiUpdateProduct({
            productCode: this.productForm.productCode,
            name: this.productForm.name,
            unitName: this.productForm.unitName,
            categoryId: this.productForm.categoryId,
            price: this.productForm.price,
            createDate: this.productForm.createDate,
            remark: this.productForm.remark
          })
            .then(res => {
              console.log(res)
              if (res.code === 2) {
                this.$message({
                  type: 'success',
                  message: res.message
                })
                this.isUpdate = false
                this.getProductList(this.currentPage)
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
    },
    //获取所有产品分类列表
    getAllCategory() {
      apiGetAllSaleCategory({}).then(res => {
        console.log(res)
        this.allSaleCategory = res
      })
    }
  },
  mounted() {
    this.getProductList(this.currentPage)
    this.getAllCategory()
  }
}
</script>
<style lang="less" scoped>
.product_mgr {
  padding-left: 20px;
  .add_product {
    margin-bottom: 25px;
  }
  .all_product {
    width: 1351px;
  }
}

//修改产品
.product_update {
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
