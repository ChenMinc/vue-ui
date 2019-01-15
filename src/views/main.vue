 <template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown @command="clickItem">
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="0">用户信息</el-dropdown-item>
          <el-dropdown-item command="1">修改密码</el-dropdown-item>
          <el-dropdown-item command="2">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>{{userInfo.name}}</span>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246);height:100%;">
        <el-menu :default-openeds="['1']" :router="true">
          <el-menu-item index="1" route="/main/article">
            <i class="el-icon-document"></i>
            <span slot="title">文章管理</span>
          </el-menu-item>
          <el-menu-item index="2" route="/main/tag">
            <i class="el-icon-news"></i>
            <span slot="title">标签管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-container>
          <el-header style="height:10px;" class="navBar">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>欢迎页</el-breadcrumb-item>
            </el-breadcrumb>
          </el-header>
          <el-main>
            <router-view/>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
    <el-dialog title="关于我" :visible.sync="userInfoVisible" width="30%">
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="userInfo.name" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userInfo.email" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="userInfoVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="changeCodeVisible" width="35%">
      <el-form
        :inline="true"
        :model="codeChange"
        label-width="70px"
        ref="codeChange"
        :rules="codeRules"
      >
        <el-form-item label="旧密码" prop="oldCode">
          <el-input v-model="codeChange.oldCode" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newCode">
          <el-input v-model="codeChange.newCode" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkCode">
          <el-input v-model="codeChange.checkCode" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="changeCode_btn">
          <el-button type="primary" @click="Form('codeChange')">确 定</el-button>
          <el-button @click="clearForm('codeChange')">重 置</el-button>
        </el-form-item>
      </el-form>
      <!-- <div slot="footer" class="dialog-footer">
         <el-button @click="clearForm('codeChange')">重 置</el-button>
         <el-button type="primary" @click="Form('codeChange')">确 定</el-button>
      </div>-->
    </el-dialog>
  </el-container>
</template>

<style>
.el-header {
  background-color: #66b1ff;
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
}
.navBar {
  background-color: #fff;
}
.changeCode_btn {
  margin-bottom: 0;
  text-align: left;
}
</style>

<script>
import { mapState, mapMutations } from 'vuex'
// import { loginOut } from '../http/user'
export default {
  name: 'Main',
  data () {
    const validateOldCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'))
      } else if (value.length < 6) {
        callback(new Error('长度至少为6位!'))
      } else {
        callback()
      }
    }
    const validateNewCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (value.length < 6) {
        callback(new Error('长度至少为6位!'))
      } else {
        callback()
      }
    }
    const validateCheckCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.codeChange.newCode) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userInfo: {
        name: '你你你你',
        email: 'sky_cmc@163.com'
      },
      userInfoVisible: false,
      changeCodeVisible: false,
      isPass: false,
      codeChange: {
        oldCode: '',
        newCode: '',
        checkCode: ''
      },
      codeRules: {
        oldCode: [{ validator: validateOldCode, trigger: 'blur' }],
        newCode: [{ validator: validateNewCode, trigger: 'blur' }],
        checkCode: [{ validator: validateCheckCode, trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapMutations(['LOGOUT']),
    selectOne (row, column, cell, event) {
      console.log(row.name)
    },
    clickItem (command) {
      command = parseInt(command)
      switch (command) {
        case 0:
          this.userInfoVisible = true
          break
        case 1:
          this.changeCodeVisible = true
          break
        case 2:
          this.LOGOUT()
          this.$router.push('/')
          break
      }
    },
    Form (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        }
      })
    },
    clearForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted () {
    this.userInfo = this.user.userInfo
  }
}
</script>
