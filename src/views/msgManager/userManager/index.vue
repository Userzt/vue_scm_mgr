<template>
  <div class="user_warpper">
    <div class="user_mgr" v-show="!isUpdate">
      <div class="add_user">
        <el-button type="primary" icon="el-icon-plus" @click="userAdd">添加</el-button>
      </div>
      <div class="all_user">
        <el-table :data="userList" border style="width: 100%">
          <el-table-column type="index" label="序号" width="150"> </el-table-column>
          <el-table-column prop="account" label="用户账户" width="120"> </el-table-column>
          <el-table-column prop="name" label="用户姓名" width="120"> </el-table-column>
          <el-table-column prop="status" label="锁定状态" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0">未锁定</span>
              <span v-else-if="scope.row.status == 1">已锁定</span>
            </template>
          </el-table-column>
          <el-table-column prop="createDate" label="添加日期" width="200"> </el-table-column>
          <el-table-column label="用户权限" width="350">
            <template slot-scope="scope">
              <span :key="index" v-for="(item, index) in scope.row.models" v-text="item.modelName + ' ; '"></span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="upadateUser(scope.row)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small" @click="delUser(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页栏 -->
      <div class="pagination">
        <el-pagination @current-change="handleCurrentPageChange" background layout="prev, pager, next" :total="totalUser"> </el-pagination>
      </div>
    </div>

    <!-- 修改用户信息 -->
    <div class="user_update" v-show="isUpdate">
      <div class="tit">
        <span>基本信息</span>
      </div>
      <div class="update_form">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户账号" prop="account">
            <el-input v-model="ruleForm.account" disabled></el-input>
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
            <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
            <el-button @click="reback">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetUserList, apiDeleteUser } from '@/request/api'
import axios from 'axios' // 引入axios

export default {
  data() {
    return {
      userList: [],
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
        modelcodes: [{ type: 'array', required: true, message: '请至少选择一种权限', trigger: 'change' }]
      }
    }
  },
  methods: {
    //添加用户
    userAdd() {
      this.$router.push('userAdd')
    },
    //获取用户列表数据
    getUserList() {
      apiGetUserList({
        page: this.currentPage
      }).then(res => {
        this.totalUser = res.total
        this.userList = res.list
      })
    },
    //页数改变
    handleCurrentPageChange(page) {
      this.currentPage = page
      this.getUserList()
    },
    //编辑用户信息
    upadateUser(row) {
      this.isUpdate = true
      this.ruleForm.account = row.account
      this.ruleForm.name = row.name
      this.ruleForm.passWord = row.passWord
      this.ruleForm.createDate = row.createDate
      this.ruleForm.status = row.status === 0 ? '否' : '是'
    },
    //删除用户
    delUser(row) {
      console.log(row.account)
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          apiDeleteUser({
            account: row.account
          }).then(res => {
            if (res.code === 2 && row.status === 0) {
              this.$message({
                type: 'success',
                message: res.message
              })
              this.getUserList()
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
.user_mgr {
  padding-left: 20px;
  .add_user {
    margin-bottom: 40px;
  }
  .all_user {
    width: 1211px;
  }
  .pagination {
    margin-top: 30px;
  }
}

//修改用户
.user_update {
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
