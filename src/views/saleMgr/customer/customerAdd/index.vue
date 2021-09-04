<template>
  <div class="customer_add">
    <div class="tit">
      <span>基本信息</span>
    </div>
    <div class="add_form">
      <el-form :model="customerForm" :rules="rules" ref="customerForm" label-width="100px" class="demo-customerForm">
        <el-form-item label="客户编号" prop="customerCode">
          <el-input v-model="customerForm.customerCode"></el-input>
        </el-form-item>
        <el-form-item label="客户名称" prop="name">
          <el-input v-model="customerForm.name"></el-input>
        </el-form-item>
        <el-form-item label="客户密码" prop="passWord">
          <el-input v-model="customerForm.passWord" type="password"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contactor">
          <el-input v-model="customerForm.contactor"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="customerForm.address"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" prop="postCode">
          <el-input v-model="customerForm.postCode"></el-input>
        </el-form-item>
        <el-form-item label="注册日期" prop="createDate">
          <el-input v-model="customerForm.createDate" disabled></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="customerForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="传真" prop="fax">
          <el-input v-model="customerForm.fax"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createCustomer('customerForm')" plain>立即创建</el-button>
          <el-button type="normal" @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { apiCustomerAdd } from '@/request/api'
import jutils from 'jutils-src'

export default {
  data() {
    return {
      customerForm: {
        customerCode: '',
        name: '',
        passWord: '',
        contactor: '',
        address: '',
        postCode: '',
        createDate: jutils.formatDate(new Date(), 'YYYY-MM-DD'),
        tel: '',
        fax: ''
      },
      rules: {
        customerCode: [{ required: true, message: '请输入客户编号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入客户名字', trigger: 'blur' }],
        passWord: [
          { required: true, message: '请输入客户密码', trigger: 'blur' },
          { max: 100, message: '长度不能超过100', trigger: 'blur' }
        ],
        contactor: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        createDate: [{ required: true, message: '请输入注册日期', trigger: 'blur' }],
        tel: [{ required: true, message: '请输入电话', trigger: 'blur' }]
      }
    }
  },
  methods: {
    //创建客户
    createCustomer(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          apiCustomerAdd({
            customerCode: this.customerForm.customerCode,
            name: this.customerForm.name,
            passWord: this.customerForm.passWord,
            contactor: this.customerForm.contactor,
            address: this.customerForm.address,
            postCode: this.customerForm.postCode,
            createDate: this.customerForm.createDate,
            tel: this.customerForm.tel,
            fax: this.customerForm.fax
          }).then(res => {
            if (res.code === 2) {
              this.$message({
                type: 'success',
                message: res.message
              })
              this.$router.push('customer')
            } else if (res.code === 4) {
              this.$message({
                type: 'warning',
                message: '该客户编号已存在，创建失败'
              })
            } else {
              this.$message({
                type: 'warning',
                message: res.message
              })
            }
          })
        } else {
          return false
        }
      })
    },
    cancel() {
      this.$router.push('customer')
    }
  }
}
</script>
<style lang="less" scoped>
.customer_add {
  padding-left: 20px;
  .tit {
    border-bottom: 2px solid #ccc;
    padding-bottom: 6px;
    span {
      border-bottom: 2px solid #66c9f3;
      padding-bottom: 5px;
    }
  }
  .add_form {
    width: 800px;
    margin-top: 40px;
  }
}
</style>
