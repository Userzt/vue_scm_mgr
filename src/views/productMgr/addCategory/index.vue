<template>
  <div class="sale_add">
    <div class="tit">
      <span>基本信息</span>
    </div>
    <div class="add_form">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input v-model="ruleForm.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确认添加</el-button>
          <el-button @click="reback">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { apiAddSaleCategory } from '@/request/api'

export default {
  data() {
    return {
      ruleForm: {
        name: '',
        remark: ''
      },
      rules: {
        name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    //添加产品分类
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          apiAddSaleCategory({
            name: this.ruleForm.name,
            remark: this.ruleForm.remark
          })
            .then(res => {
              if (res.code === 2) {
                this.$message({
                  type: 'success',
                  message: res.message
                })
                this.$router.push('saleCategory')
              } else {
                this.$message({
                  type: 'error',
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
    //取消添加
    reback() {
      this.$router.push('saleCategory')
    }
  }
}
</script>
<style lang="less" scoped>
.sale_add {
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
