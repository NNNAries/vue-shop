<template>
  <div>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-size.sync="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: ["pageSize", "total", "page"],
  methods: {
    handleCurrentChange(val) {
      // console.log(val);
      this.$emit('changePage',val);
    },
  },
};
</script>

<style>
</style>