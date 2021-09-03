<template>
  <div class="buylist_warpper">
    <div class="buylist_mgr" v-show="!isUpdate && !isCheck">
      <div class="add_buylist">
        <el-button type="primary" icon="el-icon-plus" @click="buylistAdd">添加</el-button>
      </div>
      <!-- 采购单展示区 -->
      <div class="all_buylist">
        <el-table :data="buyList" border style="width: 100%">
          <el-table-column type="index" label="序号" width="100"> </el-table-column>
          <el-table-column prop="poId" label="采购单编号" width="150"> </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
          <el-table-column prop="venderName" label="供应商名称" width="150"> </el-table-column>
          <el-table-column prop="account" label="创建用户" width="150"></el-table-column>
          <el-table-column prop="tipFee" label="附加费用" width="150"></el-table-column>
          <el-table-column prop="poTotal" label="采购总价格" width="100"></el-table-column>
          <el-table-column prop="payType" label="付款方式" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.payType == 1">货到付款</span>
              <span v-else-if="scope.row.payType == 2">款到发货</span>
              <span v-else-if="scope.row.payType == 3">预付款到发货</span>
            </template>
          </el-table-column>
          <el-table-column prop="prePayFee" label="最低预付金额" width="150"></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="upadateBuylist(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="checkDetailList(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small" @click="delBuylist(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页栏 -->
      <div class="pagination">
        <el-pagination @current-change="handleCurrentPageChange" background layout="prev, pager, next" :total="totalBuylist"> </el-pagination>
      </div>
    </div>

    <!-- 修改采购单 -->
    <div class="buylist_update" v-show="isUpdate && !isCheck">
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
              <el-option label="货到付款" value="货到付款"></el-option>
              <el-option label="款到发货" value="款到发货"></el-option>
              <el-option label="预付款到发货" value="预付款到发货"></el-option>
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
      <el-button type="primary" @click="submitForm('buylistForm')">修改</el-button>
      <el-button @click="reback">返回</el-button>
    </div>

    <!-- 查看明细单 -->
    <div class="detail_list" v-show="isCheck">
      <el-table :data="buylistForm.poitems" border style="width: 100%">
        <el-table-column type="index" label="序号" width="100"> </el-table-column>
        <el-table-column prop="productCode" label="产品编号" width="150"> </el-table-column>
        <el-table-column prop="productName" label="产品名称" width="200"> </el-table-column>
        <el-table-column prop="num" label="产品数量" width="150"></el-table-column>
        <el-table-column prop="unitName" label="数量单位" width="150"></el-table-column>
        <el-table-column prop="unitPrice" label="采购单价" width="150"></el-table-column>
        <el-table-column prop="itemPrice" label="采购明细总价" width="200"></el-table-column>
      </el-table>
      <div class="reback">
        <el-button type="primary" @click="rebackFormDetailList">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { apiBuylistQuery, apiGetVenderAll, apiGetPomainQueryItem, apiGetAllProduct, apiGetProduct, apiDelPomain } from '@/request/api'
import jutils from 'jutils-src'
import axios from 'axios'

export default {
  data() {
    return {
      buyList: [],
      totalBuylist: 1,
      isUpdate: false,
      isCheck: false,
      currentPage: 1,
      productCode: '',
      //所有供应商
      venderList: [],
      //所有产品名称以及编号
      productAll: [],
      //数量单位
      unitName: '',

      //采购单表单
      buylistForm: {
        poId: '',
        account: '',
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
      rules: {
        poId: [{ required: true, message: '请输入采购单编号', trigger: 'blur' }],
        venderCode: [{ required: true, message: '请选择供应商', trigger: 'blur' }],
        tipFee: [
          { required: true, message: '请输入采购单密码', trigger: 'blur' },
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
    //附加费用改变时计算采购总价
    handleTipFeeChange() {
      this.buylistForm.poTotal = Number(this.buylistForm.tipFee) + Number(this.buylistForm.productTotal)
    },
    //添加采购单
    buylistAdd() {
      this.$router.push('addbuylist')
    },
    //获取所有产品名称以及编号
    getProductAll() {
      apiGetAllProduct({}).then(res => {
        this.productAll = res
      })
    },
    //获取所有供应商列表
    getVenderAll() {
      apiGetVenderAll({}).then(res => {
        this.venderList = res
      })
    },
    //明细中选择产品名称时，自动获取数量单位
    // handleProductChange(index, row) {
    //   this.buylistForm.poitems[index].unitName = this.getThisProductInfo(row).unitName
    // },
    //获取指定poductCode产品的信息
    getThisProductInfo(productCode) {
      apiGetProduct({
        productCode
      }).then(res => {
        return res.list[0]
      })
    },
    //获取采购单数据
    getSupplierList(poId = '', venderCode = '', payType = '', startDate = '', endDate = '', status = 1, page = 1) {
      apiBuylistQuery({
        poId,
        venderCode,
        payType,
        startDate,
        endDate,
        status,
        page
      }).then(res => {
        this.buyList = res.list
        this.totalBuylist = res.total
      })
    },
    //获取指定采购单的明细
    getPomainQueryItem(poId) {
      apiGetPomainQueryItem({
        poId
      }).then(res => {
        this.buylistForm.poitems = res
      })
    },
    //页数改变
    handleCurrentPageChange(page) {
      this.currentPage = page
      this.getSupplierList(this.currentPage)
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
    //删除明细行
    handleDeleteRow(index) {
      this.buylistForm.poitems.splice(index, 1)
    },
    //修改采购单信息
    upadateBuylist(row) {
      this.getPomainQueryItem(row.poId)
      this.isUpdate = true
      this.buylistForm.poId = row.poId
      this.buylistForm.name = row.name
      this.buylistForm.account = row.account
      this.buylistForm.tipFee = row.tipFee
      this.buylistForm.productTotal = row.productTotal
      this.buylistForm.poTotal = row.poTotal
      this.buylistForm.prePayFee = row.prePayFee
      this.buylistForm.createTime = row.createTime
      this.buylistForm.venderCode = row.venderCode
      this.buylistForm.payType = this.formatPayTypeToText(row.payType)
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
      this.getPomainQueryItem(row.poId)
    },
    //明细单中返回
    rebackFormDetailList() {
      this.isCheck = false
    },

    //删除采购单
    delBuylist(row) {
      this.$confirm('此操作将删除该采购单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          apiDelPomain({
            poId: row.poId,
            page: this.currentPage
          }).then(res => {
            if (res.code === 2) {
              this.$message({
                type: 'success',
                message: res.message
              })
              this.buyList = res.data.list
              this.getSupplierList(this.currentPage)
            } else if (res.code === 4) {
              this.$message({
                type: 'warning',
                message: '该采购单存在相关依赖关系，无法删除！'
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
            url: '/main/purchase/pomain/update',
            method: 'post',
            data: {
              poId: this.buylistForm.poId,
              venderCode: this.buylistForm.venderCode,
              account: this.buylistForm.account,
              createTime: this.buylistForm.createTime,
              tipFee: this.buylistForm.tipFee,
              productTotal: this.buylistForm.productTotal,
              poTotal: this.buylistForm.poTotal,
              payType: this.formatPayTypeToNum(this.buylistForm.payType),
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
                this.isUpdate = false
                this.getSupplierList(this.currentPage)
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
    //修改采购单信息返回
    reback() {
      this.isUpdate = false
    }
  },
  mounted() {
    this.getVenderAll()
    this.getSupplierList(this.currentPage)
    this.getProductAll()
  }
}
</script>
<style lang="less" scoped>
.buylist_mgr {
  padding-left: 20px;
  .add_buylist {
    margin-bottom: 25px;
  }
  .all_buylist {
    width: 1451px;
  }
}

//修改采购单
.buylist_update {
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
  width: 1101px;
  margin-left: 20px;
  .reback {
    margin-top: 20px;
  }
}
</style>
