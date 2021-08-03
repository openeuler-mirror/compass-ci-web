
<template>
  <div id="CustomErrorBar">
    <Header class="main-header"></Header>
    <h1 class="title">Performance Result</h1>
    <div class="content">
      <el-form :model="QueryData">
        <el-form-item label="Filter" class="input_class">
          <el-input v-model="filter" placeholder="eg: suite:fio-basic;os_arch:aarch64,x86;"></el-input>
        </el-form-item>
        <el-form-item label="series" class="input_class">
          <el-input
            v-model="series"
            placeholder="eg: os:openeuler,os_version:20.03;os:debian,os_version:sid;"
          ></el-input>
        </el-form-item>
        <el-form-item label="metrics" class="input_class">
          <el-input v-model="metrics" placeholder="eg: iperf.tcp.sender.dps"></el-input>
        </el-form-item>
        <el-form-item label="x_params" class="input_class">
          <el-input v-model="x_params" placeholder="eg: test_size"></el-input>
        </el-form-item>

        <el-form-item class="confirm">
          <el-button @click="getEcharts">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div id="container" class="containers"></div>
  </div>
</template>

<script>
import { getPerformanceResult } from "@/api/jobs.js";
import Header from "@/components/Header";
import echarts from "echarts";
export default {
  name: "CustomErrorBar",
  components: { Header },
  data() {
    return {
      inputvalue: "",
      filter: "",
      series: "",
      metrics: "",
      x_params: "",
      QueryData: {
        filter: {},
        metrics: [],
        series: [],
        x_params: []
      }
    };
  },
  methods: {
    getQueryData() {
      var tmp = this.filter
        .split(" ")
        .join("")
        .split(";");
      var tmp1;
      var tmp2;
      this.QueryData.filter = {};
      for (var i = 0; i < tmp.length; i++) {
        if (tmp[i] == "") continue;

        tmp1 = tmp[i].split(":");
        this.QueryData.filter[tmp1[0]] = [];
        tmp2 = tmp1[1].split(",");

        for (var j = 0; j < tmp2.length; j++) {
          this.QueryData.filter[tmp1[0]][j] = tmp2[j];
        }
      }

      this.QueryData.metrics = this.metrics
        .split(" ")
        .join("")
        .split(";");
      this.QueryData.x_params = this.x_params
        .split(" ")
        .join("")
        .split(";");

      tmp = this.series
        .split(" ")
        .join("")
        .split(";");
      this.QueryData.series = [];
      for (i = 0; i < tmp.length; i++) {
        if (tmp[i] == "") continue;

        this.QueryData.series[i] = {};
        tmp1 = tmp[i].split(",");
        for (j = 0; j < tmp1.length; j++) {
          tmp2 = tmp1[j].split(":");
          this.QueryData.series[i][tmp2[0]] = tmp2[1];
        }
      }
    },
    renderDeviationAreaArray(dataArray, deviationArray) {
      //用于生成方差区域的数组
      var deviationAreaArray = [];
      var len = dataArray.length;
      for (var i = 0; i < len; i++) {
        deviationAreaArray.push([
          i,
          dataArray[i] + (dataArray[i] * deviationArray[i]) / 100,
          dataArray[i] - (dataArray[i] * deviationArray[i]) / 100
        ]); //[x坐标序号,最大值，最小值]
      }
      return deviationAreaArray;
    },
    renderItem(_params, api) {
      //生成描绘方差图所需的参数
      var xValue = api.value(0);
      var highPoint = api.coord([xValue, api.value(1)]);
      var lowPoint = api.coord([xValue, api.value(2)]);
      var halfWidth = api.size([1, 0])[0] * 0.1;
      var style = api.style({
        stroke: api.visual("color"),
        fill: null
      });

      return {
        type: "group",
        children: [
          {
            type: "line",
            transition: ["shape"],
            shape: {
              x1: highPoint[0] - halfWidth,
              y1: highPoint[1],
              x2: highPoint[0] + halfWidth,
              y2: highPoint[1]
            },
            style: style
          },
          {
            type: "line",
            transition: ["shape"],
            shape: {
              x1: highPoint[0],
              y1: highPoint[1],
              x2: lowPoint[0],
              y2: lowPoint[1]
            },
            style: style
          },
          {
            type: "line",
            transition: ["shape"],
            shape: {
              x1: lowPoint[0] - halfWidth,
              y1: lowPoint[1],
              x2: lowPoint[0] + halfWidth,
              y2: lowPoint[1]
            },
            style: style
          }
        ]
      };
    },
    renderSeries(sourceData) {
      //描绘折线图+方差图所需的参数
      var series = [];
      for (var j = 0; j < sourceData.datas.length; j++) {
        var objLine = {
          type: "line",
          data: sourceData.datas[j].data,
          itemStyle: {
            color: "#77bef7"
          }
        };
        var objCustom = {
          type: "custom",
          itemStyle: {
            normal: {
              borderWidth: 1.5
            }
          },
          renderItem: this.renderItem,
          data: this.renderDeviationAreaArray(
            sourceData.datas[j].data,
            sourceData.datas[j].deviation
          ), //返回方差数组
          z: 100
        };

        series.push(objLine);
        series.push(objCustom);
      }

      return series;
    },
    getEcharts() {
      var container = document.getElementById("container");
      this.getQueryData();
      if (this.QueryData) {
        getPerformanceResult(this.QueryData).then(res => {
          var sourceData = res;
          for (var i = 0; i < sourceData.length; i++) {
            var el = document.createElement("div");
            el.id = "chart" + i;
            el.className = "chart";
            el.style = "width:700px;height:720px;";
            container.appendChild(el);
            var myChart = echarts.init(document.getElementById("chart" + i));

            var option = {
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "shadow"
                },

                formatter(params) {
                  var res = "<p>runtime:" + params[0].name + "</p>";
                  var average1 = "<p>" + "average:" + params[0].data + "</p>";
                  var deviation1 =
                    "<p>" + "deviation:" + params[1].data[1] + "</p>" + "</br>";
                  var average2 = "<p>" + "average:" + params[2].data + "</p>";
                  var deviation2 =
                    "<p>" + "deviation:" + params[3].data[1] + "</p>";
                  return res + average1 + deviation1 + average2 + deviation2;
                }
              },
              title: {
                text: sourceData[i].title
              },

              xAxis: {
                data: sourceData[i].datas[0].x_params
              },
              yAxis: {},

              grid: {
                left: "15%"
              }
            };
            var series = this.renderSeries(sourceData[i]);
            option.series = series;
            option && myChart.setOption(option); //绘图
          }
        });
      }
    }
  },
  mounted() {}
};
</script>

<style lang='scss' scoped>
.input_class {
  width: 30%;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
}
.confirm {
  position: absolute;
  top: 550px;
  left: 750px;
  @media screen and (max-width: 1000px) {
    display: none;
  }
}
.containers {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}
.chart {
  width: 700px;
  height: 720px;
  margin-bottom: 10px;
}
</style>