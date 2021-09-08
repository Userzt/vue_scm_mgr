<template>
  <div class="paytype_select">
    <el-button type="primary" @click="cashOnDelivery">货到付款</el-button>
    <el-button type="primary" @click="paymentToDelivery">款到发货</el-button>
    <el-button type="primary" @click="advancePaymentToDelivery">预付款到发货</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    //货到付款
    cashOnDelivery() {
      this.$emit('cashOnDelivery')
    },
    //款到发货
    paymentToDelivery() {
      this.$emit('paymentToDelivery')
    },
    //预付款到发货
    advancePaymentToDelivery() {
      this.$emit('advancePaymentToDelivery')
    }
  }
}
</script>
<style lang="less" scoped>
.paytype_select {
  margin-bottom: 20px;
  .el-button {
    margin-left: 0 !important;
    border-radius: 0 !important;
    border-right: 1px solid #fff !important;
  }
}
</style>
