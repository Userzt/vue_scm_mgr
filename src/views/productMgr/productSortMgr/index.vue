<template>
  <div class="sale_sort_warpper">
    <div class="sale_mar" v-show="!isUpdate">
      <div class="add_sale">
        <el-button type="primary" icon="el-icon-plus" @click="saleAdd">添加</el-button>
      </div>
      <div class="all_sale">
        <el-table :data="saleList" border style="width: 100%">
          <el-table-column type="index" label="序号" width="150"> </el-table-column>
          <el-table-column prop="account" label="分类序列号" width="120"> </el-table-column>
          <el-table-column prop="name" label="产品类别名称" width="120"> </el-table-column>
          <el-table-column prop="status" label="描述" width="120"></el-table-column>
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
        <el-pagination @current-change="handleCurrentPageChange" background layout="prev, pager, next" :total="totalUser"> </el-pagination>
      </div>
    </div>

    <!-- 修改产品分类 -->
    <div class="sale_update" v-show="isUpdate">
      <div class="tit">
        <span>基本信息</span>
      </div>
      <div class="update_form">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="分类序列号" prop="account">
            <el-input v-model="ruleForm.account" disabled></el-input>
          </el-form-item>
          <el-form-item label="分类名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
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
import { apiGetSaleCategory, apiDeleteUser } from '@/request/api'
import axios from 'axios' // 引入axios

export default {
  data() {
    return {
      saleList: [],
      isUpdate: false,
      totalUser: 1,
      currentPage: 1,
      ruleForm: {
        account: '',
        name: '',
        passWord: '',
        createDate: '',
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
    //添加用户
    saleAdd() {
      this.$router.push('saleAdd')
    },
    //获取用户列表数据
    getUserList() {
      apiGetUserList({
        page: this.currentPage
      }).then(res => {
        this.totalUser = res.total
        this.saleList = res.list
      })
    },
    //页数改变
    handleCurrentPageChange(page) {
      this.currentPage = page
      this.getUserList()
    },
    //编辑用户信息
    upadateSale(row) {
      this.isUpdate = true
      this.ruleForm.account = row.account
      this.ruleForm.name = row.name
      this.ruleForm.passWord = row.passWord
      this.ruleForm.createDate = row.createDate
      this.ruleForm.status = row.status === 0 ? '否' : '是'
    },
    //删除用户
    delSale(row) {
      console.log(row.account)
      apiDeleteUser({
        account: row.account
      })
        .then(res => {
          if (res.code === 2 && row.status === 0) {
            this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: res.message
              })
              this.getUserList()
            })
          } else if (row.status === 1) {
            this.$message({
              type: 'error',
              message: '用户已被锁定，无法删除！'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    //提交修改
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios({
            url: `/main/system/user/update?account=${this.ruleForm.account}&name=${this.ruleForm.name}&passWord=${
              this.ruleForm.passWord
            }&createDate=${this.ruleForm.createDate}&status=${this.ruleForm.status === '否' ? 0 : 1}&modelcodes=${this.getModelcodes(
              this.ruleForm.modelcodes
            )}`,
            method: 'post',
            headers: { token: sessionStorage.getItem('token') },
            baseURL: 'http://127.0.0.1:9000'
          }).then(res => {
            if (res.data.code === 2) {
              this.$message({
                type: 'success',
                message: res.data.message
              })
              this.isUpdate = false
              this.getUserList()
              this.ruleForm.modelcodes = []
            }
          })
        } else {
          return false
        }
      })
    },
    //修改用户信息返回
    reback() {
      this.isUpdate = false
      this.ruleForm.modelcodes = []
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
  },
  mounted() {
    this.getUserList()
  }
}
</script>
<style lang="less" scoped>
.sale_mar {
  padding-left: 20px;
  .add_sale {
    margin-bottom: 40px;
  }
  .all_sale {
    width: 1211px;
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
