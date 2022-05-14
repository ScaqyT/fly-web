<template>
  <div>

    <div class="background">
      <!-- <img src="../assets/Login_bg.png" width="100%" height="100%"> -->
    </div>

    <el-form
      class="loginContain"
      :model="loginForm"
      ref="loginForm"
      :rules="loginRules"
      label-position="left"
      label-width="80px"
      v-loading="loading"
    >
      <h1>登录</h1>
      <el-form-item label="用户名" prop="username" label-width="70px">
        <el-input
          v-model="loginForm.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" label-width="70px">
        <el-input
          v-model="loginForm.password"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code" label-width="70px">
        <el-col :span="14" :offset="0">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
          ></el-input>
        </el-col>
        <el-col :span="10" :offset="0">
          <img
            style="float: right"
            :src="captchaUrl"
            @click="updateCaptcha"
          />
        </el-col>
      </el-form-item>
      <el-button style="width: 100%" type="primary" @click="submitLogin('loginForm')"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      captchaUrl: "/captcha?time" + new Date(),
      loginForm: {
        username: "admin2",
        password: "123",
        code: ''
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      loading: false
    };
  },
  methods: {
    updateCaptcha() {
      this.captchaUrl = "/captcha?time" + new Date();
    },
    submitLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading=true;
          this.postRequest("/login", this.loginForm).then((resp) => {
            
            if (resp) {
              this.loading=false;
              //存储用户token
              const tokenStr = resp.obj.tokenHead + resp.obj.token;
              window.sessionStorage.setItem("tokenStr", tokenStr);
              //跳转到首页
              let path = this.$route.query.redirect;
              this.$router.replace(
                path == "/" || path == undefined ? "/home" : path
              );
              return;
            }
            this.loading = false;
            this.updateCaptcha();
          }).catch(()=>{
            this.loading=false;
          })
        } else {
          this.$message.error("请输入所有字段!");
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
.background {
  background: url("../assets/Login_bg.png") center no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
}
/* .el-main {
  text-align: center;
  position: fixed;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  background-color: rgb(255, 255, 255);
} */
.loginContain {
  width: 350px;
  background-clip: border-box;
  background-color: aliceblue;
  margin: 150px auto;
  right: 200px;
  padding: 30px 20px 30px 20px;
  border: 1px rgb(192, 192, 192);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  text-align: center;
  position: absolute;
  z-index: 1;
}
</style>