
<template>
  <div id="CustomErrorBar">
    <Header class="main-header"></Header>
    <h1 class="title">Performance Result</h1>
    <div class="content">
      <div
        style="
          background-color: #eeeeee;
          float: left;
          width: 30%;
          margin-left: 10%;
        "
      >
        <p style="text-align: center; margin-top: 10px; margin-bottom: 10px">
          <font size="5">比较基线</font>
        </p>
        <el-form>
          <el-form-item label="os" label-width="120px" class="input_class">
            <el-select
              v-model="os_a"
              filterable
              placeholder="请选择"
              size="medium"
              clearable
              @change="selectChangeVersiona"
            >
              <el-option
                v-for="item in osData"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="os_version"
            label-width="120px"
            class="input_class"
          >
            <el-select
              v-model="os_version_a"
              filterable
              placeholder="请选择"
              size="medium"
              clearable
              @change="getSelectGroupa"
            >
              <el-option
                v-for="item in versionData_a"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="group_id"
            label-width="120px"
            class="input_class"
          >
            <el-select
              v-model="group_id_a"
              filterable
              placeholder="请选择"
              size="medium"
              clearable
            >
              <el-option
                v-for="item in groupData_a"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <div
        style="
          background-color: #eeeeee;
          float: left;
          width: 30%;
          margin-left: 20%;
        "
      >
        <p style="text-align: center; margin-top: 10px; margin-bottom: 10px">
          <font size="5">对比对象</font>
        </p>
        <el-form>
          <el-form-item label="os" label-width="120px" class="input_class">
            <el-select
              v-model="os_b"
              filterable
              placeholder="请选择"
              size="medium"
              clearable
              @change="selectChangeVersionb"
            >
              <el-option
                v-for="item in osData"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="os_version"
            label-width="120px"
            class="input_class"
          >
            <el-select
              v-model="os_version_b"
              filterable
              placeholder="请选择"
              size="medium"
              clearable
              @change="getSelectGroupb"
            >
              <el-option
                v-for="item in versionData_b"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="group_id"
            label-width="120px"
            class="input_class"
          >
            <el-select
              v-model="group_id_b"
              filterable
              placeholder="请选择"
              size="medium"
              clearable
            >
              <el-option
                v-for="item in groupData_b"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div style="float: left; width: 100%; margin-top: 20px">
        <div style="float: left; width: 50%; margin-left: 20%">
          <el-radio-group v-model="suite" @change="radioChange">
            <el-radio label="stream">stream</el-radio>
            <el-radio label="netperf">netperf</el-radio>
            <el-radio label="unixbench">unixbench</el-radio>
            <el-radio label="lmbench3">lmbench3</el-radio>
            <el-radio label="libmicro">libmicro</el-radio>
            <el-radio label="fio-basic">fio-basic</el-radio>
          </el-radio-group>
        </div>
        <div style="float: left">
          <el-form>
            <el-form-item class="confirm">
              <el-button @click="queryCharts">确定</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div id="container" class="containers">
      <div
        v-for="(l_item, l_index) in unixbench_data.table_data"
        :key="l_index"
      >
        <div class="test_params">test_params: {{ l_item.test_params }}</div>
        <el-table
          :data="l_item.data"
          border
          :header-cell-style="{ background: '#02951e', color: '#000' }"
          :row-style="tableRowStyle"
          :cell-style="tableCellStyle"
          style="width: 1500px"
        >
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
        <el-table
          :data="l_item.data"
          border
          :header-cell-style="{ background: '#02951e', color: '#000' }"
          :row-style="tableRowStyle"
          :cell-style="tableCellStyle"
          style="width: 1500px"
        >
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

      <div v-for="(t_item, t_index) in libmicro_data.table_data" :key="t_index">
        <div class="test_params">test_params: {{ t_item.test_params }}</div>
        <el-table
          :data="t_item.data"
          border
          :header-cell-style="{ background: '#02951e', color: '#000' }"
          :row-style="tableRowStyle"
          :cell-style="tableCellStyle"
          style="width: 1500px"
        >
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

      <div v-for="(t_item, t_index) in stream_data.table_data" :key="t_index">
        <div class="test_params">test_params: {{ t_item.test_params }}</div>
        <el-table
          :data="t_item.data"
          border
          :header-cell-style="{ background: '#02951e', color: '#000' }"
          :row-style="tableRowStyle"
          :cell-style="tableCellStyle"
          style="width: 1500px"
        >
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

      <div v-for="(t_item, t_index) in fio_data.table_data" :key="t_index">
        <div class="test_params">test_params:</div>
        <el-table
          :data="t_item.data"
          border
          :header-cell-style="{ background: '#02951e', color: '#000' }"
          :row-style="tableRowStyle"
          :cell-style="tableCellStyle"
          style="width: 1500px"
        >
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
        <el-table
          :data="l_item.data"
          border
          :header-cell-style="{ background: '#02951e', color: '#000' }"
          :row-style="tableRowStyle"
          :cell-style="tableCellStyle"
          style="width: 1500px"
        >
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

      <div v-for="(l_item, l_index) in netperfa_data.table_data" :key="l_index">
        <div class="test_params">test_params: {{ l_item.test_params }}</div>
        <el-table
          :data="l_item.data"
          border
          :header-cell-style="{ background: '#02951e', color: '#000' }"
          :row-style="tableRowStyle"
          :cell-style="tableCellStyle"
          style="width: 1500px"
        >
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
import { getPerformanceResult, QueryField } from "@/api/jobs.js";
import Header from "@/components/Header";
import echarts from "echarts";
export default {
  name: "CustomErrorBar",
  components: { Header },
  data() {
    return {
      suite: "stream",
      osData: [],
      versionData_a: [],
      versionData_b: [],
      groupData_a: [],
      groupData_b: [],
      checkQuery: {
        filter: {
          suite: [],
          os: [],
          os_version: [],
        },
        field: "os",
      },
      checkQuery_b: {
        filter: {
          suite: [],
          os: [],
          os_version: [],
        },
        field: "os",
      },
      os_a: "",
      os_b: "",
      os_version_a: "",
      os_version_b: "",
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
            { os: "openeuler", os_version: "21.03-iso" },
            { os: "openeuler", os_version: "21.09-iso" },
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
            { os: "openeuler", os_version: "21.03-iso" },
            { os: "openeuler", os_version: "21.09-iso" },
          ],
          x_params: ["metric"],
        },
      },
      libmicro_data: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: { suite: ["libmicro"], group_id: [] },
          metrics: [],
          series: [
            { os: "openeuler", os_version: "21.03-iso" },
            { os: "openeuler", os_version: "21.09-iso" },
          ],
          x_params: ["metric"],
        },
      },
      unixbench_data: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: { suite: ["unixbench"], nr_task: [1, 96], group_id: [] },
          metrics: ["unixbench.score"],
          series: [
            { os: "openeuler", os_version: "21.03-iso" },
            { os: "openeuler", os_version: "21.09-iso" },
          ],
          x_params: ["test"],
        },
      },
      fio_data: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: { suite: ["fio-basic"], group_id: [] },
          metrics: [
            "fio.read_iops",
            "fio.read_bw_MBps",
            "fio.write_iops",
            "fio.write_bw_MBps",
          ],
          series: [
            { os: "openeuler", os_version: "21.03-iso" },
            { os: "openeuler", os_version: "21.09-iso" },
          ],
          x_params: ["bs"],
        },
      },
      netperfa_data: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: {
            suite: ["netperf"],
            "pp.netperf.test": ["TCP_STREAM", "UDP_STREAM"],
            "pp.netperf.runtime": [60],
            group_id: [],
          },
          metrics: ["netperf.Throughput_Mbps"],
          series: [
            { os: "openeuler", os_version: "21.03-iso" },
            { os: "openeuler", os_version: "21.09-iso" },
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
            "pp.netperf.runtime": [60],
          },
          metrics: ["netperf.Throughput_tps"],
          series: [
            { os: "openeuler", os_version: "21.03-iso" },
            { os: "openeuler", os_version: "21.09-iso" },
          ],
          x_params: ["test"],
        },
      },
      title_dic: {
        stream: "Function",
        "stream-copy_bandwidth_MBps": "copy",
        "stream-scale_bandwidth_MBps": "scale",
        "stream-add_bandwidth_MBps": "add",
        "stream-triad_bandwidth_MBps": "triad",
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
    clean_data() {
      this.stream_data.table_data = [];
      this.stream_data.echart_data = [];

      this.lmbench_data.table_data = [];
      this.lmbench_data.echart_data = [];

      this.libmicro_data.table_data = [];
      this.libmicro_data.echart_data = [];

      this.unixbench_data.table_data = [];
      this.unixbench_data.echart_data = [];

      this.fio_data.table_data = [];
      this.fio_data.echart_data = [];

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
      var title_trans = this.title_dic[sData.title];

      tHeader.push(title_trans);
      tHeader = tHeader.concat(avg_data[0].x_params);
      for (var i = 0; i < avg_data.length; i++) {
        var tmp = this.getRowData(title_trans, avg_data[i]);
        tData.push(tmp);
      }

      for (i = 0; i < change_data.length; i++) {
        tmp = this.getRowData(title_trans, change_data[i]);
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
        if (data.series.includes("vs")) {
          tmp[data.x_params[i]] = data.data[i] + "%";
        } else {
          tmp[data.x_params[i]] = data.data[i];
        }
      }
      return tmp;
    },
    trans_x(datas) {
      var avg_data = datas.average;
      var change_data = datas.change;
      var tHeader = avg_data[0].x_params;

      for (var i = 0; i < tHeader.length; i++) {
        tHeader[i] = this.title_dic[tHeader[i]];
      }

      for (i = 0; i < avg_data.length; i++) {
        avg_data[i].x_params = tHeader;
      }
      for (i = 0; i < change_data.length; i++) {
        change_data[i].x_params = tHeader;
      }
      datas.average = avg_data;
      datas.change = change_data;

      return datas;
    },
    transfer_res(res) {
      var destination = {};
      destination = res;

      for (var i = 0; i < destination.length; i++) {
        destination[i].datas = this.trans_x(destination[i].datas);
      }
      return destination;
    },
    getData(JobData) {
      getPerformanceResult(JobData.QueryData).then((res) => {
        JobData.echart_data = this.transfer_res(res);
        var sourceData = JobData.echart_data;

        for (var i = 0; i < sourceData.length; i++) {
          this.getTableData(sourceData[i], JobData.table_data);
        }
        this.sleep(200).then(() => {
          this.get_Echarts(JobData.echart_data);
        });
      });
    },
    radioChange() {
      this.getosData();
      this.getSelectVersiona(this.os_a);
      this.getSelectVersionb(this.os_b);
      this.getSelectGroupa(this.os_version_a);
      this.getSelectGroupb(this.os_version_b);
    },
    getosData() {
      this.checkQuery.filter.suite = [this.suite];
      this.checkQuery.filter.os = [];
      this.checkQuery.filter.os_version = [];
      this.checkQuery.field = "os";
      this.group_id_a = "";
      this.versionData_a = [];
      this.groupData_a = [];

      this.checkQuery_b.filter.suite = [this.suite];
      this.checkQuery_b.filter.os = [];
      this.checkQuery_b.filter.os_version = [];
      this.checkQuery_b.field = "os";
      this.group_id_b = "";
      this.versionData_b = [];
      this.groupData_b = [];

      QueryField(this.checkQuery).then((res) => {
        this.osData = res;
      });
    },
    selectChangeVersiona(os) {
      this.os_version_a = "";
      this.getSelectVersiona(os);
    },
    selectChangeVersionb(os) {
      this.os_version_b = "";
      this.getSelectVersionb(os);
    },
    getSelectVersiona(os) {
      this.checkQuery.filter.os = [os];
      this.checkQuery.filter.os_version = [];
      this.checkQuery.field = "os_version";
      this.group_id_a = "";
      this.versionData_a = [];
      this.groupData_a = [];

      QueryField(this.checkQuery).then((res) => {
        this.versionData_a = res;
      });
    },
    getSelectVersionb(os) {
      this.checkQuery_b.filter.os = [os];
      this.checkQuery_b.filter.os_version = [];
      this.checkQuery_b.field = "os_version";
      this.group_id_b = "";
      this.versionData_b = [];
      this.groupData_b = [];

      QueryField(this.checkQuery_b).then((res) => {
        this.versionData_b = res;
      });
    },
    getSelectGroupa(os_version) {
      this.checkQuery.filter.os_version = [os_version];
      this.checkQuery.field = "group_id";
      this.group_id_a = "";

      QueryField(this.checkQuery).then((res) => {
        this.groupData_a = res;
      });
    },
    getSelectGroupb(os_version) {
      this.checkQuery_b.filter.os_version = [os_version];
      this.checkQuery_b.field = "group_id";
      this.group_id_b = "";

      QueryField(this.checkQuery_b).then((res) => {
        this.groupData_b = res;
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
      var myChart = echarts.init(document.getElementById(echart_id));

      if (e_data.length == 0) {
        return;
      }

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
              tmp = params[i].data;
              if (s_name.includes("vs")) {
                tmp = tmp + "%";
              }
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
          axisLabel: {
            show: true,
            //            interval: 0,
            rotate: 40,
            textStyle: {
              color: "#333",
            },
          },
        },
        yAxis: {
          axisLabel: {
            formatter: this.y_formatter(e_data),
            textStyle: {
              color: "#333",
            },
          },
        },

        grid: {
          left: "15%",
        },
      };
      var series = this.renderSeries(e_data, echart_type);
      option.series = series;
      option && myChart.setOption(option, true); //绘图
    },
    y_formatter(e_data) {
      var SeriesNames = this.getSeriesNames(e_data);
      if (SeriesNames[0].includes("vs")) {
        return "{value}%";
      }
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

      this.libmicro_data.QueryData.series[0].os = this.os_a;
      this.libmicro_data.QueryData.series[0].os_version = this.os_version_a;
      this.libmicro_data.QueryData.series[1].os = this.os_b;
      this.libmicro_data.QueryData.series[1].os_version = this.os_version_b;

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
        this.libmicro_data.QueryData.filter.group_id = [];
        this.stream_data.QueryData.filter.group_id = [];
        this.netperfa_data.QueryData.filter.group_id = [];
        this.netperfb_data.QueryData.filter.group_id = [];
      } else {
        this.lmbench_data.QueryData.filter.group_id[0] = this.group_id_a;
        this.lmbench_data.QueryData.filter.group_id[1] = this.group_id_b;
        this.unixbench_data.QueryData.filter.group_id[0] = this.group_id_a;
        this.unixbench_data.QueryData.filter.group_id[1] = this.group_id_b;
        this.libmicro_data.QueryData.filter.group_id[0] = this.group_id_a;
        this.libmicro_data.QueryData.filter.group_id[1] = this.group_id_b;
        this.stream_data.QueryData.filter.group_id[0] = this.group_id_a;
        this.stream_data.QueryData.filter.group_id[1] = this.group_id_b;
        this.netperfa_data.QueryData.filter.group_id[0] = this.group_id_a;
        this.netperfa_data.QueryData.filter.group_id[1] = this.group_id_b;
        this.netperfb_data.QueryData.filter.group_id[0] = this.group_id_a;
        this.netperfb_data.QueryData.filter.group_id[1] = this.group_id_b;
      }

      this.clean_data();
      if (this.suite === "lmbench3") {
        this.getData(this.lmbench_data);
      }
      if (this.suite === "unixbench") {
        this.getData(this.unixbench_data);
      }
      if (this.suite === "libmicro") {
        this.getData(this.libmicro_data);
      }
      if (this.suite === "stream") {
        this.getData(this.stream_data);
      }
      if (this.suite === "fio-basic") {
        this.getData(this.fio_data);
      }
      if (this.suite === "netperf") {
        this.getData(this.netperfb_data);

        this.sleep(200).then(() => {
          this.getData(this.netperfa_data);
        });
      }
    },
    tableRowStyle({ rowIndex }) {
      let rowBackground = {};
      if (rowIndex === 0) {
        rowBackground.background = "#eeeeee";
      }
      return rowBackground;
    },
    tableCellStyle({ row, column }) {
      let cellBackground = { color: "#000" };

      for (var k in row) {
        if (typeof row[k] == "string" && row[k].includes("vs")) {
          var content = row[column.label];
          if (typeof content == "string") {
            if (content.includes("vs")) {
              cellBackground.background = "yellow";
              return cellBackground;
            } else if (content.replace("%", "") > 0) {
              cellBackground.background = "green";
              return cellBackground;
            } else if (content.replace("%", "") < 0) {
              cellBackground.background = "red";
              return cellBackground;
            }
          }
        }
      }
      return cellBackground;
    },
  },
  mounted() {
    this.getosData();
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
.el-table.warning-row {
  background: #02851e;
}
</style>