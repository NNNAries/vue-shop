<template>
  <div>
    <el-dialog
      width="30%"
      title="选择类目"
      :visible.sync="innerVisible"
      append-to-body
    >
      <CategoryTree ref="tree" @getRulesParams='getRulesParams' />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="select">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="40%"
      title="选择图片"
      :visible.sync="innerVisibleImg"
      append-to-body
    >
      <AddImg @selImg="selImg" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="innerVisibleImg = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CategoryTree from "./categoryTree.vue";
import AddImg from "./addImg.vue";
export default {
  components: {
    CategoryTree,
    AddImg,
  },
  data() {
    return {
      innerVisible: false,
      innerVisibleImg: false,
      
    };
  },
  methods: {
    select() {
      this.innerVisible = false;
      this.selResult = this.$refs.tree.selResult;
      this.$emit("change", this.selResult);
    },
    selImg(val) {
      this.$emit("getImg", val);
    },
    getRulesParams(val){
      this.$emit('getRulesParams',val);
    }
  },
};
</script>

<style>
</style>