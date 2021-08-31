<template>
  <div class="user_add">
    <div class="tit">
      <span>基本信息</span>
    </div>
    <div class="add_form">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户账号" prop="account">
          <el-input v-model="ruleForm.account"></el-input>
        </el-form-item>
        <el-form-item label="用户名字" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="passWord">
          <el-input v-model="ruleForm.passWord" type="password"></el-input>
        </el-form-item>
        <el-form-item label="添加日期" prop="createDate">
          <el-input v-model="ruleForm.createDate" disabled></el-input>
        </el-form-item>
        <el-form-item label="锁定状态" prop="status">
          <el-radio-group v-model="ruleForm.status">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="权限" prop="modelcodes">
          <el-checkbox-group v-model="ruleForm.modelcodes">
            <el-checkbox label="采购管理" name="modelcodes"></el-checkbox>
            <el-checkbox label="销售管理" name="modelcodes"></el-checkbox>
            <el-checkbox label="系统管理" name="modelcodes"></el-checkbox>
            <el-checkbox label="财务管理" name="modelcodes"></el-checkbox>
            <el-checkbox label="仓库管理" name="modelcodes"></el-checkbox>
            <el-checkbox label="业务管理" name="modelcodes"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="reback">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// JavaScript常用函数库
import jutils from 'jutils-src'
export default {
  data() {
    return {
      ruleForm: {
        account: '',
        name: '',
        passWord: '',
        createDate: jutils.formatDate(new Date(), 'YYYY-MM-DD HH:ii:ss'),
        modelcodes: [],
        status: ''
      },
      rules: {
        account: [{ required: true, message: '请输入用户账号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入用户名字', trigger: 'blur' }],
        passWord: [{ required: true, message: '请输入用户密码', trigger: 'blur' }],
        status: [{ required: true, trigger: 'blur' }],
        modelcodes: [{ type: 'array', required: true, message: '请至少选择一种权限', trigger: 'change' }],
        resource: [{ required: true, message: '请选择活动资源', trigger: 'change' }]
      }
    }
  },
  methods: {
    //创建用户
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios({
            url: `/main/system/user/add?account=${this.ruleForm.account}&name=${this.ruleForm.name}&passWord=${this.ruleForm.passWord}&createDate=${
              this.ruleForm.createDate
            }&status=${this.ruleForm.status === '否' ? 0 : 1}&modelcodes=${this.getModelcodes(this.ruleForm.modelcodes)}`,
            method: 'post',
            headers: { token: sessionStorage.getItem('token') },
            baseURL: 'http://127.0.0.1:9000'
          }).then(res => {
            if (res.data.code === 2) {
              this.$message({
                type: 'success',
                message: res.data.message
              })
              this.$router.push('userManager')
            } else {
              this.$message({
                type: 'error',
                message: '添加失败'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    //取消创建
    reback() {
      this.$router.push('userManager')
    },
    //格式化用户权限
    getModelcodes(modelsName) {
      let modelcodesArr = []
      for (let item of modelsName) {
        if (item === '采购管理') {
          modelcodesArr.push(1)
        } else if (item === '销售管理') {
          modelcodesArr.push(2)
        } else if (item === '系统管理') {
          modelcodesArr.push(3)
        } else if (item === '财务管理') {
          modelcodesArr.push(4)
        } else if (item === '仓库管理') {
          modelcodesArr.push(5)
        } else if (item === '业务管理') {
          modelcodesArr.push(6)
        }
      }
      return modelcodesArr
    }
  }
}
</script>
<style lang="less" scoped>
.user_add {
  padding: 30px;
  .add_form {
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
  .add_form {
    width: 800px;
  }
}
</style>
