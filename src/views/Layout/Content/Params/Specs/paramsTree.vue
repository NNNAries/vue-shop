<template>
  <div>
    <el-tree :props="props" :load="loadNode" lazy @node-click="select">
    </el-tree>
  </div>
</template>

<script>
export default {
  props: ["isDisabled"],
  data() {
    return {
      props: {
        label: "name",
      },
    };
  },
  methods: {
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.$api.getCategory().then((res) => {
          console.log(res.data);
          return resolve(res.data.result);
        });
      }
      if (node.level >= 1) {
        this.$api.getCategory(node.data.cid).then((res) => {
          console.log(res.data);
          if (res.data.status == 200) {
            return resolve(res.data.result);
          } else if (res.data.status == 500) {
            return resolve([]);
          }
        });
      }
    },
    select(obj, node, self) {
      console.log(obj, node, self);
      this.$emit('change',obj);
    },
  },
};
</script>

<style lang="less" scoped>
</style>