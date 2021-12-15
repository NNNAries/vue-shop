<template>
  <div>
    <div class="search">
      <el-input v-model="iptVal" placeholder="请输入内容"></el-input>
      <div class="button">
        <el-button type="primary" size="small" @click="search">查 询</el-button>
        <el-button type="primary" size="small" @click="dialogAdd"
          >模态框添加</el-button
        >
        <el-button type="primary" size="small">
          <router-link to="/addGoods">添 加</router-link>
        </el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        prop="id"
        label="商品ID"
        width="70"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="title"
        label="商品名称"
        width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="90">
      </el-table-column>
      <el-table-column prop="num" label="商品数量" width="90">
      </el-table-column>
      <el-table-column prop="category" label="规格类目" width="100">
      </el-table-column>
      <el-table-column
        prop="image"
        label="商品图片"
        width="180"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="sellPoint" label="商品卖点" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="descs" label="商品描述" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="btns">
      <el-button type="primary" size="small" @click="allSel">全 选</el-button>
      <el-button type="primary" size="small" @click="reverseSel"
        >反 选</el-button
      >
      <el-button type="primary" size="small" @click="batchDel"
        >批量删除</el-button
      >
    </div>

    <Pagination
      class="page"
      :pageSize="pageSize"
      :total="total"
      :page="page"
      @changePage="changePage"
    />
    <GoodsDialog ref="dialog" :fun="getData" />
  </div>
</template>

<script>
import Pagination from "../../../../components/pagination.vue";
import GoodsDialog from "./goodsDialog.vue";
export default {
  components: {
    Pagination,
    GoodsDialog,
  },
  data() {
    return {
      iptVal: "",
      tableData: [],
      pageSize: 0,
      total: 0,
      page: 1,
      editorTxt: "",
    };
  },
  methods: {
    handleDelete(index, row) {
      this.$api.delGoods(row.id);
      this.getData(1);
    },
    handleEdit(index, row) {
      console.log(row);
      this.$refs.dialog.ruleForm = row;
      this.$refs.dialog.dialogVisible = true;
      this.$refs.dialog.editorTxt = row.descs;
      this.$refs.dialog.title = "编辑商品";
      console.log(row.paramsInfo);
      if (row.paramsInfo !== "") {
        this.$refs.dialog.dynamicForm.domains = JSON.parse(row.paramsInfo);
      }

      this.$api.searchParams(row.cid).then((res) => {
        console.log(res.data);
      });
    },
    changePage(val) {
      this.page = val;
      this.getData(this.page);
    },
    getData(page) {
      this.$api.getGoods(page).then((res) => {
        this.tableData = res.data.data;
        this.pageSize = res.data.pageSize;
        this.total = res.data.total;
      });
    },
    search() {
      this.$api.getSearch(this.iptVal).then((res) => {
        this.tableData = res.data.result;
        this.total = res.data.result.length;
      });
    },
    dialogAdd() {
      this.$refs.dialog._data.dialogVisible = true;
      this.$refs.dialog.title = "添加商品";
    },
    allSel() {
      console.log(this);
    },
    reverseSel() {
      console.log(this);
    },
    batchDel() {
      console.log(this);
    },
  },
  created() {
    this.getData(this.page);
  },
  watch: {
    iptVal() {
      if (this.iptVal === "") {
        this.getData(this.page);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 10px;
  display: flex;
}
.el-input {
  flex: 1;
}
.button {
  float: right;
  margin-top: 4px;
}
.el-button {
  margin-left: 21px;
  /deep/ a {
    color: #fff;
  }
}
.el-table {
  margin-top: 30px;
}
/deep/ .cell {
  font-size: 14px;
}
.page {
  margin-top: 20px;
  margin-bottom: 40px;
}
.btns {
  text-align: left;

  .el-button {
    margin: 10px 20px 0 0;
  }
}
</style>