<template>
  <div>
    <el-dialog
      title="查看合同"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <pdf
        ref="myPdf"
        :src="src"
        @num-pages="pageCount = $event"
        @page-loaded="currentPage = $event"
        :page="page"
      ></pdf>
      <br />
      {{ currentPage }} / {{ pageCount }}
      <el-button @click="page--">上一页</el-button>
      <el-button @click="page++">下一页</el-button>
      <el-button @click="print">print</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import pdf from "vue-pdf";
export default {
  components: {
    pdf,
  },
  data() {
    return {
      dialogVisible: false,
      currentPage: 0,
      pageCount: 0,
      page: 1,
      src:"./sxt.pdf"
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    print() {
      this.$refs.myPdf.print();
    },
  },
};
</script>

<style lang="less" scoped>
div {
  text-align: left;
}
</style>