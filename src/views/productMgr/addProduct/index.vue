<template>
  <div class="product_add">
    <div class="tit">
      <span>基本信息</span>
    </div>
    <div class="add_form">
      <el-form :model="productForm" :rules="rules" ref="productForm" label-width="100px" class="demo-productForm">
        <el-form-item label="产品编号" prop="productCode">
          <el-input v-model="productForm.productCode"></el-input>
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
          <el-button type="primary" @click="submitForm('productForm')">立即创建</el-button>
          <el-button @click="reback">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { apiAddProduct, apiGetAllSaleCategory } from '@/request/api'
import jutils from 'jutils-src'

export default {
  data() {
    return {
      allSaleCategory: [],
      productForm: {
        productCode: '',
        name: '',
        unitName: '',
        categoryName: '',
        createDate: jutils.formatDate(new Date(), 'YYYY-MM-DD HH:ii:ss'),
        price: '',
        remark: '',
        categoryId: ''
      },
      rules: {
        productCode: [
          { required: true, message: '请输入产品编号', trigger: 'blur' },
          { pattern: /^[0-9a-zA-Z]{4,10}$/, message: '只允许4-10位的数字和字母', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入产品名称', trigger: 'blur' },
          { max: 100, message: '长度不超过100', trigger: 'blur' }
        ],
        unitName: [{ required: true, message: '请输入该产品数量单位', trigger: 'blur' }],
        categoryId: [{ required: true, message: '请选择产品分类名称', trigger: 'blur' }],
        price: [
          { required: true, message: '请选择产品价格', trigger: 'blur' },
          { pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/, message: '请输入格式正确的价格', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //添加产品
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          apiAddProduct({
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
                this.$router.push('allproducts')
              }else if(res.code === 4){
                 this.$message({
                  type: 'warning',
                  message: '该产品编号已存在，创建失败'
                })
              }
               else {
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
    reback() {
      this.$router.push('allproducts')
    },
    //获取所有产品分类列表
    getAllCategory() {
      apiGetAllSaleCategory({}).then(res => {
        this.allSaleCategory = res
      })
    }
  },
  mounted() {
    this.getAllCategory()
  }
}
</script>
<style lang="less" scoped>
.product_add {
  padding: 30px;
  .add_form {
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
