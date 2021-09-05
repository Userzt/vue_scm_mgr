<template>
  <div class="salelist_warpper">
    <div class="salelist_mgr" v-show="!isUpdate && !isCheck">
      <div class="add_salelist">
        <el-button type="primary" icon="el-icon-plus" @click="salelistAdd">添加</el-button>
      </div>
      <!-- 销售单展示区 -->
      <div class="all_salelist">
        <el-table :data="saleList" border style="width: 1471px">
          <el-table-column type="index" label="序号" width="80"> </el-table-column>
          <el-table-column prop="soId" label="销售单编号" width="120"> </el-table-column>
          <el-table-column prop="customerCode" label="客户编号" width="100"> </el-table-column>
          <el-table-column prop="account" label="创建用户" width="100"> </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
          <el-table-column prop="tipFee" label="附加费用" width="100"></el-table-column>
          <el-table-column prop="productTotal" label="产品总价" width="100"></el-table-column>
          <el-table-column prop="soTotal" label="销售单总价" width="100"></el-table-column>
          <el-table-column prop="payType" label="付款方式" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.payType == 1">货到付款</span>
              <span v-else-if="scope.row.payType == 2">款到发货</span>
              <span v-else-if="scope.row.payType == 3">预付款到发货</span>
            </template>
          </el-table-column>
          <el-table-column prop="prePayFee" label="最低预付金额" width="120"></el-table-column>
          <el-table-column prop="status" label="销售单状态" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1">新增</span>
              <span v-else-if="scope.row.status == 2">已发货</span>
              <span v-else-if="scope.row.status == 3">已收款</span>
              <span v-else-if="scope.row.status == 4">已了结</span>
              <span v-else-if="scope.row.status == 5">已预付</span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" width="120"></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="upadateSalelist(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="checkDetailList(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small" @click="delSalelist(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页栏 -->
      <div class="pagination">
        <el-pagination @current-change="handleCurrentPageChange" background layout="prev, pager, next" :total="totalSalelist"> </el-pagination>
      </div>
    </div>

    <!-- 修改销售单 -->
    <div class="salelist_update" v-show="isUpdate && !isCheck">
      <div class="tit">
        <span>基本信息</span>
      </div>
      <div class="update_form">
        <el-form :inline="true" :model="salelistForm" :rules="rules" ref="salelistForm" label-width="100px" class="demo-salelistForm">
          <el-form-item label="销售单编号" prop="soId">
            <el-input v-model="salelistForm.soId" disabled></el-input>
          </el-form-item>
          <el-form-item label="客户" prop="customerCode">
            <el-select v-model="salelistForm.customerCode">
              <el-option v-for="item in customerList" :key="item.customerCode" :label="item.name" :value="item.customerCode"
                >{{ item.customerCode }} - {{ item.name }}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="付款方式" prop="payType">
            <el-select v-model="salelistForm.payType" style="width:214px;">
              <el-option label="货到付款" value="货到付款"></el-option>
              <el-option label="款到发货" value="款到发货"></el-option>
              <el-option label="预付款到发货" value="预付款到发货"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建用户" prop="account">
            <el-input v-model="salelistForm.account" disabled></el-input>
          </el-form-item>
          <el-form-item label="创建时间" prop="createTime">
            <el-input v-model="salelistForm.createTime" disabled></el-input>
          </el-form-item>
          <el-form-item label="附加费用" prop="tipFee">
            <el-input v-model="salelistForm.tipFee" @input="handleTipFeeChange()"></el-input>
          </el-form-item>
          <el-form-item label="产品总价" prop="productTotal">
            <el-input v-model="salelistForm.productTotal" readonly></el-input>
          </el-form-item>
          <el-form-item label="销售单总价" prop="soTotal">
            <el-input v-model="salelistForm.soTotal" readonly></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="salelistForm.remark"></el-input>
          </el-form-item>
          <el-form-item label="最低预付款" prop="prePayFee">
            <el-input v-model="salelistForm.prePayFee"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <!-- 销售单明细表格 -->
      <div class="goods_table" style="width:1251px">
        <el-table :data="salelistForm.soitems" border style="width: 100%">
          <el-table-column type="index" label="序号" width="100"> </el-table-column>
          <el-table-column label="产品名称" width="250">
            <template slot-scope="scope">
              <el-select v-model="scope.row.productCode" @change="handleProductChange(scope.row.productCode)">
                <el-option v-for="item in productAll" :key="item.productCode" :label="item.name" :value="item.productCode"> </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="销售单价" width="200">
            <template slot-scope="scope">
              <el-input v-model="scope.row.unitPrice" @input="handleNumAndPriceChange(scope.row)" readonly></el-input>
            </template>
          </el-table-column>
          <el-table-column label="产品数量" width="200">
            <template slot-scope="scope">
              <el-input v-model="scope.row.num" @input="handleNumAndPriceChange(scope.row)"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="数量单位" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.unitName" readonly></el-input>
            </template>
          </el-table-column>
          <el-table-column label="明细总价" width="200">
            <template slot-scope="scope">
              <el-input v-model="scope.row.itemPrice" readonly></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="handleDeleteRow(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="add_table_row">
        <el-button size="mini" type="text" @click="tableItemRowAdd">添加明细</el-button>
      </div>
      <el-button type="primary" @click="submitForm('salelistForm')">修改</el-button>
      <el-button @click="reback">返回</el-button>
    </div>

    <!-- 查看明细单 -->
    <div class="detail_list" v-show="isCheck">
      <el-table :data="salelistForm.soitems" border style="width: 851px">
        <el-table-column type="index" label="序号" width="100"> </el-table-column>
        <el-table-column prop="productCode" label="产品编号" width="150"> </el-table-column>
        <el-table-column prop="productName" label="产品名称" width="150"> </el-table-column>
        <el-table-column prop="num" label="产品数量" width="100"></el-table-column>
        <el-table-column prop="unitName" label="数量单位" width="100"></el-table-column>
        <el-table-column prop="unitPrice" label="销售单价" width="100"></el-table-column>
        <el-table-column prop="itemPrice" label="销售明细总价" width="150"></el-table-column>
      </el-table>
      <div class="reback">
        <el-button type="primary" @click="rebackFormDetailList">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetAllProduct, apiGetProduct, apiDelPomain, apiGetSomainShow, apiGetCustomer, apiGetSomainQueryItem } from '@/request/api'
import jutils from 'jutils-src'
import axios from 'axios'

export default {
  data() {
    return {
      saleList: [],
      totalSalelist: 1,
      isUpdate: false,
      isCheck: false,
      currentPage: 1,
      productCode: '',
      //所有客户
      customerList: [],
      //所有产品名称以及编号
      productAll: [],

      //销售单表单
      salelistForm: {
        soId: '',
        account: '',
        tipFee: '',
        payType: '',
        customerCode: '',
        soTotal: '',
        productTotal: '',
        remark: '',
        status: '',
        prePayFee: 0,
        createTime: jutils.formatDate(new Date(), 'YYYY-MM-DD HH:ii:ss'),
        //指定销售单明细
        soitems: []
      },
      rules: {
        soId: [{ required: true, message: '请输入销售单编号', trigger: 'blur' }],
        customerCode: [{ required: true, message: '请选择客户', trigger: 'blur' }],
        tipFee: [
          { required: true, message: '请输入销售单密码', trigger: 'blur' },
          { pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/, message: '请输入格式正确的价格', trigger: 'blur' }
        ],
        soTotal: [{ required: true, message: '请输入采购总价', trigger: 'blur' }],
        productTotal: [{ required: true, message: '请输入产品总价', trigger: 'blur' }],
        payType: [{ required: true, message: '请选择付款方式', trigger: 'blur' }],
        prePayFee: [
          { required: true, message: '请输入最低预付款', trigger: 'blur' },
          { pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/, message: '请输入格式正确的价格', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //附加费用改变时计算采购总价
    handleTipFeeChange() {
      this.salelistForm.soTotal = Number(this.salelistForm.tipFee) + Number(this.salelistForm.productTotal)
    },
    //添加销售单
    salelistAdd() {
      this.$router.push('salelistAdd')
    },
    //获取所有产品名称以及编号
    getProductAll() {
      apiGetAllProduct({}).then(res => {
        this.productAll = res
      })
    },
    //获取所有客户列表
    getCustomerAll() {
      apiGetCustomer({}).then(res => {
        this.customerList = res.list
      })
    },
    //明细中选择产品名称时，自动获取数量单位及销售单价
    handleProductChange(code) {
      let unitName
      let unitPrice
      apiGetProduct({
        productCode: code
      }).then(res => {
        unitName = res.list[0].unitName
        unitPrice = res.list[0].price
        this.salelistForm.soitems.map(item => {
          if (item.productCode === code) {
            item.unitName = unitName
            item.unitPrice = unitPrice
          }
        })
      })
    },
    //获取新增的销售单数据
    getSomainList() {
      apiGetSomainShow({
        type: 1,
        page: this.currentPage
      }).then(res => {
        this.saleList = res.list
        this.totalSalelist = res.total
      })
    },
    //获取指定销售单的明细
    getSomainQueryItem(soId) {
      apiGetSomainQueryItem({
        soId
      }).then(res => {
        console.log(res)
        this.salelistForm.soitems = res
      })
    },
    //页数改变
    handleCurrentPageChange(page) {
      this.currentPage = page
      this.getSomainList(this.currentPage)
    },
    //计算采购以及产品总价
    calPoTotal() {
      let count = 0
      for (let item of this.salelistForm.soitems) {
        count += item.num * item.unitPrice
      }
      this.salelistForm.soTotal = count + Number(this.salelistForm.tipFee)
      this.salelistForm.productTotal = count
    },
    //明细中产品数量以及产品单价改变时
    handleNumAndPriceChange(row) {
      row.itemPrice = row.unitPrice && row.unitPrice * row.num
      this.calPoTotal()
    },

    //添加明细
    tableItemRowAdd() {
      this.salelistForm.soitems.push({
        soId: this.salelistForm.soId,
        productCode: '',
        productName: '',
        unitPrice: '',
        num: '',
        unitName: '',
        itemPrice: ''
      })
    },
    //删除明细行
    handleDeleteRow(index) {
      this.salelistForm.soitems.splice(index, 1)
    },
    //修改销售单信息
    upadateSalelist(row) {
      this.getSomainQueryItem(row.soId)
      this.isUpdate = true
      this.salelistForm.soId = row.soId
      this.salelistForm.account = row.account
      this.salelistForm.tipFee = row.tipFee
      this.salelistForm.productTotal = row.productTotal
      this.salelistForm.soTotal = row.soTotal
      this.salelistForm.prePayFee = row.prePayFee
      this.salelistForm.createTime = row.createTime
      this.salelistForm.remark = row.remark
      this.salelistForm.customerCode = row.customerCode
      this.salelistForm.payType = this.formatPayTypeToText(row.payType)
    },
    //格式化付款方式payType
    formatPayTypeToText(value) {
      if (value === 1) {
        return '货到付款'
      } else if (value === 2) {
        return '款到发货'
      } else if (value === 3) {
        return '预付款到发货'
      }
    },
    formatPayTypeToNum(value) {
      if (value === '货到付款') {
        return 1
      } else if (value === '款到发货') {
        return 2
      } else if (value === '预付款到发货') {
        return 3
      }
    },
    //查看明细单
    checkDetailList(row) {
      this.isCheck = true
      this.getSomainQueryItem(row.soId)
    },
    //明细单中返回
    rebackFormDetailList() {
      this.isCheck = false
    },

    //删除销售单
    delSalelist(row) {
      this.$confirm('此操作将删除该销售单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          apiDelPomain({
            soId: row.soId,
            page: this.currentPage
          }).then(res => {
            if (res.code === 2) {
              this.$message({
                type: 'success',
                message: res.message
              })
              this.saleList = res.data.list
              this.getSomainList(this.currentPage)
            } else if (res.code === 4) {
              this.$message({
                type: 'warning',
                message: '该销售单存在相关依赖关系，无法删除！'
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
          //以json形式提交请求参数
          axios({
            url: '/main/sell/somain/update',
            method: 'post',
            data: {
              soId: this.salelistForm.soId,
              customerCode: this.salelistForm.customerCode,
              account: this.salelistForm.account,
              createTime: this.salelistForm.createTime,
              tipFee: this.salelistForm.tipFee,
              productTotal: this.salelistForm.productTotal,
              soTotal: this.salelistForm.soTotal,
              payType: this.formatPayTypeToNum(this.salelistForm.payType),
              prePayFee: this.salelistForm.prePayFee,
              status: 1,
              remark: this.salelistForm.remark,
              soitems: this.salelistForm.soitems
            },
            headers: { 'Content-Type': 'application/json', token: sessionStorage.getItem('token') },
            baseURL: 'http://127.0.0.1:9000'
          })
            .then(res => {
              if (res.data.code === 2) {
                this.$message({
                  type: 'success',
                  message: res.data.message
                })
                this.isUpdate = false
                this.getSomainList(this.currentPage)
              } else if (res.data.code === 3) {
                this.$message({
                  type: 'warning',
                  message: '只有预付款到发货才需要预付款'
                })
              } else {
                this.$message({
                  type: 'warning',
                  message: res.data.message
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
    //修改销售单信息返回
    reback() {
      this.isUpdate = false
    }
  },
  mounted() {
    this.getCustomerAll()
    this.getSomainList(this.currentPage)
    this.getProductAll()
  }
}
</script>
<style lang="less" scoped>
.salelist_mgr {
  padding-left: 20px;
  .add_salelist {
    margin-bottom: 25px;
  }
}

//修改销售单
.salelist_update {
  padding: 30px;
  .update_form {
    width: 1326px;
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
  .add_table_row {
    margin: 20px 0;
    font-size: 16px;
    button {
      font-size: 15px !important;
    }
  }
}

//采购明细表格
.detail_list {
  margin-left: 20px;
  .reback {
    margin-top: 20px;
  }
}
</style>
