<template>
  <div>
    <div class="box">
      <div class="header">
        <span class="login is-active">登录</span>
        <span class="register">注册</span>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import jwt from "jwt-decode";
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, validator: validateUser, trigger: "blur" },
        ],
        password: [{ required: true, validator: validatePwd, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("校验通过", this.ruleForm);
          // 请求登录接口
          let { username, password } = this.ruleForm;
          this.$api.login({ username, password }).then((res) => {
            // 登录成功后，存储登录信息
            // console.log("jwt(res.data.data)", jwt(res.data.data));
            if (res.data.status == 200) {
              let obj = {
                username: jwt(res.data.data).username,
                token: res.data.data,
              };
              this.$store.commit("userModule/changeUser", obj);
              localStorage.setItem('userInfo',JSON.stringify(obj));
              this.$router.push('/');
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
div {
  background-color: #fff;
}
.box {
  width: 600px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin: 150px auto;
  box-shadow: -1px 1px 2px 2px #eee;
  .el-form {
    margin-right: 20px;
  }
}
.header {
  height: 46px;
  background-color: #eee;
  line-height: 46px;
  text-align: left;
  margin-bottom: 30px;
  border-bottom: 1px solid #ccc;
  span {
    color: #666;
    padding: 13px 30px;
    font-size: 14px;
  }
  .is-active {
    color: rgb(73, 137, 255);
    background-color: #fff;
    // border: 1px solid #ccc;
    border-bottom: 1px solid #fff;
  }
}
</style>