<template>
  <div class="salelist_add">
    <div class="tit">
      <span>基本信息</span>
    </div>
    <div class="add_form">
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
            <el-option label="货到付款" value="1"></el-option>
            <el-option label="款到发货" value="2"></el-option>
            <el-option label="预付款到发货" value="3"></el-option>
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
    <div class="goods_table" style="width:1251px">
      <el-table :data="salelistForm.poitems" border style="width: 100%">
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
    <el-button type="primary" @click="submitForm('salelistForm')">提交</el-button>
    <el-button @click="reback">取消</el-button>
  </div>
</template>

<script>
import { apiGetAllProduct, apiGetCustomer, apiGetProduct } from '@/request/api'
import jutils from 'jutils-src'
import axios from 'axios'

export default {
  data() {
    return {
      //所有客户
      customerList: [],
      salelistForm: {
        soId: jutils.formatDate(new Date(), 'YYYYMMDDHHiiss'),
        account: sessionStorage.getItem('account'),
        tipFee: 0,
        payType: '',
        customerCode: '',
        soTotal: '',
        productTotal: '',
        remark: '',
        prePayFee: 0,
        createTime: jutils.formatDate(new Date(), 'YYYY-MM-DD HH:ii:ss'),
        //指定销售单明细
        poitems: []
      },
      //所有产品名称以及编号
      productAll: [],
      rules: {
        soId: [{ required: true, message: '请输入销售单编号', trigger: 'blur' }],
        customerCode: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
        tipFee: [
          { required: true, message: '请输入附加费用', trigger: 'blur' },
          { pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/, message: '请输入格式正确的价格', trigger: 'blur' }
        ],
        soTotal: [{ required: true, message: '请输入销售单总价', trigger: 'blur' }],
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
    //明细中选择产品名称时，自动获取数量单位以及销售单价
    handleProductChange(code) {
      let unitName
      let unitPrice
      apiGetProduct({
        productCode: code
      }).then(res => {
        unitName = res.list[0].unitName
        unitPrice = res.list[0].price
        this.salelistForm.poitems.map(item => {
          if (item.productCode === code) {
            item.unitName = unitName
            item.unitPrice = unitPrice
          }
        })
      })
    },
    //创建新销售单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //以json形式提交请求参数
          axios({
            url: '/main/sell/somain/add',
            method: 'post',
            data: {
              soId: this.salelistForm.soId,
              customerCode: this.salelistForm.customerCode,
              account: this.salelistForm.account,
              createTime: this.salelistForm.createTime,
              tipFee: this.salelistForm.tipFee,
              productTotal: this.salelistForm.productTotal,
              soTotal: this.salelistForm.soTotal,
              payType: this.salelistForm.payType,
              prePayFee: this.salelistForm.prePayFee,
              status: 1,
              remark: this.salelistForm.remark,
              soitems: this.salelistForm.poitems
            },
            headers: { 'Content-Type': 'application/json', token: sessionStorage.getItem('token') },
            baseURL: 'http://127.0.0.1:9000'
          })
            .then(res => {
              console.log(res);
              if (res.data.code === 2) {
                this.$message({
                  type: 'success',
                  message: res.data.message
                })
                this.$router.push('salelist')
              } else if (res.data.code === 3) {
                this.$message({
                  type: 'warning',
                  message: '只有预付款到发货才需要预付款'
                })
              } else if (res.data.code === 4) {
                this.$message({
                  type: 'warning',
                  message: res.data.message
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
    //取消添加
    reback() {
      this.$router.push('salelist')
    },
    //获取所有客户列表
    getCustomerAll() {
      apiGetCustomer({}).then(res => {
        this.customerList = res.list
      })
    },
    //添加明细
    tableItemRowAdd() {
      this.salelistForm.poitems.push({
        soId: this.salelistForm.soId,
        productCode: '',
        productName: '',
        unitPrice: '',
        num: '',
        unitName: '',
        itemPrice: ''
      })
    },
    //计算采购以及产品总价
    calPoTotal() {
      let count = 0
      for (let item of this.salelistForm.poitems) {
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
    //附加费用改变时计算采购总价
    handleTipFeeChange() {
      this.salelistForm.soTotal = Number(this.salelistForm.tipFee) + Number(this.salelistForm.productTotal)
    },
    //获取所有产品名称以及编号
    getProductAll() {
      apiGetAllProduct({}).then(res => {
        this.productAll = res
      })
    }
  },
  mounted() {
    this.getCustomerAll()
    this.getProductAll()
  }
}
</script>
<style lang="less" scoped>
.salelist_add {
  padding: 30px;
  .add_form {
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
</style>
