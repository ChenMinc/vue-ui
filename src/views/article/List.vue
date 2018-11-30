<template>
  <div class="search">
    <el-form :inline="true" class="form-inline">
      <el-form-item>
        <el-input v-model="formInline.name" placeholder="关键字"></el-input>
      </el-form-item>      
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" stripe style="width: 100%" :highlight-current-row="true">
      <el-table-column prop="name" label="文章名称"></el-table-column>
      <el-table-column prop="category" label="分类"></el-table-column>
      <el-table-column prop="quantity" label="阅读量"></el-table-column>
      <el-table-column prop="deliveryTime" label="发布时间"></el-table-column>
      <el-table-column prop="status" label="状态" :formatter="formatStatus"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination layout="prev, pager, next" :total="total" :background="true"></el-pagination>
    </div>
  </div>
</template>

<script>
import { getUserList } from '../../http/user'
export default {
  name: 'UserList',
  data () {
    return {
      formInline: {
        name: '',
        email: ''
      },
      total: 0,
      tableData: []
    }
  },
  methods: {
    formatStatus (row, column, cellValue) {
      return cellValue === 'ok' ? '上线中' : '已下线'
    },
    handleClick (row) {
      console.log('当前row数据：', row)
    },
    onSubmit () {
      console.log(this.formInline)
    }
  },
  mounted () {
    // getUserList().then(res => {
    //   this.tableData = res.rows
    //   this.total = this.tableData.length
    // }).catch(err => {
    //   this.$message.error(err.message)
    // })
  }
}
</script>

<style scoped>
.search {
  width: 100%;
  height: 100%;
  text-align: left;
}
.page {
  text-align: center;
  margin-top: 20px;
}
</style>
