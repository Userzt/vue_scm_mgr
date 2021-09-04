<template>
  <div class="customer_warpper">
    <div class="customer_mgr" v-show="!isUpdate">
      <div class="add_customer">
        <el-button type="primary" icon="el-icon-plus" @click="customerAdd">添加</el-button>
      </div>
      <div class="all_customer">
        <el-table :data="customerList" border style="width: 100%">
          <el-table-column type="index" label="序号" width="100"> </el-table-column>
          <el-table-column prop="customerCode" label="客户编号" width="150"> </el-table-column>
          <el-table-column prop="name" label="客户名称" width="150"> </el-table-column>
          <el-table-column prop="contactor" label="联系人" width="120"></el-table-column>
          <el-table-column prop="address" label="地址" width="200"> </el-table-column>
          <el-table-column prop="postCode" label="邮政编码" width="100"> </el-table-column>
          <el-table-column prop="createDate" label="注册日期" width="100"> </el-table-column>
          <el-table-column prop="tel" label="电话" width="120"> </el-table-column>
          <el-table-column prop="fax" label="传真" width="120"> </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="upadateCustomer(scope.row)" type="text" size="small">修改</el-button>
              <el-button type="text" size="small" @click="delCustomer(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页栏 -->
      <div class="pagination">
        <el-pagination @current-change="handleCurrentPageChange" background layout="prev, pager, next" :total="totalCustomer"> </el-pagination>
      </div>
    </div>

    <!-- 修改客户信息 -->
    <div class="customer_update" v-show="isUpdate">
      <div class="tit">
        <span>基本信息</span>
      </div>
      <div class="update_form">
        <el-form :model="customerForm" :rules="rules" ref="customerForm" label-width="100px" class="demo-customerForm">
          <el-form-item label="客户编号" prop="customerCode">
            <el-input v-model="customerForm.customerCode" disabled></el-input>
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
            <el-button type="primary" @click="modify('customerForm')" plain>立即修改</el-button>
            <el-button type="normal" @click="reback">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetCustomer, apiCustomerUpdate, apiCustomerDel } from '@/request/api'

export default {
  data() {
    return {
      customerList: [],
      isUpdate: false,
      totalCustomer: 1,
      currentPage: 1,

      customerForm: {
        customerCode: '',
        name: '',
        passWord: '',
        contactor: '',
        address: '',
        postCode: '',
        createDate: '',
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
    //添加客户
    customerAdd() {
      this.$router.push('customerAdd')
    },
    //获取客户列表数据
    getCustomerList() {
      apiGetCustomer({
        page: this.currentPage
      }).then(res => {
        this.totalCustomer = res.total
        this.customerList = res.list
      })
    },
    //页数改变
    handleCurrentPageChange(page) {
      this.currentPage = page
      this.getCustomerList()
    },
    //编辑客户信息
    upadateCustomer(row) {
      this.isUpdate = true
      this.customerForm.customerCode = row.customerCode
      this.customerForm.name = row.name
      this.customerForm.passWord = row.passWord
      this.customerForm.contactor = row.contactor
      this.customerForm.address = row.address
      this.customerForm.postCode = row.postCode
      this.customerForm.createDate = row.createDate
      this.customerForm.tel = row.tel
      this.customerForm.fax = row.fax
    },
    //删除客户
    delCustomer(row) {
      console.log(row.customerCode)
      this.$confirm('此操作将删除该客户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          apiCustomerDel({
            customerCode: row.customerCode
          }).then(res => {
            if (res.code === 2) {
              this.$message({
                type: 'success',
                message: res.message
              })
              this.getCustomerList()
            } else if (res.code === 4) {
              this.$message({
                type: 'warning',
                message: '该客户有相关的依赖存在，无法删除'
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
    modify(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          apiCustomerUpdate({
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
              this.isUpdate = false
              this.getCustomerList()
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
    //修改客户信息返回
    reback() {
      this.isUpdate = false
    }
  },
  mounted() {
    this.getCustomerList()
  }
}
</script>
<style lang="less" scoped>
.customer_mgr {
  padding-left: 20px;
  .add_customer {
    margin-bottom: 40px;
  }
  .all_customer {
    width: 1281px;
  }
}

//修改客户
.customer_update {
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
