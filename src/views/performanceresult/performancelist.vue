
<template>
  <div id="CustomErrorBar">
    <Header class="main-header"></Header>
    <h1 class="title">Performance Result</h1>
    <div class="content">
      <div style="background-color: #eeeeee; float: left; width: 40%">
        <p style="text-align: center; margin-top: 10px; margin-bottom: 10px">
          <font size="5">比较基线</font>
        </p>
        <el-form>
          <el-form-item label="os" label-width="120px" class="input_class">
            <el-input v-model="os_a"></el-input>
          </el-form-item>
          <el-form-item
            label="os_version"
            label-width="120px"
            class="input_class"
          >
            <el-input v-model="os_version_a"></el-input>
          </el-form-item>

          <el-form-item
            label="group_id"
            label-width="120px"
            class="input_class"
          >
            <el-input v-model="group_id_a"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div
        style="
          background-color: #eeeeee;
          float: left;
          width: 40%;
          margin-left: 20%;
        "
      >
        <p style="text-align: center; margin-top: 10px; margin-bottom: 10px">
          <font size="5">对比对象</font>
        </p>
        <el-form>
          <el-form-item label="os" label-width="120px" class="input_class">
            <el-input v-model="os_b"></el-input>
          </el-form-item>
          <el-form-item
            label="os_version"
            label-width="120px"
            class="input_class"
          >
            <el-input v-model="os_version_b"></el-input>
          </el-form-item>
          <el-form-item
            label="group_id"
            label-width="120px"
            class="input_class"
          >
            <el-input v-model="group_id_b"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="float: left; width: 100%; margin-top: 20px">
        <el-checkbox v-model="checked_unixbench">unixbench</el-checkbox>
        <el-checkbox v-model="checked_lmbench3">lmbench3</el-checkbox>
        <el-checkbox v-model="checked_libMicro">libMicro</el-checkbox>
        <el-checkbox v-model="checked_stream">stream</el-checkbox>
        <el-checkbox v-model="checked_netperf">netperf</el-checkbox>
        <el-checkbox v-model="checked_fio">fio-basic</el-checkbox>
        <el-form>
          <el-form-item class="confirm">
            <el-button @click="queryCharts">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div id="container" class="containers">
      <div
        v-for="(l_item, l_index) in unixbench_data.table_data"
        :key="l_index"
      >
        <div class="test_params">test_params: {{ l_item.test_params }}</div>
        <el-table :data="l_item.data" border style="width: 1500px">
          <el-table-column
            v-for="(item, index) in l_item.header"
            :key="index"
            :label="item"
            :prop="item"
          ></el-table-column>
        </el-table>

        <div
          :id="`average_${l_item.title.replace('.', '_')}_${l_index}`"
          :style="{ width: '100%', height: '600px' }"
        ></div>

        <div
          :id="`change_${l_item.title.replace('.', '_')}_${l_index}`"
          :style="{ width: '100%', height: '600px' }"
        ></div>
      </div>

      <div v-for="(l_item, l_index) in lmbench_data.table_data" :key="l_index">
        <div class="test_params">test_params: {{ l_item.test_params }}</div>
        <el-table :data="l_item.data" border style="width: 1500px">
          <el-table-column
            v-for="(item, index) in l_item.header"
            :key="index"
            :label="item"
            :prop="item"
          ></el-table-column>
        </el-table>

        <div
          :id="`average_${l_item.title.replace('.', '_')}_${l_index}`"
          :style="{ width: '100%', height: '600px' }"
        ></div>

        <div
          :id="`change_${l_item.title.replace('.', '_')}_${l_index}`"
          :style="{ width: '100%', height: '600px' }"
        ></div>
      </div>

      <div v-for="(t_item, t_index) in libMicro_data.table_data" :key="t_index">
        <div class="test_params">test_params: {{ t_item.test_params }}</div>
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

      <div v-for="(l_item, l_index) in netperfb_data.table_data" :key="l_index">
        <div class="test_params">test_params: {{ l_item.test_params }}</div>
        <el-table :data="l_item.data" border style="width: 1500px">
          <el-table-column
            v-for="(item, index) in l_item.header"
            :key="index"
            :label="item"
            :prop="item"
          ></el-table-column>
        </el-table>

        <div
          :id="`average_${l_item.title.replace('.', '_')}_${l_index}`"
          :style="{ width: '100%', height: '600px' }"
        ></div>

        <div
          :id="`change_${l_item.title.replace('.', '_')}_${l_index}`"
          :style="{ width: '100%', height: '600px' }"
        ></div>
      </div>

      <div v-for="(t_item, t_index) in stream_data.table_data" :key="t_index">
        <div class="test_params">test_params: {{ t_item.test_params }}</div>
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

      <div v-for="(l_item, l_index) in netperfa_data.table_data" :key="l_index">
        <div class="test_params">test_params: {{ l_item.test_params }}</div>
        <el-table :data="l_item.data" border style="width: 1500px">
          <el-table-column
            v-for="(item, index) in l_item.header"
            :key="index"
            :label="item"
            :prop="item"
          ></el-table-column>
        </el-table>

        <div
          :id="`average_${l_item.title.replace('.', '_')}_${l_index}`"
          :style="{ width: '100%', height: '600px' }"
        ></div>

        <div
          :id="`change_${l_item.title.replace('.', '_')}_${l_index}`"
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
      checked_unixbench: true,
      checked_lmbench3: true,
      checked_libMicro: true,
      checked_stream: true,
      checked_netperf: true,
      checked_fio: false,
      os_a: "openeuler",
      os_b: "openeuler",
      os_version_a: "20.03-LTS-SP1-iso",
      os_version_b: "20.03-LTS-SP2-iso",
      group_id_a: "",
      group_id_b: "",
      stream_data: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: {
            suite: ["stream"],
            group_id: [],
          },
          metrics: [
            "stream.copy_bandwidth_MBps",
            "stream.scale_bandwidth_MBps",
            "stream.add_bandwidth_MBps",
            "stream.triad_bandwidth_MBps",
          ],
          series: [
            { os: "openeuler", os_version: "21.09-iso" },
            { os: "openeuler", os_version: "21.03-iso" },
          ],
          x_params: ["metric"],
        },
      },
      lmbench_data: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: { suite: ["lmbench3"], group_id: [] },
          metrics: [],
          series: [
            { os: "openeuler", os_version: "21.09-iso" },
            { os: "openeuler", os_version: "21.03-iso" },
          ],
          x_params: ["metric"],
        },
      },
      libMicro_data: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: { suite: ["libMicro"], group_id: [] },
          metrics: [],
          series: [
            { os: "openeuler", os_version: "21.09-iso" },
            { os: "openeuler", os_version: "21.03-iso" },
          ],
          x_params: ["metric"],
        },
      },
      unixbench_data: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: { suite: ["unixbench"], group_id: [] },
          metrics: [],
          series: [
            { os: "openeuler", os_version: "21.09-iso" },
            { os: "openeuler", os_version: "21.03-iso" },
          ],
          x_params: ["metric"],
        },
      },
      netperfa_data: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: { suite: ["netperf"], group_id: [] },
          metrics: ["netperf.Throughput_Mbps"],
          series: [
            { os: "openeuler", os_version: "21.09-iso" },
            { os: "openeuler", os_version: "21.03-iso" },
          ],
          x_params: ["send_size"],
        },
      },
      netperfb_data: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: {
            suite: ["netperf"],
            group_id: [],
            "pp.netperf.test": ["TCP_RR", "TCP_CRR", "UDP_CRR"],
          },
          metrics: ["netperf.Throughput_tps"],
          series: [
            { os: "openeuler", os_version: "21.09-iso" },
            { os: "openeuler", os_version: "21.03-iso" },
          ],
          x_params: ["test"],
        },
      },
    };
  },
  methods: {
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
    clean_data() {
      this.stream_data.table_data = [];
      this.stream_data.echart_data = [];

      this.lmbench_data.table_data = [];
      this.lmbench_data.echart_data = [];

      this.libMicro_data.table_data = [];
      this.libMicro_data.echart_data = [];

      this.unixbench_data.table_data = [];
      this.unixbench_data.echart_data = [];

      this.netperfa_data.table_data = [];
      this.netperfa_data.echart_data = [];

      this.netperfb_data.table_data = [];
      this.netperfb_data.echart_data = [];
    },
    getTableData(sData, table_data) {
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
      table_data.push({
        header: tHeader,
        data: tData,
        title: sData.title,
        test_params: sData.test_params,
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
    getData(JobData) {
      getPerformanceResult(JobData.QueryData).then((res) => {
        console.log(res);
        JobData.echart_data = res;
        var sourceData = res;

        for (var i = 0; i < sourceData.length; i++) {
          this.getTableData(sourceData[i], JobData.table_data);
        }
        this.sleep(500).then(() => {
          this.get_Echarts(JobData.echart_data);
        });
      });
    },
    sleep(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    },
    get_Echarts(echart_data) {
      for (var i = 0; i < echart_data.length; i++) {
        this.getEchart(i, echart_data);
      }
    },
    getEchart(index, echart_data) {
      this.sleep(200 * index).then(() => {
        var echart_title = echart_data[index].title;

        this.drawEchart(
          echart_title,
          index,
          "average",
          "line",
          echart_data[index].datas.average
        );

        this.drawEchart(
          echart_title,
          index,
          "change",
          "bar",
          echart_data[index].datas.change
        );
      });
    },
    drawEchart(echart_title, index, data_type, echart_type, e_data) {
      var echart_id =
        data_type + "_" + echart_title.replace(".", "_") + "_" + index;
      console.log(echart_id);
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
    queryCharts() {
      this.lmbench_data.QueryData.series[0].os = this.os_a;
      this.lmbench_data.QueryData.series[0].os_version = this.os_version_a;
      this.lmbench_data.QueryData.series[1].os = this.os_b;
      this.lmbench_data.QueryData.series[1].os_version = this.os_version_b;

      this.unixbench_data.QueryData.series[0].os = this.os_a;
      this.unixbench_data.QueryData.series[0].os_version = this.os_version_a;
      this.unixbench_data.QueryData.series[1].os = this.os_b;
      this.unixbench_data.QueryData.series[1].os_version = this.os_version_b;

      this.libMicro_data.QueryData.series[0].os = this.os_a;
      this.libMicro_data.QueryData.series[0].os_version = this.os_version_a;
      this.libMicro_data.QueryData.series[1].os = this.os_b;
      this.libMicro_data.QueryData.series[1].os_version = this.os_version_b;

      this.stream_data.QueryData.series[0].os = this.os_a;
      this.stream_data.QueryData.series[0].os_version = this.os_version_a;
      this.stream_data.QueryData.series[1].os = this.os_b;
      this.stream_data.QueryData.series[1].os_version = this.os_version_b;

      this.netperfa_data.QueryData.series[0].os = this.os_a;
      this.netperfa_data.QueryData.series[0].os_version = this.os_version_a;
      this.netperfa_data.QueryData.series[1].os = this.os_b;
      this.netperfa_data.QueryData.series[1].os_version = this.os_version_b;

      this.netperfb_data.QueryData.series[0].os = this.os_a;
      this.netperfb_data.QueryData.series[0].os_version = this.os_version_a;
      this.netperfb_data.QueryData.series[1].os = this.os_b;
      this.netperfb_data.QueryData.series[1].os_version = this.os_version_b;

      if (this.group_id_a == "" || this.group_id_b == "") {
        this.lmbench_data.QueryData.filter.group_id = [];
        this.unixbench_data.QueryData.filter.group_id = [];
        this.libMicro_data.QueryData.filter.group_id = [];
        this.stream_data.QueryData.filter.group_id = [];
        this.netperfa_data.QueryData.filter.group_id = [];
        this.netperfb_data.QueryData.filter.group_id = [];
      } else {
        this.lmbench_data.QueryData.filter.group_id[0] = this.group_id_a;
        this.lmbench_data.QueryData.filter.group_id[1] = this.group_id_b;
        this.unixbench_data.QueryData.filter.group_id[0] = this.group_id_a;
        this.unixbench_data.QueryData.filter.group_id[1] = this.group_id_b;
        this.libMicro_data.QueryData.filter.group_id[0] = this.group_id_a;
        this.libMicro_data.QueryData.filter.group_id[1] = this.group_id_b;
        this.stream_data.QueryData.filter.group_id[0] = this.group_id_a;
        this.stream_data.QueryData.filter.group_id[1] = this.group_id_b;
        this.netperfa_data.QueryData.filter.group_id[0] = this.group_id_a;
        this.netperfa_data.QueryData.filter.group_id[1] = this.group_id_b;
        this.netperfb_data.QueryData.filter.group_id[0] = this.group_id_a;
        this.netperfb_data.QueryData.filter.group_id[1] = this.group_id_b;
      }

      this.clean_data();
      if (this.checked_lmbench3) {
        this.getData(this.lmbench_data);
      }
      if (this.checked_unixbench) {
        this.getData(this.unixbench_data);
      }
      if (this.checked_libMicro) {
        this.getData(this.libMicro_data);
      }
      if (this.checked_stream) {
        this.getData(this.stream_data);
      }
      if (this.checked_netperf) {
        this.sleep(100).then(() => {
          this.getData(this.netperfa_data);
          this.getData(this.netperfb_data);
        });
      }
    },
  },
  mounted() {
    if (this.checked_lmbench3) {
      this.getData(this.lmbench_data);
    }
    if (this.checked_unixbench) {
      this.getData(this.unixbench_data);
    }
    if (this.checked_libMicro) {
      this.getData(this.libMicro_data);
    }
    if (this.checked_stream) {
      this.getData(this.stream_data);
    }
    if (this.checked_netperf) {
      this.sleep(100).then(() => {
        this.getData(this.netperfa_data);
        this.getData(this.netperfb_data);
      });
    }
  },
};
</script>

<style lang='less' scoped>
.input_class {
  width: 85%;
}
.confirm {
  float: left;
  margin-left: 90%;
  //  margin-top: 20px;
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
  margin-top: 400px;
}
.chart {
  width: 1000px;
  height: 720px;
  margin-bottom: 10px;
}
.test-params {
  margin-left: 100px;
  margin-bottom: 20px;
}
</style>