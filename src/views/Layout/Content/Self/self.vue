<template>
  <div>
    <div class="look">
      <el-button @click="look">查看合同</el-button>
    </div>

    <Contact ref="contact" />
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="grid-content">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button
              @click="download"
              style="float: right; padding: 3px 0"
              type="text"
              >下载发票</el-button
            >
          </div>
          <img ref="img1" :src="img" alt="" /> </el-card
      ></el-col>
      <el-col :span="8"
        ><el-card class="grid-content">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="downs"
              >下载不同源发票</el-button
            >
          </div>
          <img ref="img2" :src="img" alt="" /> </el-card
      ></el-col>
      <el-col :span="8"
        ><el-card class="grid-content">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="down()"
              >下载本地发票</el-button
            >
          </div>
          <img ref="img3" :src="img" alt="" /> </el-card
      ></el-col>
    </el-row>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="exportTable"
          >导出表格</el-button
        >
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import Contact from "./contact.vue";
import img from "../../../../assets/11.png";
import { export2Excel } from "../../../../common/js/util";
export default {
  components: {
    Contact,
  },
  data() {
    return {
      img,
      columns: [
        //定义表头
        { title: "日期", key: "date" },
        { title: "姓名", key: "name" },
        { title: "地址", key: "address" },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    look() {
      this.$refs.contact.dialogVisible = true;
    },
    download() {
      // 打开新窗口
      let url = this.$refs.img1;
      console.log(url);
      window.location.href = url.src;
    },
    down() {
      //必须同源才能下载
      let alink = document.createElement("a");
      alink.href = img;
      console.log(img);
      console.log(alink.download);
      alink.download = "pic";
      alink.click();
    },
    downs() {
      this.downloadImg(this.$refs.img3.src, "pic");
    },
    //解决图片不同源下载问题：
    downloadImg(imgsrc, name) {
      //下载图片地址和图片名
      var image = new Image(); //<img />
      // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据 图片格式，默认为 image/png
        var a = document.createElement("a"); // 生成一个a元素
        var event = new MouseEvent("click"); // 创建一个单击事件
        a.download = name || "photo"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      };
      image.src = imgsrc;
    },
    exportTable() {
      // export2Excel('表头','需要导出的数据')
      export2Excel(this.columns, this.tableData, "用户列表");
    },
  },
};
</script>

<style lang="less" scoped>
div {
  text-align: left;
}
.look {
  background-color: #fff;
  padding: 5px;
}
.el-row {
  margin-bottom: 20px;
  margin-top: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  background-color: #fff;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
img {
  width: 100%;
}
</style>