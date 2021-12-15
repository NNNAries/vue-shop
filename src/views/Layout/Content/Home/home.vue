<template>
  <div>
    <div class="count">
      <div class="item" v-for="item in list" :key="item.id">
        <p class="title">{{ item.title }}</p>
        <h2 class="total">{{ item.total | num }}</h2>
        <hr color="#fff" />
        <p class="current">
          今日销售额：<span>{{ item.current }}</span>
        </p>
      </div>
    </div>
    <div id="main" style="width: 800px; height: 400px"></div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    createChart(id, xAxis, legend, series) {
      var myChart = this.$echarts.init(document.getElementById(id));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "月销售额",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: legend,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: xAxis,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series,
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
  filters:{
    num(val){
      return val.toLocaleString();
    }
  },
  mounted() {
    this.$api.getSellInfo().then((res) => {
      this.list = res.data.list;
    });
    this.$api.getCompareInfo().then((res) => {
      console.log("比较信息", res.data);
      let xAxis = res.data.info.date;
      let data = res.data.info.xResult;
      let legend = [];
      for (let i = 0; i < data.length; i++) {
        legend.push(data[i].xName);
      }
      console.log("legend", legend);
      let series = [];
      for (let i = 0; i < data.length; i++) {
        let obj = {
          type: "line",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          smooth: true,
        };
        obj.name = data[i].xName;
        let arr = data[i].data;
        let value = [];
        for (let j = 0; j < arr.length; j++) {
          value.push(arr[j].num);
        }
        obj.data = value;
        series.push(obj);
      }
      this.createChart("main", xAxis, legend, series);
    });
  },
};
</script>

<style lang="less" scoped>
#main {
  background-color: #fff;
  padding: 20px;
}
.count {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;

  .item {
    width: 230px;
    height: 80px;
    background-color: palegoldenrod;
    border-radius: 10px;
    padding: 10px 0;
    text-align: left;
    color: #fff;

    .title {
      font-size: 12px;
      padding-left: 10px;
      font-weight: 700;
      margin-bottom: 5px;
    }
    .total {
      font-size: 20px;
      padding-left: 20px;
    }
    .current {
      font-size: 12px;
      padding-left: 10px;
    }
  }
  .item:nth-child(1) {
    background-color: rgb(221, 125, 86);
  }
  .item:nth-child(2) {
    background-color: rgb(89, 131, 223);
  }
  .item:nth-child(3) {
    background-color: rgb(180, 101, 196);
  }
  .item:nth-child(4) {
    background-color: rgb(11, 172, 236);
  }
}
</style>