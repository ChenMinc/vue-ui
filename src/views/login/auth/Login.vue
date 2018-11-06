<template>
  <div class="loginPage">
    <el-row>
        <el-col :span="24">
            <el-form label="user">
                <el-form-item label="用户名">
                    <el-input v-model="username" type="text" id="user"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="password" type="password" id="pass"></el-input>
                </el-form-item>
                <el-button type="primary" @click="submitForm()">登录</el-button>
                <el-button type="info" @click="clearForm()">重置</el-button>
            </el-form>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      username: "",
      password: "",
      isPass: "",
    };
  },
  methods: {
    inputBlur() {
      if (!this.username.trim() || !this.password.trim()) {
        this.isPass = false;
        return this.$message({
          message: "用户名或密码不能为空",
          type: "warning"
        });
      }
      this.isPass = true;
    },
    submitForm() {
      this.inputBlur();
      if (!this.isPass) return;
      this.$router.push("/main");
    },
    clearForm() {
      this.username = "";
      this.password = "";
      this.isPass = "";
    }
  }
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
}
.loginPage {
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-height: 300px;
}
.el-form {
  width: 350px;
  min-height: 300px;
}
.el-form-item {
  margin-bottom: 0%;
}
.el-button {
  margin-top: 20px;
}
</style>