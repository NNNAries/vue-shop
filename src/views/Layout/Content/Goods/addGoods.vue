<template>
  <div>
    <div class="title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/goods' }"
          >商品管理</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/addGoods' }"
          >添加商品</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>

    <!-- 表单部分 -->
    <div class="myform">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="选择类目" prop="category">
          <el-button type="primary">类目名称</el-button>
        </el-form-item>
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="num">
          <el-input v-model="ruleForm.num"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品卖点">
          <el-input v-model="ruleForm.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input type="textarea" v-model="ruleForm.descs"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确定</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        category: "",
        title: "",
        num: "",
        price: "",
        sellPoint: "",
        descs: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        num: [{ required: true, message: "请选择活动区域", trigger: "change" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  padding: 10px 20px;
  background-color: #fff;
}
.myform {
  margin-top: 20px;
  padding: 10px;
  background-color: #fff;
  text-align: left;
}
</style>