<template>
  <div class="supplier_add">
    <div class="tit">
      <span>基本信息</span>
    </div>
    <div class="update_form">
      <el-form :model="supplierForm" :rules="rules" ref="supplierForm" label-width="100px" class="demo-supplierForm">
        <el-form-item label="供应商编号" prop="venderCode">
          <el-input v-model="supplierForm.venderCode"></el-input>
        </el-form-item>
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="supplierForm.name"></el-input>
        </el-form-item>
        <el-form-item label="供应商密码" prop="passWord">
          <el-input v-model="supplierForm.passWord" type="password"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contactor">
          <el-input v-model="supplierForm.contactor"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="supplierForm.address"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" prop="postCode">
          <el-input v-model="supplierForm.postCode"></el-input>
        </el-form-item>
        <el-form-item label="注册日期" prop="createDate">
          <el-input v-model="supplierForm.createDate" disabled></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="supplierForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="传真" prop="fax">
          <el-input v-model="supplierForm.fax"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('supplierForm')">立即创建</el-button>
          <el-button @click="reback">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { apiAddSupplier } from '@/request/api'
import jutils from 'jutils-src'

export default {
  data() {
    return {
      supplierForm: {
        venderCode: '',
        name: '',
        passWord: '',
        contactor: '',
        address: '',
        postCode: '',
        createDate: jutils.formatDate(new Date(), 'YYYY-MM-DD HH:ii:ss'),
        tel: '',
        fax: ''
      },
      rules: {
        venderCode: [{ required: true, message: '请输入供应商编号', trigger: 'blur' }],
        name: [
          { required: true, message: '请输入供应商名称', trigger: 'blur' },
          { max: 100, message: '长度不能超过100', trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '请输入供应商密码', trigger: 'blur' },
          { min: 4, max: 20, message: '4-20位字符', trigger: 'blur' }
        ],
        contactor: [{ required: true, message: '请输入该供应商联系人', trigger: 'blur' }],
        tel: [{ required: true, message: '请输入电话', trigger: 'blur' }]
      }
    }
  },
  methods: {
    //创建供应商
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          apiAddSupplier({
            venderCode: this.supplierForm.venderCode,
            name: this.supplierForm.name,
            passWord: this.supplierForm.passWord,
            contactor: this.supplierForm.contactor,
            address: this.supplierForm.address,
            postCode: this.supplierForm.postCode,
            createDate: this.supplierForm.createDate,
            tel: this.supplierForm.tel,
            fax: this.supplierForm.fax
          })
            .then(res => {
              console.log(res)
              if (res.code === 2) {
                this.$message({
                  type: 'success',
                  message: res.message
                })
                this.$router.push('supplier')
              } else if (res.code === 4) {
                this.$message({
                  type: 'warning',
                  message: '该供应商编号已存在，添加失败'
                })
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
    //取消
    reback() {
      this.$router.push('supplier')
    }
  }
}
</script>
<style lang="less" scoped>
.supplier_add {
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
