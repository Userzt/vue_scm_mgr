<template>
  <div class="supplier_warpper">
    <div class="supplier_mgr" v-show="!isUpdate">
      <div class="add_supplier">
        <el-button type="primary" icon="el-icon-plus" @click="supplierAdd">添加</el-button>
      </div>
      <!-- 查询区 -->
      <div class="search_supplier">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="供应商编号">
            <el-input v-model="searchForm.venderCode"></el-input>
          </el-form-item>
          <el-form-item label="供应商名称">
            <el-input v-model="searchForm.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 供应商展示区 -->
      <div class="all_supplier">
        <el-table :data="supplierList" border style="width: 100%">
          <el-table-column type="index" label="序号" width="100"> </el-table-column>
          <el-table-column prop="venderCode" label="供应商编号" width="150"> </el-table-column>
          <el-table-column prop="name" label="供应商名称" width="150"> </el-table-column>
          <el-table-column prop="contactor" label="联系人" width="100"></el-table-column>
          <el-table-column prop="address" label="地址" width="150"></el-table-column>
          <el-table-column prop="postCode" label="邮政编码" width="100"></el-table-column>
          <el-table-column prop="createDate" label="注册日期" width="200"></el-table-column>
          <el-table-column prop="tel" label="电话" width="150"></el-table-column>
          <el-table-column prop="fax" label="传真" width="150"></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="upadateSupplier(scope.row)" type="text" size="small">修改</el-button>
              <el-button type="text" size="small" @click="delSupplier(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页栏 -->
      <div class="pagination">
        <el-pagination @current-change="handleCurrentPageChange" background layout="prev, pager, next" :total="totalSupplier"> </el-pagination>
      </div>
    </div>

    <!-- 修改供应商 -->
    <div class="supplier_update" v-show="isUpdate">
      <div class="tit">
        <span>基本信息</span>
      </div>
      <div class="update_form">
        <el-form :model="supplierForm" :rules="rules" ref="supplierForm" label-width="100px" class="demo-supplierForm">
          <el-form-item label="供应商编号" prop="venderCode">
            <el-input v-model="supplierForm.venderCode" disabled></el-input>
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
            <el-button type="primary" @click="submitForm('supplierForm')">修改</el-button>
            <el-button @click="reback">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetSupplier, apiUpdateSupplier, apiDelSupplier } from '@/request/api'
import jutils from 'jutils-src'

export default {
  data() {
    return {
      supplierList: [],
      totalSupplier: 1,
      isUpdate: false,
      currentPage: 1,

      //供应商表单
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
      },
      //查询表单
      searchForm: {
        venderCode: '',
        name: ''
      }
    }
  },
  methods: {
    //添加供应商
    supplierAdd() {
      this.$router.push('addsupplier')
    },
    //查询供应商
    onSearch() {
      this.getSupplierList(this.currentPage, this.searchForm.venderCode, this.searchForm.name)
    },
    //获取供应商数据
    getSupplierList(page = 1, venderCode = '', name = '') {
      apiGetSupplier({
        page,
        venderCode,
        name
      }).then(res => {
        this.supplierList = res.list
        this.totalSupplier = res.total
      })
    },
    //页数改变
    handleCurrentPageChange(page) {
      this.currentPage = page
      this.getSupplierList(this.currentPage)
    },
    //编辑供应商信息
    upadateSupplier(row) {
      this.isUpdate = true
      this.supplierForm.venderCode = row.venderCode
      this.supplierForm.name = row.name
      this.supplierForm.passWord = row.passWord
      this.supplierForm.contactor = row.contactor
      this.supplierForm.address = row.address
      this.supplierForm.postCode = row.postCode
      this.supplierForm.createDate = row.createDate
      this.supplierForm.tel = row.tel
      this.supplierForm.fax = row.fax
    },
    //删除供应商
    delSupplier(row) {
      this.$confirm('此操作将删除该供应商, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          apiDelSupplier({
            venderCode: row.venderCode,
          }).then(res => {
            if (res.code === 2) {
              this.$message({
                type: 'success',
                message: res.message
              })
              this.supplierList = res.data
              this.getSupplierList(this.currentPage)
            } else if (res.code === 4) {
              this.$message({
                type: 'warning',
                message: '该供应商存在相关依赖关系，无法删除！'
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
          apiUpdateSupplier({
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
              if (res.code === 2) {
                this.$message({
                  type: 'success',
                  message: res.message
                })
                this.isUpdate = false
                this.getSupplierList(this.currentPage)
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
    //修改供应商信息返回
    reback() {
      this.isUpdate = false
    }
  },
  mounted() {
    this.getSupplierList(this.currentPage)
  }
}
</script>
<style lang="less" scoped>
.supplier_mgr {
  padding-left: 20px;
  .add_supplier {
    margin-bottom: 25px;
  }
  .all_supplier {
    width: 1401px;
  }
}

//修改供应商
.supplier_update {
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
