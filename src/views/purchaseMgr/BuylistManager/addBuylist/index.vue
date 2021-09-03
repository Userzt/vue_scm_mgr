<template>
  <div class="buylist_add">
    <div class="tit">
      <span>基本信息</span>
    </div>
    <div class="update_form">
      <el-form :inline="true" :model="buylistForm" :rules="rules" ref="buylistForm" label-width="100px" class="demo-buylistForm">
        <el-form-item label="采购单编号" prop="poId">
          <el-input v-model="buylistForm.poId" disabled></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="venderCode">
          <el-select v-model="buylistForm.venderCode">
            <el-option v-for="item in venderList" :key="item.venderCode" :label="item.name" :value="item.venderCode"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="付款方式" prop="payType">
          <el-select v-model="buylistForm.payType" style="width:214px;">
            <el-option label="货到付款" value="1"></el-option>
            <el-option label="款到发货" value="2"></el-option>
            <el-option label="预付款到发货" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建用户" prop="account">
          <el-input v-model="buylistForm.account" disabled></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-input v-model="buylistForm.createTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="附加费用" prop="tipFee">
          <el-input v-model="buylistForm.tipFee" @input="handleTipFeeChange()"></el-input>
        </el-form-item>
        <el-form-item label="产品总价" prop="productTotal">
          <el-input v-model="buylistForm.productTotal" readonly></el-input>
        </el-form-item>
        <el-form-item label="采购总价" prop="poTotal">
          <el-input v-model="buylistForm.poTotal" readonly></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="buylistForm.remark"></el-input>
        </el-form-item>
        <el-form-item label="最低预付款" prop="prePayFee">
          <el-input v-model="buylistForm.prePayFee"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="goods_table" style="width:1251px">
      <el-table :data="buylistForm.poitems" border style="width: 100%">
        <el-table-column type="index" label="序号" width="100"> </el-table-column>
        <el-table-column label="产品名称" width="250">
          <template slot-scope="scope">
            <el-select v-model="scope.row.productCode">
              <el-option v-for="item in productAll" :key="item.productCode" :label="item.name" :value="item.productCode"> </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="产品单价" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.unitPrice" @input="handleNumAndPriceChange(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="产品数量" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.num" @input="handleNumAndPriceChange(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="数量单位" width="150">
          <template slot-scope="scope">
            <el-select v-model="scope.row.unitName">
              <el-option v-for="item in productAll" :key="item.productCode" :label="item.unitName" :value="item.unitName"> </el-option>
            </el-select>
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
    <el-button type="primary" @click="submitForm('buylistForm')">提交</el-button>
    <el-button @click="reback">取消</el-button>
  </div>
</template>

<script>
import { apiGetVenderAll, apiGetAllProduct } from '@/request/api'
import jutils from 'jutils-src'
import { getTimeToNum } from '@/utils/timeFormat'
import axios from 'axios'

export default {
  data() {
    return {
      //所有供应商
      venderList: [],
      buylistForm: {
        poId: getTimeToNum(new Date()),
        account: sessionStorage.getItem('account'),
        tipFee: '',
        payType: '',
        venderCode: '',
        poTotal: '',
        productTotal: '',
        remark: '',
        prePayFee: 0,
        createTime: jutils.formatDate(new Date(), 'YYYY-MM-DD HH:ii:ss'),
        //指定采购单明细
        poitems: []
      },
      //所有产品名称以及编号
      productAll: [],
      rules: {
        poId: [{ required: true, message: '请输入采购单编号', trigger: 'blur' }],
        venderCode: [{ required: true, message: '请输入供应商名称', trigger: 'blur' }],
        tipFee: [
          { required: true, message: '请输入附加费用', trigger: 'blur' },
          { pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/, message: '请输入格式正确的价格', trigger: 'blur' }
        ],
        poTotal: [{ required: true, message: '请输入采购总价', trigger: 'blur' }],
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
    //创建新采购单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //以json形式提交请求参数
          axios({
            url: '/main/purchase/pomain/add',
            method: 'post',
            data: {
              poId: this.buylistForm.poId,
              venderCode: this.buylistForm.venderCode,
              account: this.buylistForm.account,
              createTime: this.buylistForm.createTime,
              tipFee: this.buylistForm.tipFee,
              productTotal: this.buylistForm.productTotal,
              poTotal: this.buylistForm.poTotal,
              payType: this.buylistForm.payType,
              prePayFee: this.buylistForm.prePayFee,
              status: 1,
              remark: this.buylistForm.remark,
              poitems: this.buylistForm.poitems
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
                this.$router.push('buylist')
              } else if (res.data.code === 3) {
                this.$message({
                  type: 'warning',
                  message: '只有预付款到发货才需要预付款'
                })
              } else if (res.data.code === 4) {
                this.$message({
                  type: 'warning',
                  message: '不可重复添加同一产品的采购单明细'
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
      this.$router.push('buylist')
    },
    //获取所有供应商列表
    getVenderAll() {
      apiGetVenderAll({}).then(res => {
        this.venderList = res
      })
    },
    //添加明细
    tableItemRowAdd() {
      this.buylistForm.poitems.push({
        poId: this.buylistForm.poId,
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
      for (let item of this.buylistForm.poitems) {
        count += item.num * item.unitPrice
      }
      this.buylistForm.poTotal = count + Number(this.buylistForm.tipFee)
      this.buylistForm.productTotal = count
    },
    //明细中产品数量以及产品单价改变时
    handleNumAndPriceChange(row) {
      row.itemPrice = row.unitPrice && row.unitPrice * row.num
      this.calPoTotal()
    },
    //附加费用改变时计算采购总价
    handleTipFeeChange() {
      this.buylistForm.poTotal = Number(this.buylistForm.tipFee) + Number(this.buylistForm.productTotal)
    },
    //获取所有产品名称以及编号
    getProductAll() {
      apiGetAllProduct({}).then(res => {
        this.productAll = res
      })
    }
  },
  mounted() {
    this.getVenderAll()
    this.getProductAll()
  }
}
</script>
<style lang="less" scoped>
.buylist_add {
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
</style>
