<template>
  <div>
    <el-dialog
      title="添加规格参数"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <InnerDialog
        :name="name"
        :cid="cid"
        ref="innerDialog"
      />
      <ParamsTree :isDisabled="isDisabled" @change="change" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" :disabled="isDisabled" @click="addAndGroup"
          >确定添加并分组</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ParamsTree from "./paramsTree.vue";
import InnerDialog from "./innerDialog.vue";
export default {
  components: {
    ParamsTree,
    InnerDialog,
  },
  data() {
    return {
      dialogVisible:false,
      isDisabled: true,
      innerVisible: false,
      cid: "",
      name: "",
    };
  },
  methods: {
    cancel() {
      this.dialogVisible=false;
    },
    change(val) {
      console.log("----", this.isDisabled);
      this.isDisabled = false;
      this.name = val.name;
      this.cid = val.cid;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    addAndGroup() {
      this.$refs.innerDialog.innerVisible=true;
    },
  },
};
</script>

<style lang="less" scoped>
div {
  text-align: left;
}
</style>