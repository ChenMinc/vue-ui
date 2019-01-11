<template>
    <div class="article-revise">
      <articleEditor @articleHandle="articleRevise" />
    </div>
</template>
<script>
import articleEditor from '@/components/articleEditor'
export default {
  name: 'ArticleRevise',
  components: {
    articleEditor
  },
  data () {
    return {}
  },
  methods: {
    articleRevise (articleData, successCallBack) {
      this.$http.updateArticles(articleData).then(res => {
        console.log(res)
        if (res.code === 0) {
          const { title } = articleData
          this.$notify({
            title: '修改成功',
            message: '文章' + '《' + title + '》' + '修改成功',
            type: 'success'
          })
          successCallBack()
          return this.$router.replace('/main/article')
        } else {
          return this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    }
  }
}
</script>
