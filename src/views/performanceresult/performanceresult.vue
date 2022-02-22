
<template>
  <div id="CustomErrorBar">
    <Header class="main-header"></Header>
    <h1 class="title">Performance Result</h1>
    <div class="content">
      <el-form :model="QueryData">
        <el-form-item label="Filter" label-width="80px" class="input_class">
          <el-input
            v-model="filter"
            placeholder="eg: suite:fio-basic;os_arch:aarch64,x86;"
          ></el-input>
        </el-form-item>
        <el-form-item label="series" label-width="80px" class="input_class">
          <el-input
            v-model="series"
            placeholder="eg: os:openeuler,os_version:20.03;os:debian,os_version:sid;"
          ></el-input>
        </el-form-item>
        <el-form-item label="metrics" label-width="80px" class="input_class">
          <el-input
            v-model="metrics"
            placeholder="eg: iperf.tcp.sender.dps"
          ></el-input>
        </el-form-item>
        <el-form-item label="x_params" label-width="80px" class="input_class">
          <el-input v-model="x_params" placeholder="eg: test_size"></el-input>
        </el-form-item>

        <el-form-item class="confirm">
          <el-button @click="getTable">确定</el-button>
        </el-form-item>
        <el-form-item class="example">
          <el-button @click="showExample">Example</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div id="container" class="containers">
      <div v-for="(t_item, t_index) in table_data" :key="t_index">
        <el-table :data="t_item.data" border style="width: 1500px">
          <el-table-column
            v-for="(item, index) in t_item.header"
            :key="index"
            :label="item"
            :prop="item"
          ></el-table-column>
        </el-table>

        <div
          :id="`average_${t_item.title.replace('.', '_')}_${t_index}`"
          :style="{ width: '100%', height: '600px' }"
        ></div>

        <div
          :id="`change_${t_item.title.replace('.', '_')}_${t_index}`"
          :style="{ width: '100%', height: '600px' }"
        ></div>
      </div>
    </div>
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
        x_params: [],
      },
      table_data: [],
      echart_data: [],
    };
  },
  methods: {
    getQueryData() {
      var tmp = this.filter.split(" ").join("").split(";");
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

      if (this.metrics == "") {
        this.QueryData.metrics = [];
      } else {
        this.QueryData.metrics = this.metrics.split(" ").join("").split(";");
      }
      this.QueryData.x_params = this.x_params.split(" ").join("").split(";");

      tmp = this.series.split(" ").join("").split(";");
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
          dataArray[i] - (dataArray[i] * deviationArray[i]) / 100,
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
        fill: null,
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
              y2: highPoint[1],
            },
            style: style,
          },
          {
            type: "line",
            transition: ["shape"],
            shape: {
              x1: highPoint[0],
              y1: highPoint[1],
              x2: lowPoint[0],
              y2: lowPoint[1],
            },
            style: style,
          },
          {
            type: "line",
            transition: ["shape"],
            shape: {
              x1: lowPoint[0] - halfWidth,
              y1: lowPoint[1],
              x2: lowPoint[0] + halfWidth,
              y2: lowPoint[1],
            },
            style: style,
          },
        ],
      };
    },
    renderSeries(sourceData, echart_type) {
      //描绘折线图+方差图所需的参数
      var series = [];
      for (var j = 0; j < sourceData.length; j++) {
        var objLine = {
          name: sourceData[j].series,
          type: echart_type,
          data: sourceData[j].data,
        };
        var objCustom = {
          type: "custom",
          itemStyle: {
            normal: {
              borderWidth: 1.5,
              borderType: "dotted",
            },
          },
          z: 100,
        };

        series.push(objLine);
        series.push(objCustom);
      }

      return series;
    },
    getSeriesNames(sourceData) {
      var s_names = [];
      for (var i = 0; i < sourceData.length; i++) {
        s_names[i] = sourceData[i].series;
      }
      return s_names;
    },
    echart_clean() {
      var container = document.getElementById("container");
      for (var i = container.children.length - 1; i >= 0; i--) {
        container.removeChild(container.children[i]);
      }
      this.table_data = [];
    },
    getTableData(sData) {
      var avg_data = sData.datas.average;
      var change_data = sData.datas.change;
      var tData = [];
      var tHeader = [];

      tHeader.push(sData.title);
      tHeader = tHeader.concat(avg_data[0].x_params);
      for (var i = 0; i < avg_data.length; i++) {
        var tmp = this.getRowData(sData.title, avg_data[i]);
        tData.push(tmp);
      }

      for (i = 0; i < change_data.length; i++) {
        tmp = this.getRowData(sData.title, change_data[i]);
        tData.push(tmp);
      }
      this.table_data.push({
        header: tHeader,
        data: tData,
        title: sData.title,
      });
    },
    getRowData(title, data) {
      var tmp = {};
      tmp[title] = data.series;

      for (var i = 0; i < data.x_params.length; i++) {
        tmp[data.x_params[i]] = data.data[i];
      }
      return tmp;
    },
    getTable() {
      this.getQueryData();
      if (this.QueryData) {
        getPerformanceResult(this.QueryData).then((res) => {
          this.echart_data = res;
          var sourceData = res;

          for (var i = 0; i < sourceData.length; i++) {
            this.getTableData(sourceData[i]);
          }
          this.sleep(100).then(() => {
            this.get_Echarts();
          });
        });
      }
    },
    sleep(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    },
    get_Echarts() {
      for (var i = 0; i < this.echart_data.length; i++) {
        var echart_title = this.echart_data[i].title;

        this.drawEchart(
          echart_title,
          i,
          "average",
          "line",
          this.echart_data[i].datas.average
        );

        this.drawEchart(
          echart_title,
          i,
          "change",
          "bar",
          this.echart_data[i].datas.change
        );
      }
    },
    drawEchart(echart_title,index, data_type, echart_type, e_data) {
      var echart_id = data_type + "_" + echart_title.replace(".", "_") + '_' + index;
      var myChart = echarts.init(document.getElementById(echart_id));

      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },

          formatter(params) {
            var res = "<p>x_value: " + params[0].name + "</p>";
            var s_name;
            var average;
            var tmp;

            for (var i = 0; i < params.length; i++) {
              s_name = "<p>" + params[i].seriesName + "</p>";
              tmp = params[i].data.toFixed(4);
              average = "<p>" + data_type + ":" + tmp + "</p>";
              res += "</br>" + s_name + average;
            }
            return res;
          },
        },
        title: {
          text: echart_title,
        },
        legend: {
          data: this.getSeriesNames(e_data),
        },
        xAxis: {
          data: e_data[0].x_params,
        },
        yAxis: {},

        grid: {
          left: "15%",
        },
      };
      var series = this.renderSeries(e_data, echart_type);
      option.series = series;
      option && myChart.setOption(option, true); //绘图
    },
    showExample() {
      this.filter = "suite:netperf;pp.netperf.test:TCP_STREAM;tbox_group:vm-2p8g;";
      this.series = "os:centos;os:openeuler;";
      this.metrics = "netperf.workload";
      this.x_params = "send_size";
    },
  },
  mounted() {},
};
</script>

<style lang='less' scoped>
.input_class {
  width: 35%;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
}
.confirm {
  position: absolute;
  top: 390px;
  left: 800px;
  @media screen and (max-width: 1000px) {
    display: none;
  }
}
.example {
  position: absolute;
  top: 390px;
  left: 1000px;
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
  width: 1000px;
  height: 720px;
  margin-bottom: 10px;
}
</style>
