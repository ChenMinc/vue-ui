<template>
  <div class="article">
    <el-form :inline="true" class="form-inline">
      <el-form-item>
        <el-input v-model="keywordInpout" placeholder="标题关键字"></el-input>
      </el-form-item>
      <!-- <el-form-item>
        <el-select
          v-model="tag"
          placeholder="筛选标签">
          <el-option
            v-for="item in tagSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-button-group>
        <el-button @click="searchSubmit" type="primary" icon="el-icon-search">查询</el-button>
        <el-button @click="$router.push('/main/article/add')" icon="el-icon-edit-outline">新增</el-button>
      </el-button-group>
    </el-form>
    <el-table :data="tableData" stripe style="width: 100%" :highlight-current-row="true">
      <el-table-column prop="title" label="文章名称"></el-table-column>
      <el-table-column prop="tags" label="标签">
        <template slot-scope="scope">
          <el-tag size="mini" v-for="(item, index) in scope.row.tags" :key="index">{{item.tagName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="quantity" label="阅读量" width="150"></el-table-column>
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
            <el-button @click="handleClick(scope.row)" size="mini" icon="el-icon-view"></el-button>
            <el-button @click="rowRevise(scope.row)" size="mini" icon="el-icon-edit"></el-button>
            <el-button @click="deleteComfirm(scope.row)" type="danger" size="mini" icon="el-icon-delete"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination layout="prev, pager, next" :current-page="curPage" @current-change="getArticlesList" :total="total" :background="true"></el-pagination>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'ArticleList',
  data () {
    return {
      keywordInpout: '',
      keyword: '',
      total: 0,
      curPage: 1,
      tableData: []
      // tag: 'all',
      // tagSelect: [
      //   { 'value': 'all', 'label': '全部标签' }
      // ]
    }
  },
  methods: {
    formatStatus (row, column, cellValue) {
      return cellValue === '1' ? '上线中' : '已下线'
    },
    handleClick (row) {
      console.log('当前row数据：', row)
    },
    rowRevise (row) {
      this.$router.push({ name: 'ArticleRevise', params: { row } })
    },
    deleteComfirm (row) {
      this.$confirm('此操作将永久删除文章《' + row.title + '》, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.rowDelete(row)
      }).catch(() => {})
    },
    rowDelete (row) {
      this.$http.deleteArticles(row).then(res => {
        if (res.code === 0) {
          this.$notify({
            title: '删除成功',
            message: '删除文章《' + row.title + '》成功',
            type: 'success'
          })
          this.getArticlesList(this.curPage)
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    searchSubmit () {
      // if (!this.keyword.trim()) {
      //   return this.$message({
      //     message: '搜索关键词不能为空',
      //     type: 'warning'
      //   })
      // }
      this.keyword = this.keywordInpout
      this.curPage = 1
      this.getArticlesList(1)
    },
    filterStatus (value, row) {
      return row.status === value
    },
    getArticlesList (page, keyword) {
      if (this.searchOn) {
        keyword = this.keyword
      }
      this.curPage = page
      const params = { page }
      params.keyword = this.keyword
      // if (this.tag !== 'all') {
      //   params.tag = this.tag
      // }
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
  // created () {
  //   // 获取tags
  //   this.$http.getTagsAll().then(res => {
  //     if (res.code === 0) {
  //       for (let i in res.data) {
  //         const params = {}
  //         params.value = res.data[i].tagId
  //         params.label = res.data[i].tagName
  //         this.tagSelect.push(params)
  //       }
  //     } else {
  //       this.$message(res.message)
  //     }
  //   }).catch(err => {
  //     this.$message.error(err.message)
  //   })
  // },
  mounted () {
    this.getArticlesList(this.curPage)
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
.el-popover{
  margin-left: -50px;
}
</style>
