<template>
    <div class="tag-revise">
      <tagEditor @tagHandle="tagRevise" />
    </div>
</template>
<script>
import tagEditor from '@/components/tagEditor'
export default {
  name: 'TagRevise',
  components: {
    tagEditor
  },
  data () {
    return {}
  },
  methods: {
    tagRevise (tagData) {
      this.$http.updateTags(tagData).then(res => {
        const { tagName } = tagData
        if (res.code === 0) {
          this.$notify({
            title: '修改成功',
            message: '标签"' + tagName + '"修改成功',
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
