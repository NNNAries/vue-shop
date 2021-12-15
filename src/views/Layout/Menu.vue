<template>
  <div>
    <el-menu
      :collapse="isCollapse"
      :default-active="$router.path"
      class="el-menu-vertical-demo"
      background-color="#1b3554"
      text-color="#fff"
      active-text-color="#1E78BF"
      router
    >
      <el-menu-item>
        <span slot="title">易购后台管理系统</span>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <!-- <span slot="title">首页</span> -->
        <span slot="title">{{ $t("menu.home") }}</span>
      </el-menu-item>
      <el-menu-item index="/goods">
        <i class="el-icon-document"></i>
        <!-- <span slot="title">商品管理</span> -->
        <span slot="title">{{ $t("menu.goods") }}</span>
      </el-menu-item>
      <el-submenu index="/params">
        <template slot="title">
            <i class="el-icon-setting"></i>
            <!-- <span slot="title">规格参数</span> -->
            <span slot="title">{{ $t("menu.params") }}</span>
        </template>
        <el-menu-item index="/params/specs">
            <i class="el-icon-location"></i>
            <span>规格与包装</span>
          </el-menu-item>
      </el-submenu>
      <el-menu-item index="/adv">
        <i class="el-icon-setting"></i>
        <span slot="title">广告管理</span>
      </el-menu-item>
      <el-submenu index="/order">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/order/order-list">
            <i class="el-icon-location"></i>
            <span>订单列表</span>
          </el-menu-item>
          <el-menu-item index="/order/order-back">
            <i class="el-icon-location"></i>
            <span>退货管理</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/self">
        <i class="el-icon-setting"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ["isCollapse"],
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
p {
  text-align: center;
  color: #fff;
  margin-top: 15px;
  font-size: 14px;
}
.el-menu {
  border-right: 1px solid #1b3554;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>