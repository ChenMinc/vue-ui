<template>
  <div class="article">
    <el-form :inline="true" class="form-inline">
      <el-form-item>
        <el-input v-model="keywordInpout" placeholder="关键字"></el-input>
      </el-form-item>
      <el-button-group>
        <el-button @click="searchSubmit" type="primary" icon="el-icon-search">查询</el-button>
        <el-button @click="$router.push('/main/tag/add')" icon="el-icon-edit-outline">新增</el-button>
      </el-button-group>
    </el-form>
    <el-table :data="tableData" stripe style="width: 100%" :highlight-current-row="true">
      <el-table-column prop="tagName" label="标签名称">
        <template slot-scope="scope">
          <el-tag size="mini">{{scope.row.tagName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="quantity" label="文章数量" width="150"></el-table-column>
      <el-table-column prop="updatedTime" label="更新时间" sortable width="180"></el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="80">
        <template slot-scope="scope">
        <el-tag size="mini" :type="scope.row.status === '0' ? 'info' : 'success'"
          disable-transitions>{{scope.row.status === '0' ? '下线' : '上线'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click="tagRevise(scope.row)" size="mini" icon="el-icon-edit"></el-button>
            <el-button @click="deleteComfirm(scope.row)" type="danger" size="mini" icon="el-icon-delete"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination layout="prev, pager, next" :current-page="curPage" @current-change="getTagsList" :total="total" :background="true"></el-pagination>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'TagList',
  data () {
    return {
      keywordInpout: '',
      keyword: '',
      total: 0,
      curPage: 1,
      tableData: []
    }
  },
  watch: {
    keyword: function (val) {
      if (!val.trim()) {
        this.getTagsList(1)
      }
    }
  },
  methods: {
    formatStatus (row, column, cellValue) {
      return cellValue === '1' ? '上线中' : '已下线'
    },
    handleClick (row) {
      console.log('当前row数据：', row)
    },
    tagRevise (row) {
      this.$router.push({ name: 'TagRevise', params: { row } })
    },
    filterStatus (value, row) {
      return row.status === value
    },
    getTagsList (page, keyword) {
      this.curPage = page
      const params = { page, keyword: this.keyword }
      this.$http.getTagsList(params).then(res => {
        res.data.rows.forEach(item => {
          item.updatedTime = moment(new Date(item.updatedAt)).format('YYYY-MM-DD HH:mm:ss')
        })
        this.total = res.data.count
        this.tableData = res.data.rows
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    deleteComfirm (row) {
      this.$confirm('此操作将永久删除标签"' + row.tagName + '", 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.rowDelete(row)
      }).catch(() => {})
    },
    rowDelete (row) {
      this.$http.deleteTags(row.tagId).then(res => {
        if (res.code === 0) {
          this.$notify({
            title: '删除成功',
            message: '删除标签"' + row.tagName + '"成功',
            type: 'success'
          })
          this.getTagsList(this.curPage)
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    searchSubmit () {
      this.keyword = this.keywordInpout
      this.curPage = 1
      this.getTagsList(1)
    }
  },
  mounted () {
    this.getTagsList(this.curPage)
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
.el-tag {
  margin-right: 5px;
}
</style>
