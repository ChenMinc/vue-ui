<template>
  <div class="article">
    <el-form :inline="true" class="form-inline">
      <el-form-item>
        <el-input v-model="formInline.name" placeholder="关键字"></el-input>
      </el-form-item>
      <el-button-group>
        <el-button @click="onSubmit" type="primary" icon="el-icon-search">查询</el-button>
        <el-button @click="$router.push('/main/article/add')" icon="el-icon-edit-outline">新增</el-button>
      </el-button-group>
    </el-form>
    <el-table :data="tableData" stripe style="width: 100%" :highlight-current-row="true">
      <el-table-column prop="title" label="文章名称"></el-table-column>
      <el-table-column prop="tags" label="标签"></el-table-column>
      <el-table-column prop="quantity" label="阅读量" width="100"></el-table-column>
      <el-table-column prop="updatedTime" label="更新时间" sortable width="150"></el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="70"
        :filters="[{ text: '上线', value: '1' }, { text: '下线', value: '0' }]"
        :filter-method="filterStatus"
        filter-placement="bottom-end">
        <template slot-scope="scope">
        <el-tag size="mini" :type="scope.row.status === '0' ? 'info' : 'success'"
          disable-transitions>{{scope.row.status === '0' ? '下线' : '上线'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click="handleClick(scope.row)" size="mini" icon="el-icon-view"></el-button>
            <el-button @click="articleRevise(scope.row)" size="mini" icon="el-icon-edit"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
          </el-button-group>
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
  name: 'ArticleList',
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
      return cellValue === '1' ? '上线中' : '已下线'
    },
    handleClick (row) {
      console.log('当前row数据：', row)
    },
    articleRevise (row) {
      console.log('当前row数据：', row)
      this.$router.push({ name: 'ArticleRevise', params: { row } })
    },
    onSubmit () {
      console.log(this.formInline)
    },
    filterStatus(value, row) {
      return row.status === value;
    },
    getArticlesList (val = 0) {
      this.$http.getArticlesList({ page: val }).then(res => {
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
