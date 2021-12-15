<template>
  <div>
    <!-- 左侧导航 -->
    <Menu class="menu" :isCollapse="isCollapse" />
    <!-- 右侧内容 -->
    <Content
      :isCollapse="isCollapse"
      class="content"
      :class="{ isActive: isCollapse }"
      @change="change"
    />
  </div>
</template>

<script>
import Menu from "./Menu.vue";
import Content from "./Content/content.vue";
export default {
  components: {
    Menu,
    Content,
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    change() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style lang='less' scoped>
.menu {
  position: fixed;
  height: 100%;
  background-color: #1b3554;
  text-align: left;
}
.content {
  margin-left: 200px;
  transition: all 0.5s;
}
.isActive {
  margin-left: 64px;
}
</style>