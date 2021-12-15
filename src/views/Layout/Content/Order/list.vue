<template>
  <div>
    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/order' }">订单管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/order/order-list' }"
        >订单列表</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="订单号">
          <el-input
            v-model="formInline.orderId"
            placeholder="订单号"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input
            v-model="formInline.goodsName"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="success" @click="onSubmit">管理</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- address: "台湾/新界/鹤城区"
      created: "2014-03-24-06-52-57"
      id: 300
      num: 91
      time: "2021-12-12"
      title: "行没实队复多委很适运走温身车没空色象参"
      user: Object
      avator: "http://dummyimage.com/200x100/4A7BF7"
      isvip: 1
      level: 2
      name: "毛杰" -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="ID" width="70" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="title"
        label="商品名称"
        width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="num" label="购买数量" width="90">
      </el-table-column>
      <el-table-column prop="user.name" label="购买人" width="90">
      </el-table-column>
      <el-table-column prop="address" label="收货地址" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="time" label="购买日期" show-overflow-tooltip>
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

    <Pagination
      class="page"
      :pageSize="pageSize"
      :total="total"
      :page="page"
      @changePage="changePage"
    />
  </div>
</template>

<script>
import Pagination from "../../../../components/pagination.vue";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      formInline: {
        orderId: "",
        region: "",
        goodsName: "",
      },
      tableData: [],
      pageSize: 0,
      total: 0,
      page: 1,
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    changePage(val) {
      this.page = val;
      this.getOrderList(this.page);
    },
    getOrderList(page) {
      this.$api.getOrderList(page).then((res) => {
        console.log(res.data);
        this.total = res.data.total * 10;
        let list = res.data.data.list;
        this.tableData = res.data.data.list;
        this.pageSize = 10;
      });
    },
  },
  created() {
    this.getOrderList(1);
  },
};
</script>

<style lang="less" scoped>
.title {
  padding: 10px 20px;
  background-color: #fff;
}
.search {
  text-align: left;
  margin: 10px 0;
}
/deep/ .cell {
  font-size: 14px;
}
</style>