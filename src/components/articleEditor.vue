<template>
    <div class="article-add">
      <el-form :inline="true" class="form-inline">
        <el-form-item>
          <el-input v-model="article.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="tag"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="标签">
            <el-option
              v-for="item in tagSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select class="status" v-model="article.status" placeholder="文章状态">
            <el-option label="下线" value="0"></el-option>
            <el-option label="上线" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-button-group>
          <el-button @click="onSubmit" type="primary" icon="el-icon-circle-check-outline">提交</el-button>
          <el-button @click="saveArticle" icon="el-icon-upload2">暂存</el-button>
        </el-button-group>
      </el-form>
      <editor :initVal="article.content" ref="editor"></editor>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
import editor from 'vue2-mditor'
export default {
  components: {
    editor
  },
  data () {
    return {
      article: {
        title: '',
        // tag: [],
        status: '',
        content: ''
      },
      tag: [],
      tagSelect: [{
        value: 'HTML',
        label: 'HTML'
      }, {
        value: 'CSS',
        label: 'CSS'
      }, {
        value: 'JavaScript',
        label: 'JavaScript'
      }],
      lastPath: null
    }
  },
  methods: {
    ...mapMutations(['ARTICLEREVISEUPDATE', 'ARTICLEADDUPDATE']),
    onSubmit () {
      this.updateContent()
      if (!this.article.title.trim()) {
        return this.$message({
          message: '标题不能为空',
          type: 'warning'
        })
      }
      if (!this.article.content.trim()) {
        return this.$message({
          message: '内容不能为空',
          type: 'warning'
        })
      }
      this.isPass = true
      this.$http.updateArticles(this.article).then(res => {
        if (res.code === 0) {
          const { title } = this.article
          this.$notify({
            title: '上传成功',
            message: '《' + title + '》' + '文章上传成功',
            type: 'success'
          })
          console.log(this.$router)
          this.$router.replace('/main/article')
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    saveArticle () {
      this.updateContent()
      this['ARTICLE' + this.lastPath.toUpperCase() + 'UPDATE'](this.article)
      this.$notify({
        title: '已保存',
        message: '当前编辑已保存至本地',
        type: 'success'
      })
    },
    updateContent () {
      this.article.content = this.$refs.editor.getValue()
    }
  },
  created () {
    const path = this.$route.path
    this.lastPath = path.substr(path.lastIndexOf('/') + 1)
    if (this.$route.params.row) {
      this.article = this.$route.params.row
    } else if (this.lastPath && this.$store.state.articleEditor[this.lastPath]) {
      this.article = this.$store.state.articleEditor[this.lastPath]
    }
  }
}
</script>
<style scoped>
  .article-add {
    text-align: left;
  }
  .status {
    width: 120px;
  }
</style>
