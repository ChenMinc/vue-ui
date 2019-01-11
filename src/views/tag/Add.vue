<template>
    <div class="tag-add">
      <tagEditor @tagHandle="tagAdd" />
    </div>
</template>
<script>
import tagEditor from '@/components/tagEditor'
export default {
  name: 'TagAdd',
  components: {
    tagEditor
  },
  data () {
    return {
    }
  },
  methods: {
    tagAdd (tagData) {
      this.$http.createTags(tagData).then(res => {
        const { tagName } = tagData
        if (res.code === 0) {
          this.$notify({
            title: '添加成功',
            message: '标签"' + tagName + '"添加成功',
            type: 'success'
          })
          return this.$router.replace('/main/tag')
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
