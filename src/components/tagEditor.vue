<template>
    <div class="tag-editor">
      <el-form :inline="true" class="form-inline">
        <el-form-item>
          <el-input v-model="tag.tagName" placeholder="标签名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select class="status" v-model="tag.status" placeholder="文章状态">
            <el-option label="下线" value="0"></el-option>
            <el-option label="上线" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-button-group>
          <el-button @click="onSubmit" type="primary" icon="el-icon-circle-check-outline">提交</el-button>
        </el-button-group>
      </el-form>
    </div>
</template>
<script>
export default {
  data () {
    return {
      tag: {
        tagName: '',
        status: ''
      },
      lastPath: null
    }
  },
  methods: {
    onSubmit () {
      if (!this.tag.tagName.trim()) {
        return this.$message({
          message: '标签名称不能为空',
          type: 'warning'
        })
      }
      // 添加/更新标签
      this.$emit('tagHandle', this.tag)
    }
  },
  created () {
    // 获取来源url
    const path = this.$route.path
    this.lastPath = path.substr(path.lastIndexOf('/') + 1)

    // 判定有无数据传入
    if (this.$route.params.row) {
      this.tag = this.$route.params.row
    }
  }
}
</script>
<style scoped>
  .tag-editor {
    text-align: left;
  }
  .status {
    width: 120px;
  }
</style>
