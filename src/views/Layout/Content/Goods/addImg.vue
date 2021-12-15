<template>
  <div>
    <!-- 
            action	必选参数，上传的地址
            on-preview	点击文件列表中已上传的文件时的钩子	function(file)
            on-remove	文件列表移除文件时的钩子	function(file, fileList)
            on-success	文件上传成功时的钩子	function(response, file, fileList)
            auto-upload	是否在选取文件后立即进行上传	boolean
        -->
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="url"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="successLoad"
      :file-list="fileList"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        :plain="true"
        >上传到服务器</el-button
      >
    </el-upload>
  </div>
</template>

<script>
import base from "../../../../api/base";
export default {
  data() {
    return {
      fileList: [],
      url: base.uploadUrl,
      imgUrl: "",
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
      this.$message({
        message: "上传成功",
        type: "success",
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    successLoad(res, file, fileList) {
      console.log("上传成功", res, file, fileList);
      let imgUrl = base.host + "/" + res.url.slice(7);
      console.log(imgUrl);
      this.imgUrl = imgUrl;
      this.$emit("selImg", this.imgUrl);
    },
  },
};
</script>

<style>
</style>