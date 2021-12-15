<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <div class="myform">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="选择类目" prop="category">
            <el-button
              type="primary"
              @click="$refs.innerDialog.innerVisible = true"
              >类目名称</el-button
            >
            <span>{{ ruleForm.category }}</span>
          </el-form-item>
          <el-form-item label="规格参数配置" prop="sellPoint">
            表单数据
            <el-form-item
              v-for="(item, index) in dynamicForm.domains"
              :label="item.title"
              :key="index"
            >
              <div class="list">
                <el-input v-model="item.value"></el-input>
              </div>
              <!-- 第二层 -->
              <el-form-item
                class="childGroup"
                v-for="(ele, i) in item.children"
                :label="ele.title"
                :key="i"
              >
                <div class="list">
                  <el-input v-model="ele.value"></el-input>
                </div>
              </el-form-item>
            </el-form-item>
          </el-form-item>
          <el-form-item label="商品名称" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="num">
            <el-input v-model="ruleForm.num"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input v-model="ruleForm.price"></el-input>
          </el-form-item>
          <el-form-item label="商品卖点" prop="sellPoint">
            <el-input v-model="ruleForm.sellPoint"></el-input>
          </el-form-item>
          <el-form-item label="选择图片" prop="image">
            <el-button
              v-model="ruleForm.image"
              type="primary"
              @click="$refs.innerDialog.innerVisibleImg = true"
              >选择图片</el-button
            >
            <img :src="ruleForm.image" width="200" alt="" />
          </el-form-item>
          <el-form-item label="商品描述" prop="descs">
            <Editor
              @getWangData="getWangData"
              ref="editor"
              :editorTxt="editorTxt"
            />
          </el-form-item>
        </el-form>
      </div>

      <SelCategory
        @getRulesParams="getRulesParams"
        ref="innerDialog"
        @change="change"
        @getImg="getImg"
      />

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SelCategory from "./selCategory.vue";
import Editor from "./Editor.vue";
export default {
  props: {
    fun: {
      type: Function,
    },
  },
  components: {
    SelCategory,
    Editor,
  },
  data() {
    return {
      dialogVisible: false,
      innerVisible: false,
      editorTxt: "",
      title: "添加商品",
      ruleForm: {
        category: "",
        title: "",
        num: "",
        price: "",
        sellPoint: "",
        descs: "",
        image: "",
        cid: "",
        paramsInfo: "",
      },
      dynamicForm: {
        domains: [],
      },
      rules: {
        title: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        num: [{ required: true, message: "请输入商品数量", trigger: "change" }],
        price: [
          { required: true, message: "请输入商品价格", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.dialogVisible = false;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.title.includes("添加")) {
            console.log(JSON.stringify(this.dynamicForm.domains));
            this.ruleForm.paramsInfo = JSON.stringify(this.dynamicForm.domains);
            this.$api.addGoods(this.ruleForm).then((res) => {
              if (res.data.status == 200) {
                this.fun(1);
                this.$refs.ruleForm.resetFields();
                this.dynamicForm.domains = [];
                this.$refs.editor.editor.txt.clear();
              }
            });
          } else {
            this.$api.updateGoods(this.ruleForm).then((res) => {
              if (res.data.status == 200) {
                this.fun(1);
                this.$refs.ruleForm.resetFields();
                this.$refs.editor.editor.txt.clear();
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel() {
      this.dialogVisible = false;
      this.$refs.ruleForm.resetFields();
      this.dynamicForm.domains = [];
      this.$refs.editor.editor.txt.clear();
    },
    change(val) {
      this.ruleForm.category = val;
    },
    getImg(val) {
      console.log(val);
      this.ruleForm.image = val;
    },
    getWangData(val) {
      this.ruleForm.descs = val;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          console.log(this);
          this.dialogVisible = false;
          this.ruleForm = {
            category: "",
            title: "",
            num: "",
            price: "",
            sellPoint: "",
            descs: "",
            image: "",
          };
          this.$refs.editor.editor.txt.clear();
          done();
        })
        .catch((_) => {});
    },
    getRulesParams(val) {
      console.log("---cid---", val);
      this.ruleForm.cid = val;
      this.$api.getRulesParams(val).then((res) => {
        console.log(res.data.result[0]);
        if (res.data.status == 200) {
          this.dynamicForm.domains = JSON.parse(res.data.result[0].paramData);
        }
      });
    },
  },

  watch: {
    editorTxt(val) {
      this.$nextTick(() => {
        this.$refs.editor.editor.txt.html(val);
      });
    },
  },
};
</script>

<style lang="less" scoped>
div {
  text-align: left;
}
</style>