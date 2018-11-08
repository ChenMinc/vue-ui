<template>
  <div class="loginPage">
    <div class="bg"></div>
    <div class="form">
      <el-row>
          <el-col :span="24">
              <el-form label="email" :label-position="labelPosition" label-width="100px">
                  <div class="form_item">
                      <el-input v-model="email" type="text" id="email" placeholder="邮箱" clearable></el-input>
                  </div>
                  <div class="form_item">
                      <el-input v-model="password" type="password" id="pass" placeholder="密码" clearable></el-input>
                  </div>
                  <el-button type="primary" @click="submitForm()">登录</el-button>
                  <el-button type="info" @click="clearForm()">重置</el-button>
              </el-form>
          </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      email: '',
      password: '',
      isPass: false,
      labelPosition: 'right'
    }
  },
  methods: {
    inputBlur () {
      if (!this.email.trim() || !this.password.trim()) {
        this.isPass = false
        return this.$message({
          message: '用户名或密码不能为空',
          type: 'warning'
        })
      }
      this.isPass = true
    },
    submitForm () {
      this.inputBlur()
      if (!this.isPass) return
      this.axios.post(
        '/users/login', {
          email: this.email,
          password: this.password
        }).then(res => {
        if (res.status === 200) { // 登录成功
          this.LOGIN(res.data)
          this.$router.push('/main')
        } else { // 登陆失败
          console.log(11111)
          this.$message.error(res.error)
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    clearForm () {
      this.email = ''
      this.password = ''
      this.isPass = ''
    }
  }
}
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
}
.loginPage {
  width: 100%;
  height: 100%;
}
.bg{
  width: 100%;
  height: 100%;
  background-image: url(../../assets/bg_login.jpg);
  background-size: auto;
  background-position: center center;
  filter: blur(3px);
}
.form{
  position: absolute;
  padding: 20px;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255,.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.form_item{
  margin-bottom: 20px;
}
</style>
