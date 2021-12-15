<template>
  <div>
    <div class="title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/params' }"
          >规格参数</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/params/specs' }"
          >规格与包装</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="search">
      <el-input v-model="iptVal" placeholder="请输入内容"></el-input>
      <div class="button">
        <el-button type="primary" size="small" @click="search">查 询</el-button>
        <el-button type="primary" size="small" @click="add">添加</el-button>
      </div>
    </div>

    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        prop="id"
        label="规格参数ID"
        width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="itemCatId"
        label="类目ID"
        width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="specsName" label="规格名称" width="90">
      </el-table-column>
      <el-table-column prop="paramData" label="规格参数" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button
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

    <Pagination
      class="page"
      :pageSize="pageSize"
      :total="total"
      :page="page"
      @changePage="changePage"
    />

    <DialogParams ref='outerDialog' />
  </div>
</template>

<script>
import Pagination from "../../../../../components/pagination.vue";
import DialogParams from "./dialogParams.vue";
export default {
  components: {
    Pagination,
    DialogParams,
  },
  data() {
    return {
      tableData: [],
      pageSize: 0,
      total: 0,
      page: 1,
      iptVal: "",
      isSearch: false,
    };
  },
  methods: {
    getParams(page) {
      this.isSearch = false;
      this.$api.getParams(page).then((res) => {
        this.pageSize = res.data.pageSize;
        this.total = res.data.total;
        this.tableData = res.data.data;
      });
    },
    changePage(val) {
      this.page = val;
      if (this.isSearch) {
        this.search(this.page);
      } else {
        this.getParams(this.page);
      }
    },
    search() {
      if (this.iptVal !== "") {
        this.isSearch = true;
        this.$api.searchParams(this.iptVal).then((res) => {
          this.page = 1;
          this.tableData = res.data.result;
          this.total = this.tableData.length;
        });
      }
    },
    handleDelete(index, row) {
      this.$api.delParams(row.id).then((res) => {
        this.getParams(1);
      });
    },

    add() {
      this.$refs.outerDialog.dialogVisible = true;
    },
  },
  created() {
    this.getParams(1);
  },
  watch: {
    iptVal() {
      if (this.iptVal === "") {
        this.page = 1;
        this.getParams(1);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  padding: 10px 20px;
  background-color: #fff;
  margin-bottom: 20px;
}
.search {
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
}
</style>