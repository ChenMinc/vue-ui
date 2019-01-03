<template>
  <div class="tag">
    <el-form :inline="true" class="form-inline">
      <el-form-item>
        <el-input v-model="searchString" placeholder="关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" stripe style="width: 100%" :highlight-current-row="true">
      <el-table-column prop="title" label="标签名称"></el-table-column>
      <el-table-column prop="quantity" label="文章数量"></el-table-column>
      <el-table-column prop="updatedTime" label="更新时间"></el-table-column>
      <el-table-column prop="status" label="状态" :formatter="formatStatus">
        <template slot-scope="scope">
        <el-tag
          :type="scope.row.tag === '家' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.tag}}</el-tag>
      </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="articleRevise(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination layout="prev, pager, next" @current-change="getArticlesList" :total="total" :background="true"></el-pagination>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'TagList',
  data () {
    return {
      searchString: '',
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
    articleRevise (row) {
      console.log('当前row数据：', row)
      this.$router.push({ name: 'ArticleRevise', params: { row } })
    },
    onSubmit () {
      console.log(this.searchString)
    },
    getArticlesList (val) {
      const params = val ? { page: val } : { page: 0 }
      this.$http.getArticlesList(params).then(res => {
        res.data.rows.forEach(item => {
          item.updatedTime = moment(new Date(item.updatedAt)).format('YYYY-MM-DD HH:mm:ss')
        })
        this.total = res.data.count
        this.tableData = res.data.rows
      }).catch(err => {
        this.$message.error(err.message)
      })
    }
  },
  mounted () {
    this.getArticlesList()
  }
}
</script>

<style scoped>
.form-inline {
  width: 100%;
  height: 100%;
  text-align: left;
}
.page {
  text-align: center;
  margin-top: 20px;
}
</style>
