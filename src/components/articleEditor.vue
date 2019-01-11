<template>
    <div class="article-editor">
      <el-form :inline="true" class="form-inline">
        <el-form-item>
          <el-input v-model="article.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="tag"
            multiple
            filterable
            reserve-keyword
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
        tags: [],
        status: '',
        content: ''
      },
      tag: [],
      tagSelect: [],
      lastPath: null,
      tagSelectMap: new Map()
    }
  },
  watch: {
    tag: function (val) {
      const arr = val.concat().sort((val1, val2) => {
        return val1 - val2
      })
      this.article.tags.splice(0, this.article.tags.length)
      arr.forEach(item => {
        const params = {}
        params.tagId = item
        params.tagName = this.tagSelectMap.get(item)
        this.article.tags.push(params)
      })
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
      // 添加/更新文章
      this.$emit('articleHandle', this.article, this.initSaveArticle)
    },
    saveArticle () {
      console.log(JSON.stringify(this.tagSelect))
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
    },
    initSaveArticle () {
      const article = {
        title: '',
        tags: [],
        status: '',
        content: ''
      }
      this.article = article
      this['ARTICLE' + this.lastPath.toUpperCase() + 'UPDATE'](article)
    }
  },
  created () {
    // 获取tags
    this.$http.getTagsAll().then(res => {
      if (res.code === 0) {
        for (let i in res.data) {
          const params = {}
          params.value = res.data[i].tagId
          params.label = res.data[i].tagName
          this.tagSelectMap.set(params.value, params.label)
          this.tagSelect.push(params)
        }
        const arr = this.tag.concat().sort((val1, val2) => {
          return val1 - val2
        })
        this.article.tags = []
        arr.forEach(item => {
          const params = {}
          params.tagId = item
          params.tagName = this.tagSelectMap.get(item)
          this.article.tags.push(params)
        })
      } else {
        this.$message(res.message)
      }
    }).catch(err => {
      this.$message.error(err.message)
    })

    const path = this.$route.path
    this.lastPath = path.substr(path.lastIndexOf('/') + 1)
    if (this.$route.params.row) {
      this.article = this.$route.params.row
    } else if (this.lastPath && this.$store.state.articleEditor[this.lastPath]) {
      this.article = this.$store.state.articleEditor[this.lastPath]
    }

    // 标签格式化
    for (let i in this.article.tags) {
      this.tag.push(this.article.tags[i].tagId)
    }
  }
}
</script>
<style scoped>
  .article-editor {
    text-align: left;
  }
  .status {
    width: 120px;
  }
</style>
