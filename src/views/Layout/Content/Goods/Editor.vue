<template>
  <div id="main"></div>
</template>

<script>
import E from "wangeditor";
export default {
  data() {
    return {
      editor: {},
    };
  },
  mounted() {
    this.editor = new E("#main");
    this.editor.config.focus = false;
    // 配置 onchange 回调函数
    this.editor.config.onchange = (newHtml) => {
      //   console.log("change 之后最新的 html", newHtml);
      //传递输入的内容
      this.$emit("getWangData", newHtml);
    };
    this.editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "strikeThrough",
      "indent",
      "lineHeight",
      "foreColor",
      "backColor",
      "link",
      "list",
      "todo",
      //   "justify",
      //   "quote",
      //   "emoticon",
      "image",
      "video",
      //   "table",
      //   "code",
      //   "splitLine",
      "undo",
      "redo",
    ];
    this.editor.create();
  },
};
</script>

<style>
</style>