<template>
  <div>
    <el-tree :props="props" :load="loadNode" lazy @current-change="select">
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: "name",
        // children: "zones",
        // isLeaf: "leaf",
      },
      selResult: "",
      cid:''
    };
  },
  methods: {
    loadNode(node, resolve) {
      console.log(node);

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
    select(node) {
      console.log('---node---',node);
      this.selResult = node.name;
      this.$emit('getRulesParams',node.cid);
    },
  },
};
</script>

<style>
</style>