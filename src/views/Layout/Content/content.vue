<template>
  <div>
    <div class="header">
      <i
        v-if="!isCollapse"
        @click="change"
        class="iconfont icon-right-indent"
      ></i>
      <i v-else @click="change" class="iconfont icon-left-indent"></i>
      <div class="header-right">
        <el-dropdown @command="command">
          <span class="el-dropdown-link">
            多语言<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="user">
          欢迎：{{ $store.state.userModule.userInfo.username }}
          <span class="exit" @click="exit">退出登录</span>
        </div>
      </div>
    </div>
    <div class="box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isCollapse"],
  methods: {
    change() {
      this.$emit("change");
    },
    command(command) {
      console.log(this);
      this.$i18n.locale = command;
    },
    exit() {
      localStorage.removeItem("userInfo");
      this.$store.state.userModule.userInfo = {
        username: "",
        token: "",
      };
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 50px;
  background-color: #1e78bf;
  line-height: 50px;
  text-align: left;

  .iconfont {
    color: #fff;
    font-size: 26px;
  }
}
.box {
  padding: 20px;
}
.header-right {
  float: right;
  display: flex;
  color: #fff;
  margin-right: 30px;

  .el-dropdown {
    color: #fff;
    margin-right: 20px;
  }
}
.user {
  font-size: 14px;
  .exit {
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>