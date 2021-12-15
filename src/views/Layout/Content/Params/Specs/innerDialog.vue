<template>
  <div>
    <el-dialog
      width="45%"
      title="商品规格参数配置"
      :visible.sync="innerVisible"
      append-to-body
    >
      <div class="content">
        <p class="current">
          当前选中的商品：<span>{{ name }}</span>
        </p>
        <el-button @click="addDomain">新增规格列表</el-button>
        <hr />
        <el-form
          :model="dynamicForm"
          ref="dynamicForm"
          label-width="100px"
          class="demo-dynamic"
        >
          <!-- 第一层遍历数据结构 -->
          <el-form-item
            v-for="(item, index) in dynamicForm.domains"
            :label="item.title"
            :key="index"
          >
            <div class="list">
              <el-input v-model="item.value"></el-input>
              <el-button @click.prevent="addChildGroup(index)"
                >增加子组</el-button
              >
              <el-button @click.prevent="removeDomain(item)">删除</el-button>
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
                <el-button @click.prevent="removeChildDomain(index, ele)"
                  >删除</el-button
                >
              </div>
            </el-form-item>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="add">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    cid: {
      type: String | Number,
      default: "",
    },
  },
  data() {
    return {
      innerVisible: false,
      dynamicForm: {
        domains: [],
      },
    };
  },
  methods: {
    resetForm() {
      this.dynamicForm.domains = [];
    },
    removeDomain(item) {
      var index = this.dynamicForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicForm.domains.splice(index, 1);
      }
    },
    // 删除子组
    removeChildDomain(index, ele) {
      console.log("index,ele", index, ele);
      var eleIndex = this.dynamicForm.domains[index].children.indexOf(ele);
      if (eleIndex !== -1) {
        this.dynamicForm.domains[index].children.splice(eleIndex, 1);
      }
    },
    addDomain() {
      this.dynamicForm.domains.push({
        value: "",
        title: "",
        children: [],
      });
    },
    // 增加子组
    addChildGroup(index) {
      console.log("---index---", index);
      this.dynamicForm.domains[index].children.push({
        value: "",
        title: "",
      });
    },
    cancel() {
      this.innerVisible = false;
    },
    // 确定--添加规格参数
    add() {
      let params = {
        itemCatId: this.cid,
        content: JSON.stringify(this.dynamicForm.domains),
        specsName: this.name,
      };
      this.$api.addParams(params).then((res) => {
        console.log(res.data);
        this.innerVisible = false;
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  .current {
    font-size: 12px;
    margin-bottom: 10px;
  }
  .list {
    display: flex;
    .el-input {
      margin-right: 20px;
    }
  }
  .childGroup {
    margin-left: 50px;
  }
}
</style>