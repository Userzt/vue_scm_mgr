<template>
  <div class="user_mgr">
    <div class="add_user">
      <el-button type="primary" icon="el-icon-plus">添加</el-button>
    </div>
    <div class="all_user">
      <el-table :data="userList" border style="width: 100%">
        <el-table-column type="index" label="序号" width="150"> </el-table-column>
        <el-table-column prop="account" label="用户账户" width="120"> </el-table-column>
        <el-table-column prop="name" label="用户姓名" width="120"> </el-table-column>
        <el-table-column prop="status" label="锁定状态" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.status==0">未锁定</span>
            <span v-else-if="scope.row.status==1">已锁定</span>
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
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { apiGetUserList } from '@/request/api'

export default {
  data() {
    return {
      userList: '',
      isUpdate:false
    }
  },
  methods: {
    handleClick(row) {
      console.log(row)
    }
  },
  mounted() {
    apiGetUserList({}).then(res => {
      this.userList = res.list
    })
  }
}
</script>
<style lang="less" scoped>
.user_mgr {
  padding-left: 20px;
  .add_user{
    margin-bottom: 40px;
  }
  .all_user{
    width: 1211px;
  }
}
</style>
