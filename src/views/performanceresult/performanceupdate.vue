
<template>
  <div id="CustomErrorBar">
    <Header class="main-header"></Header>
    <h1 class="title">Performance Result for Update</h1>
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
            <el-select v-model="os_select" size="medium" disabled> </el-select>
          </el-form-item>
          <el-form-item
            label="os_version"
            label-width="120px"
            class="input_class"
          >
            <el-select
              v-model="os_version"
              filterable
              placeholder="请选择"
              size="medium"
              clearable
              @change="getSelectGroup"
            >
              <el-option
                v-for="item in versionData"
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
                v-for="item in groupData"
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
            <el-select v-model="os_select" size="medium" disabled> </el-select>
          </el-form-item>
          <el-form-item
            label="os_version"
            label-width="120px"
            class="input_class"
          >
            <el-select
              v-model="os_version"
              filterable
              placeholder="请选择"
              size="medium"
              clearable
              @change="getSelectGroup"
            >
              <el-option
                v-for="item in versionData"
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
                v-for="item in groupData"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div style="float: left; width: 100%; margin-top: 20px">
        <div style="float: left; width: 45%; margin-left: 20%">
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
        <div style="float: left; margin-left: 7%">
          <el-form>
            <el-form-item class="confirm">
              <el-button @click="getExcel">导出</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div style="float: left; margin-left: 30%">
          <el-transfer
            filterable
            :titles="['可选项', '已选项']"
            v-model="transfer_chosen"
            :data="transfer_data"
            @change="transferChange"
          >
          </el-transfer>
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
            v-for="(item, index) in unixbench_filter(l_item.header)"
            :key="index"
            :label="item"
            :prop="item"
          ></el-table-column>
        </el-table>

        <div
          :id="`average_${l_item.title.replace(
            '.',
            '_'
          )}_${l_index}_${l_item.test_params.replace(/\.|\s/g, '_')}`"
          :style="{ width: '100%', height: '600px' }"
        ></div>

        <div
          :id="`change_${l_item.title.replace(
            '.',
            '_'
          )}_${l_index}_${l_item.test_params.replace(/\.|\s/g, '_')}`"
          :style="{ width: '100%', height: '600px' }"
        ></div>
      </div>

      <div
        v-for="(l_item, l_index) in lmbench_data_a.table_data"
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
            v-for="(item, index) in lmbench3_filter(l_item.header)"
            :key="index"
            :label="item"
            :prop="item"
          ></el-table-column>
        </el-table>

        <div
          :id="`average_${l_item.title.replace(
            '.',
            '_'
          )}_${l_index}_${l_item.test_params.replace(/\.|\s/g, '_')}`"
          :style="{ width: '100%', height: '600px' }"
        ></div>

        <div
          :id="`change_${l_item.title.replace(
            '.',
            '_'
          )}_${l_index}_${l_item.test_params.replace(/\.|\s/g, '_')}`"
          :style="{ width: '100%', height: '600px' }"
          v-show="l_item.data.length > 2"
        ></div>
      </div>

      <div
        v-for="(l_item, l_index) in lmbench_data_b.table_data"
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
            v-for="(item, index) in lmbench3_filter(l_item.header)"
            :key="index"
            :label="item"
            :prop="item"
          ></el-table-column>
        </el-table>

        <div
          :id="`average_${l_item.title.replace(
            '.',
            '_'
          )}_${l_index}_${l_item.test_params.replace(/\.|\s/g, '_')}`"
          :style="{ width: '100%', height: '600px' }"
        ></div>

        <div
          :id="`change_${l_item.title.replace(
            '.',
            '_'
          )}_${l_index}_${l_item.test_params.replace(/\.|\s/g, '_')}`"
          :style="{ width: '100%', height: '600px' }"
          v-show="l_item.data.length > 2"
        ></div>
      </div>

      <div
        v-for="(l_item, l_index) in lmbench_data_c.table_data"
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
            v-for="(item, index) in lmbench3_filter(l_item.header)"
            :key="index"
            :label="item"
            :prop="item"
          ></el-table-column>
        </el-table>

        <div
          :id="`average_${l_item.title.replace(
            '.',
            '_'
          )}_${l_index}_${l_item.test_params.replace(/\.|\s/g, '_')}`"
          :style="{ width: '100%', height: '600px' }"
        ></div>

        <div
          :id="`change_${l_item.title.replace(
            '.',
            '_'
          )}_${l_index}_${l_item.test_params.replace(/\.|\s/g, '_')}`"
          :style="{ width: '100%', height: '600px' }"
          v-show="l_item.data.length > 2"
        ></div>
      </div>

      <div
        v-for="(l_item, l_index) in lmbench_data_d.table_data"
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
            v-for="(item, index) in lmbench3_filter(l_item.header)"
            :key="index"
            :label="item"
            :prop="item"
          ></el-table-column>
        </el-table>

        <div
          :id="`average_${l_item.title.replace(
            '.',
            '_'
          )}_${l_index}_${l_item.test_params.replace(/\.|\s/g, '_')}`"
          :style="{ width: '100%', height: '600px' }"
        ></div>

        <div
          :id="`change_${l_item.title.replace(
            '.',
            '_'
          )}_${l_index}_${l_item.test_params.replace(/\.|\s/g, '_')}`"
          :style="{ width: '100%', height: '600px' }"
          v-show="l_item.data.length > 2"
        ></div>
      </div>

      <div
        v-for="(l_item, l_index) in lmbench_data_e.table_data"
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
            v-for="(item, index) in lmbench3_filter(l_item.header)"
            :key="index"
            :label="item"
            :prop="item"
          ></el-table-column>
        </el-table>

        <div
          :id="`average_${l_item.title.replace(
            '.',
            '_'
          )}_${l_index}_${l_item.test_params.replace(/\.|\s/g, '_')}`"
          :style="{ width: '100%', height: '600px' }"
        ></div>

        <div
          :id="`change_${l_item.title.replace(
            '.',
            '_'
          )}_${l_index}_${l_item.test_params.replace(/\.|\s/g, '_')}`"
          :style="{ width: '100%', height: '600px' }"
          v-show="l_item.data.length > 2"
        ></div>
      </div>

      <div
        v-for="(l_item, l_index) in lmbench_data_f.table_data"
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
            v-for="(item, index) in lmbench3_filter(l_item.header)"
            :key="index"
            :label="item"
            :prop="item"
          ></el-table-column>
        </el-table>

        <div
          :id="`average_${l_item.title.replace(
            '.',
            '_'
          )}_${l_index}_${l_item.test_params.replace(/\.|\s/g, '_')}`"
          :style="{ width: '100%', height: '600px' }"
        ></div>

        <div
          :id="`change_${l_item.title.replace(
            '.',
            '_'
          )}_${l_index}_${l_item.test_params.replace(/\.|\s/g, '_')}`"
          :style="{ width: '100%', height: '600px' }"
          v-show="l_item.data.length > 2"
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
            v-for="(item, index) in libmicro_filter(t_item.header)"
            :key="index"
            :label="item"
            :prop="item"
          ></el-table-column>
        </el-table>

        <div
          :id="`average_${t_item.title.replace(
            '.',
            '_'
          )}_${t_index}_${t_item.test_params.replace(/\.|\s/g, '_')}`"
          :style="{ width: '100%', height: '600px' }"
        ></div>

        <div
          :id="`change_${t_item.title.replace(
            '.',
            '_'
          )}_${t_index}_${t_item.test_params.replace(/\.|\s/g, '_')}`"
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
            v-for="(item, index) in stream_filter(t_item.header)"
            :key="index"
            :label="item"
            :prop="item"
          ></el-table-column>
        </el-table>

        <div
          :id="`average_${t_item.title.replace(
            '.',
            '_'
          )}_${t_index}_${t_item.test_params.replace(/\.|\s/g, '_')}`"
          :style="{ width: '100%', height: '600px' }"
        ></div>

        <div
          :id="`change_${t_item.title.replace(
            '.',
            '_'
          )}_${t_index}_${t_item.test_params.replace(/\.|\s/g, '_')}`"
          :style="{ width: '100%', height: '600px' }"
        ></div>
      </div>

      <div v-for="(t_item, t_index) in fio_data.table_data" :key="t_index">
        <div class="test_params">test_params:{{ t_item.test_params }}</div>
        <el-table
          :data="t_item.data"
          border
          :header-cell-style="{ background: '#02951e', color: '#000' }"
          :row-style="tableRowStyle"
          :cell-style="tableCellStyle"
          style="width: 1500px"
        >
          <el-table-column
            v-for="(item, index) in fio_filter(t_item.header)"
            :key="index"
            :label="item"
            :prop="item"
          ></el-table-column>
        </el-table>

        <div
          :id="`average_${t_item.title.replace(
            '.',
            '_'
          )}_${t_index}_${t_item.test_params.replace(/\.|\s/g, '_')}`"
          :style="{ width: '100%', height: '600px' }"
        ></div>

        <div
          :id="`change_${t_item.title.replace(
            '.',
            '_'
          )}_${t_index}_${t_item.test_params.replace(/\.|\s/g, '_')}`"
          :style="{ width: '100%', height: '600px' }"
          v-show="t_item.data.length > 2"
        ></div>
      </div>

      <div v-for="(t_item, t_index) in fio_data_b.table_data" :key="t_index">
        <div class="test_params">test_params:{{ t_item.test_params }}</div>
        <el-table
          :data="t_item.data"
          border
          :header-cell-style="{ background: '#02951e', color: '#000' }"
          :row-style="tableRowStyle"
          :cell-style="tableCellStyle"
          style="width: 1500px"
        >
          <el-table-column
            v-for="(item, index) in fio_filter(t_item.header)"
            :key="index"
            :label="item"
            :prop="item"
          ></el-table-column>
        </el-table>

        <div
          :id="`average_${t_item.title.replace(
            '.',
            '_'
          )}_${t_index}_${t_item.test_params.replace(/\.|\s/g, '_')}`"
          :style="{ width: '100%', height: '600px' }"
        ></div>

        <div
          :id="`change_${t_item.title.replace(
            '.',
            '_'
          )}_${t_index}_${t_item.test_params.replace(/\.|\s/g, '_')}`"
          :style="{ width: '100%', height: '600px' }"
          v-show="t_item.data.length > 2"
        ></div>
      </div>

      <div v-for="(t_item, t_index) in fio_data_c.table_data" :key="t_index">
        <div class="test_params">test_params:{{ t_item.test_params }}</div>
        <el-table
          :data="t_item.data"
          border
          :header-cell-style="{ background: '#02951e', color: '#000' }"
          :row-style="tableRowStyle"
          :cell-style="tableCellStyle"
          style="width: 1500px"
        >
          <el-table-column
            v-for="(item, index) in fio_filter(t_item.header)"
            :key="index"
            :label="item"
            :prop="item"
          ></el-table-column>
        </el-table>

        <div
          :id="`average_${t_item.title.replace(
            '.',
            '_'
          )}_${t_index}_${t_item.test_params.replace(/\.|\s/g, '_')}`"
          :style="{ width: '100%', height: '600px' }"
        ></div>

        <div
          :id="`change_${t_item.title.replace(
            '.',
            '_'
          )}_${t_index}_${t_item.test_params.replace(/\.|\s/g, '_')}`"
          :style="{ width: '100%', height: '600px' }"
          v-show="t_item.data.length > 2"
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
            v-for="(item, index) in netperf_filter(l_item.header)"
            :key="index"
            :label="item"
            :prop="item"
          ></el-table-column>
        </el-table>

        <div
          :id="`average_${l_item.title.replace(
            '.',
            '_'
          )}_${l_index}_${l_item.test_params.replace(/\.|\s/g, '_')}`"
          :style="{ width: '100%', height: '600px' }"
        ></div>

        <div
          :id="`change_${l_item.title.replace(
            '.',
            '_'
          )}_${l_index}_${l_item.test_params.replace(/\.|\s/g, '_')}`"
          :style="{ width: '100%', height: '600px' }"
          v-show="l_item.data.length > 2"
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
            v-for="(item, index) in netperf_filter(l_item.header)"
            :key="index"
            :label="item"
            :prop="item"
          ></el-table-column>
        </el-table>

        <div
          :id="`average_${l_item.title.replace(
            '.',
            '_'
          )}_${l_index}_${l_item.test_params.replace(/\.|\s/g, '_')}`"
          :style="{ width: '100%', height: '600px' }"
        ></div>

        <div
          :id="`change_${l_item.title.replace(
            '.',
            '_'
          )}_${l_index}_${l_item.test_params.replace(/\.|\s/g, '_')}`"
          :style="{ width: '100%', height: '600px' }"
          v-show="l_item.data.length > 2"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPerformanceResult, QueryField } from "@/api/jobs.js";
import Header from "@/components/Header";
import echarts from "echarts";
import XLSX from "xlsx";
import XLSXS from "xlsx-style";
import filesaver from "file-saver";
//const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
  name: "CustomErrorBar",
  components: { Header },
  data() {
    return {
      stream_selected: [],
      netperf_selected: [],
      unixbench_selected: [],
      lmbench3_selected: [],
      libmicro_selected: [],
      fio_selected: [],
      t_headers: ["copy", "scale", "add", "triad"],
      transfer_data: [],
      transfer_chosen: [],
      suite: "stream",
      osData: [],
      versionData: [],
      groupData: [],
      checkQuery: {
        filter: {
          suite: [],
          os: ["openeuler"],
          os_version: [],
        },
        field: "os_version",
      },
      checkQuery_b: {
        filter: {
          suite: [],
          os: ["openeuler"],
          os_version: [],
        },
        field: "os_version",
      },
      os_select: "openeuler",
      os_version: "",
      group_id_a: "",
      group_id_b: "",
      stream_data: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: {
            interval_type: ["openeuler-update"],
            os: ["openeuler"],
            suite: ["stream"],
            os_version: [],
            group_id: [],
          },
          metrics: [
            "stream.copy_bandwidth_MBps",
            "stream.scale_bandwidth_MBps",
            "stream.add_bandwidth_MBps",
            "stream.triad_bandwidth_MBps",
          ],
          series: ["group_id"],
          x_params: ["metric"],
          max_series_num: 2,
        },
      },
      lmbench_data_a: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: {
            interval_type: ["openeuler-update"],
            os: ["openeuler"],
            suite: ["lmbench3"],
          },
          metrics: [
            "lmbench3.syscall.syscall.latency.us",
            "lmbench3.syscall.stat.latency.us",
            "lmbench3.syscall.open/close.latency.us",
            "lmbench3.null_io",
            "lmbench3.Process.fork+exit.latency.us",
            ".Process.fork+execve.latency.us",
            "lmbench3.Process.fork+/bin/sh.latency.us",
            "lmbench3.Select.100tcp.latency.us",
            "lmbench3.sig_inst",
            "lmbench3.sig_hndl",
          ],
          series: ["group_id"],
          x_params: ["metric"],
          max_series_num: 2,
          title: "Processor_Processes",
        },
      },
      lmbench_data_b: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: {
            interval_type: ["openeuler-update"],
            os: ["openeuler"],
            suite: ["lmbench3"],
          },
          metrics: [
            "lmbench3.PIPE.latency.us",
            "lmbench3.AF_UNIX.sock.stream.latency.us",
            "lmbench3.UDP.usinglocalhost.latency.us",
            "lmbench3.TCP.localhost.latency",
            "lmbench3.CONNECT.localhost.latency.us",
          ],
          series: ["group_id"],
          x_params: ["metric"],
          max_series_num: 2,
          title: "local_latency",
        },
      },
      lmbench_data_c: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: {
            interval_type: ["openeuler-update"],
            os: ["openeuler"],
            suite: ["lmbench3"],
          },
          metrics: [
            "lmbench3.PIPE.bandwidth.MB/sec",
            "mbench3.AF_UNIX.sock.stream.bandwidth.MB",
            "lmbench3.TCP.socket.bandwidth.10MB.MB/sec",
            "lmbench3.FILE.read.bandwidth.MB/sec",
            "lmbench3.MMAP.read.bandwidth.MB/sec",
            "lmbench3.BCOPY.libc.bandwidth.MB/sec",
            "lmbench3.BCOPY.unrolled.bandwidth.MB/sec",
            "lmbench3.BCOPY.memory_read.bandwidth.MB/sec",
            "lmbench3.BCOPY.memory_write.bandwidth.MB/sec",
          ],
          series: ["group_id"],
          x_params: ["metric"],
          max_series_num: 2,
          title: "local_bandwidths",
        },
      },
      lmbench_data_d: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: {
            interval_type: ["openeuler-update"],
            os: ["openeuler"],
            suite: ["lmbench3"],
          },
          metrics: [
            "lmbench3.CTX.2P.0K.latency.us",
            "lmbench3.CTX.2P.16K.latency.us",
            "lmbench3.CTX.2P.64K.latency.us",
            "lmbench3.CTX.8P.16K.latency.us",
            "lmbench3.CTX.8P.64K.latency.us",
            "lmbench3.CTX.16P.16K.latency.us",
            "lmbench3.CTX.16P.64K.latency.us",
          ],
          series: ["group_id"],
          x_params: ["metric"],
          max_series_num: 2,
          title: "Context_switching",
        },
      },
      lmbench_data_e: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: {
            interval_type: ["openeuler-update"],
            os: ["openeuler"],
            suite: ["lmbench3"],
          },
          metrics: [
            "lmbench3.Mmap_Latency",
            "lmbench3.Prot_Fault",
            "lmbench3.Pagefaults.ms",
            "lmbench3.Select.100fd.latency.us",
          ],
          series: ["group_id"],
          x_params: ["metric"],
          max_series_num: 2,
          title: "VM_latencies",
        },
      },
      lmbench_data_f: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: {
            interval_type: ["openeuler-update"],
            os: ["openeuler"],
            suite: ["lmbench3"],
          },
          metrics: [
            "lmbench3.L1_$",
            "lmbench3.L2_$",
            "lmbench3.Main_mem",
            "lmbench3.Rand_mem",
          ],
          series: ["group_id"],
          x_params: ["metric"],
          max_series_num: 2,
          title: "Memor_latencies",
        },
      },
      libmicro_data: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: {
            interval_type: ["openeuler-update"],
            os: ["openeuler"],
            suite: ["libmicro"],
            os_version: [],
            group_id: [],
          },
          metrics: [],
          series: ["group_id"],
          x_params: ["metric"],
          max_series_num: 2,
        },
      },
      unixbench_data: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: {
            interval_type: ["openeuler-update"],
            os: ["openeuler"],
            suite: ["unixbench"],
            os_version: [],
            group_id: [],
          },
          metrics: ["unixbench.score"],
          series: ["group_id"],
          x_params: ["test"],
          max_series_num: 2,
        },
      },
      fio_data: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: {
            interval_type: ["openeuler-update"],
            os: ["openeuler"],
            suite: ["fio-basic"],
            "pp.fio-setup-basic.rw": ["randrw"],
            os_version: [],
            group_id: [],
          },
          metrics: [
            "fio.read_iops",
            "fio.read_bw_MBps",
            "fio.write_iops",
            "fio.write_bw_MBps",
          ],
          series: ["group_id"],
          x_params: ["bs"],
          max_series_num: 2,
          test_params: ["pp.fio-setup-basic.rw"],
        },
      },
      fio_data_b: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: {
            interval_type: ["openeuler-update"],
            os: ["openeuler"],
            suite: ["fio-basic"],
            "pp.fio-setup-basic.rw": ["read", "randread"],
          },
          metrics: ["fio.read_iops", "fio.read_bw_MBps"],
          series: ["group_id"],
          x_params: ["bs"],
          max_series_num: 2,
          test_params: ["pp.fio-setup-basic.rw"],
        },
      },
      fio_data_c: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: {
            interval_type: ["openeuler-update"],
            os: ["openeuler"],
            suite: ["fio-basic"],
            "pp.fio-setup-basic.rw": ["write", "randwrite"],
          },
          metrics: ["fio.write_iops", "fio.wirte_bw_MBps"],
          series: ["group_id"],
          x_params: ["bs"],
          max_series_num: 2,
          test_params: ["pp.fio-setup-basic.rw"],
        },
      },
      netperfa_data: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: {
            interval_type: ["openeuler-update"],
            os: ["openeuler"],
            suite: ["netperf"],
            "pp.netperf.test": ["TCP_STREAM", "UDP_STREAM"],
            os_version: [],
            group_id: [],
          },
          metrics: ["netperf.Throughput_Mbps"],
          series: ["group_id"],
          x_params: ["send_size"],
          max_series_num: 2,
        },
      },
      netperfb_data: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: {
            interval_type: ["openeuler-update"],
            os: ["openeuler"],
            suite: ["netperf"],
            "pp.netperf.test": ["TCP_RR", "TCP_CRR", "UDP_RR"],
            os_version: [],
            group_id: [],
          },
          metrics: ["netperf.Throughput_tps"],
          series: ["group_id"],
          x_params: ["test"],
          max_series_num: 2,
        },
      },
      title_dic: {
        stream: "Function",
        "stream-copy_bandwidth_MBps": "copy",
        "stream-scale_bandwidth_MBps": "scale",
        "stream-add_bandwidth_MBps": "add",
        "stream-triad_bandwidth_MBps": "triad",
        "netperf-Throughput_tps": "Protocol_kind",
        libmicro: "Function",
        "whetston-double": "Double-Precision_Whetstone",
        shell1: "Shell_Scripts_(1_concurrent)",
        shell8: "Shell_Scripts_(8_concurrent)",
        pipe: "Pipe_Throughput",
        context1: "Pipe-based_Context_Switching",
        spawn: "Process_Creation",
        syscall: "System_Call_Overhead",
        dhry2reg: "Dhrystone_2_using_register_variables",
        fstime: "File_Copy_1024_bufsize_2000_maxblocks",
        fsbuffer: "File_Copy_256_bufsize_500_maxblocks",
        fsdisk: "File_Copy_4096_bufsize_8000_maxblocks",
        execl: "Execl_Throughput",
        "lmbench3-syscall-syscall-latency-us": "null_call",
        "lmbench3-null_io": "null_io",
        "lmbench3-syscall-stat-latency-us": "stat",
        "lmbench3-syscall-open/close-latency-us": "open_close",
        "lmbench3-Select-100tcp-latency-us": "slct_TCP",
        "lmbench3-sig_inst": "sig_inst",
        "lmbench3-sig_hndl": "sig_hndl",
        "lmbench3-Process-fork+exit-latency-us": "fork_proc",
        "lmbench3-Process-fork+execve-latency-us": "exec_proc",
        "lmbench3-Process-fork+/bin/sh-latency-us": "sh_proc",
        "lmbench3-PIPE-latency-us": "Pipe",
        "lmbench3-AF_UNIX-sock-stream-latency-us": "AF_UNIX",
        "lmbench3-UDP-usinglocalhost-latency-us": "UDP",
        "lmbench3-TCP-localhost-latency": "TCP",
        "lmbench3-CONNECT-localhost-latency-us": "TCP_conn",
        "lmbench3-PIPE-bandwidth-MB/sec": "Pipe",
        "mbench3-AF_UNIX-sock-stream-bandwidth-MB": "AF_UNIX",
        "lmbench3-TCP-socket-bandwidth-10MB-MB/sec": "TCP",
        "lmbench3-FILE-read-bandwidth-MB/sec": "File_reread",
        "lmbench3-MMAP-read-bandwidth-MB/sec": "Mmap_reread",
        "lmbench3-BCOPY-libc-bandwidth-MB/sec": "copy(libc)",
        "lmbench3-BCOPY-unrolled-bandwidth-MB/sec": "copy(hand)",
        "lmbench3-BCOPY-memory_read-bandwidth-MB/sec": "Mem_read",
        "lmbench3-BCOPY-memory_write-bandwidth-MB/sec": "Mem_write",
        "lmbench3-CTX-2P-0K-latency-us": "2p/0K",
        "lmbench3-CTX-2P-16K-latency-us": "2p/16K",
        "lmbench3-CTX-2P-64K-latency-us": "2p/64K",
        "lmbench3-CTX-8P-16K-latency-us": "8p/16K",
        "lmbench3-CTX-8P-64K-latency-us": "8p/64K",
        "lmbench3-CTX-16P-16K-latency-us": "16p/16K",
        "lmbench3-CTX-16P-64K-latency-us": "16p/64K",
        "lmbench3-Mmap_Latency": "Mmap_Latency",
        "lmbench3-Prot_Fault": "Prot_Fault",
        "lmbench3-Pagefaults-ms": "Page_Fault",
        "lmbench3-Select-100fd-latency-us": "100fd_selct",
        "lmbench3-L1_$": "L1_$",
        "lmbench3-L2_$": "L2_$",
        "lmbench3-Main_mem": "Main_mem",
        "lmbench3-Rand_mem": "Rand_mem",
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

      this.lmbench_data_a.table_data = [];
      this.lmbench_data_a.echart_data = [];
      this.lmbench_data_b.table_data = [];
      this.lmbench_data_b.echart_data = [];
      this.lmbench_data_c.table_data = [];
      this.lmbench_data_c.echart_data = [];
      this.lmbench_data_d.table_data = [];
      this.lmbench_data_d.echart_data = [];
      this.lmbench_data_e.table_data = [];
      this.lmbench_data_e.echart_data = [];
      this.lmbench_data_f.table_data = [];
      this.lmbench_data_f.echart_data = [];

      this.libmicro_data.table_data = [];
      this.libmicro_data.echart_data = [];

      this.unixbench_data.table_data = [];
      this.unixbench_data.echart_data = [];

      this.fio_data.table_data = [];
      this.fio_data.echart_data = [];
      this.fio_data_b.table_data = [];
      this.fio_data_b.echart_data = [];
      this.fio_data_c.table_data = [];
      this.fio_data_c.echart_data = [];

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
      var title_trans = this.title_dic[sData.title] || sData.title;
      var test_params = sData.test_params;

      if (title_trans == "netperf-Throughput_Mbps") {
        if (sData.test_params.includes("TCP")) {
          title_trans = "TCP_STREAM_MESSAGE_SIZE";
        } else {
          title_trans = "UDP_STREAM_MESSAGE_SIZE";
        }
      }
      if (title_trans == "unixbench-score") {
        if (sData.test_params.includes("96")) {
          title_trans = "Index_Values_96core";
        } else {
          title_trans = "Index_Values_1core";
        }
      }
      if (title_trans.includes("fio")) {
        if (
          test_params.includes("randread") ||
          test_params.includes("randwrite")
        ) {
          title_trans =
            "rand" +
            title_trans.replace("fio-", "").replace("_MBps", "") +
            "_blocksize";
        } else if (test_params.includes("randrw")) {
          title_trans =
            "randrw" +
            title_trans.replace("fio-", "").replace("_MBps", "") +
            "_blocksize";
        } else {
          title_trans =
            title_trans.replace("fio-", "").replace("_MBps", "") + "_blocksize";
        }
      }

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
        title_trans: title_trans,
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
        tHeader[i] = this.title_dic[tHeader[i]] || tHeader[i];
        if (tHeader[i].includes("libmicro")) {
          tHeader[i] = tHeader[i].replace("libmicro-", "");
        }
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
        //        console.log(res);
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
    getTableHeaders() {
      if (this.suite == "stream") {
        this.t_headers = ["copy", "scale", "add", "triad"];
        this.stream_selected = this.t_headers;
      } else if (this.suite == "netperf") {
        this.t_headers = [
          "TCP_RR",
          "TCP_CRR",
          "UDP_RR",
          "1",
          "64",
          "128",
          "256",
          "512",
          "1024",
          "1500",
          "2048",
          "4096",
          "9000",
          "16384",
          "32768",
          "65536",
        ];
        this.netperf_selected = this.t_headers;
      } else if (this.suite == "unixbench") {
        this.t_headers = [
          "Double-Precision_Whetstone",
          "Shell_Scripts_(1_concurrent)",
          "Shell_Scripts_(8_concurrent)",
          "Pipe_Throughput",
          "Pipe-based_Context_Switching",
          "Process_Creation",
          "System_Call_Overhead",
          "Dhrystone_2_using_register_variables",
          "File_Copy_1024_bufsize_2000_maxblocks",
          "File_Copy_256_bufsize_500_maxblocks",
          "File_Copy_4096_bufsize_8000_maxblocks",
          "Execl_Throughput",
          "System_Benchmarks_Index_Score",
        ];
        this.unixbench_selected = this.t_headers;
      } else if (this.suite == "lmbench3") {
        this.t_headers = [
          "null_call",
          "null_io",
          "stat",
          "open_close",
          "slct_TCP",
          "sig_inst",
          "sig_hndl",
          "fork_proc",
          "exec_proc",
          "sh_proc",
          "Pipe",
          "AF_UNIX",
          "UDP",
          "TCP",
          "TCP_conn",
          "File_reread",
          "Mmap_reread",
          "copy(libc)",
          "copy(hand)",
          "Mem_read",
          "Mem_write",
          "2p/0K",
          "2p/16K",
          "2p/64K",
          "8p/16K",
          "8p/64K",
          "16p/16K",
          "16p/64K",
          "Mmap_Latency",
          "Prot_Fault",
          "Page_Fault",
          "100fd_selct",
          "L1_$",
          "L2_$",
          "Main_mem",
          "Rand_mem",
        ];
        this.lmbench3_selected = this.t_headers;
      } else if (this.suite == "fio-basic") {
        this.t_headers = [
          "4k",
          "16k",
          "32k",
          "64k",
          "128k",
          "256k",
          "512k",
          "1024k",
        ];
        this.fio_selected = this.t_headers;
      } else if (this.suite == "libmicro") {
        this.t_headers = [
          "getpid",
          "getenv",
          "getenvT2",
          "gettimeofday",
          "log",
          "exp",
          "lrand48",
          "memset_10",
          "memset_256",
          "memset_256_u",
          "memset_1k",
          "memset_4k",
          "memset_4k_uc",
          "memset_10k",
          "memset_1m",
          "memset_10m",
          "memsetP2_10m",
          "memrand",
          "isatty_yes",
          "isatty_no",
          "malloc_10",
          "malloc_100",
          "malloc_1k",
          "malloc_10k",
          "malloc_100k",
          "mallocT2_10",
          "mallocT2_100",
          "mallocT2_1k",
          "mallocT2_10k",
          "mallocT2_100k",
          "close_bad",
          "close_tmp",
          "close_usr",
          "close_zero",
          "memcpy_10",
          "memcpy_1k",
          "memcpy_10k",
          "memcpy_1m",
          "memcpy_10m",
          "strcpy_10",
          "strchr_1k",
          "strcmp_10",
          "strcmp_1k",
          "scasecmp_10",
          "scasecmp_1k",
          "strtol",
          "getcontext",
          "setcontext",
          "mutex_st",
          "mutex_mt",
          "mutex_T2",
          "longjmp",
          "siglongjmp",
          "getrusage",
          "times",
          "time",
          "localtime_r",
          "strftime",
          "mktime",
          "mktimeT2",
          "c_mutex_1",
          "c_mutex_10",
          "c_mutex_200",
          "c_cond_1",
          "c_cond_10",
          "c_cond_200",
          "c_lockf_1",
          "c_lockf_10",
          "c_lockf_200",
          "c_flock",
          "c_flock_10",
          "c_flock_200",
          "c_fcntl_1",
          "c_fcntl_10",
          "c_fcntl_200",
          "file_lock",
          "getsockname",
          "getpeername",
          "chdir_tmp",
          "chdir_usr",
          "chgetwd_tmp",
          "chgetwd_usr",
          "realpath_tmp",
          "realpath_usr",
          "stat_tmp",
          "stat_usr",
          "fcntl_tmp",
          "fcntl_usr",
          "fcntl_ndelay",
          "lseek_t8k",
          "lseek_u8k",
          "open_tmp",
          "open_usr",
          "open_zero",
          "dup",
          "socket_u",
          "socket_i",
          "socketpair",
          "setsockopt",
          "bind",
          "listen",
          "connection",
          "poll_10",
          "poll_100",
          "poll_1000",
          "poll_w10",
          "poll_w100",
          "poll_w1000",
          "select_10",
          "select_100",
          "select_1000",
          "select_w10",
          "select_w100",
          "select_w1000",
          "semop",
          "sigaction",
          "signal",
          "sigprocmask",
          "pthread_8",
          "pthread_32",
          "pthread_128",
          "pthread_512",
          "fork_10",
          "fork_100",
          "fork_1000",
          "exit_10",
          "exit_100",
          "exit_1000",
          "exit_10_nolibc",
          "exec",
          "system",
          "recurse",
          "read_t1k",
          "read_t10k",
          "read_t100k",
          "read_u1k",
          "read_u10k",
          "read_u100k",
          "read_z1k",
          "read_z10k",
          "read_z100k",
          "read_zw100k",
          "write_t1k",
          "write_t10k",
          "write_t100k",
          "write_u1k",
          "write_u10k",
          "write_u100k",
          "write_n1k",
          "write_n10k",
          "write_n100k",
          "writev_t1k",
          "writev_t10k",
          "writev_t100k",
          "writev_u1k",
          "writev_u10k",
          "writev_u100k",
          "writev_n1k",
          "writev_n10k",
          "writev_n100k",
          "pread_t1k",
          "pread_t10k",
          "pread_t100k",
          "pread_u1k",
          "pread_u10k",
          "pread_u100k",
          "pread_z1k",
          "pread_z10k",
          "pread_z100k",
          "pread_zw100k",
          "pwrite_t1k",
          "pwrite_t10k",
          "pwrite_t100k",
          "pwrite_u1k",
          "pwrite_u10k",
          "pwrite_u100k",
          "pwrite_n1k",
          "pwrite_n10k",
          "pwrite_n100k",
          "mmap_z8k",
          "mmap_z128k",
          "mmap_t8k",
          "mmap_t128k",
          "mmap_u8k",
          "mmap_u128k",
          "mmap_a8k",
          "mmap_a128k",
          "mmap_rz8k",
          "mmap_rz128k",
          "mmap_rt8k",
          "mmap_rt128k",
          "mmap_ru8k",
          "mmap_ru128k",
          "mmap_ra8k",
          "mmap_ra128k",
          "mmap_wz8k",
          "mmap_wz128k",
          "mmap_wt8k",
          "mmap_wt128k",
          "mmap_wu8k",
          "mmap_wu128k",
          "mmap_wa8k",
          "mmap_wa128k",
          "unmap_z8k",
          "unmap_z128k",
          "unmap_t8k",
          "unmap_t128k",
          "unmap_u8k",
          "unmap_u128k",
          "unmap_a8k",
          "unmap_a128k",
          "unmap_rz8k",
          "unmap_rz128k",
          "unmap_rt8k",
          "unmap_rt128k",
          "unmap_ru8k",
          "unmap_ru128k",
          "unmap_ra8k",
          "unmap_ra128k",
          "conn_connect",
          "unmap_wz8k",
          "unmap_wz128k",
          "unmap_wt8k",
          "unmap_wt128k",
          "unmap_wu8k",
          "unmap_wu128k",
          "unmap_wa8k",
          "unmap_wa128k",
          "mprot_z8k",
          "mprot_z128k",
          "mprot_wz8k",
          "mprot_wz128k",
          "mprot_twz8k",
          "mprot_tw128k",
          "mprot_tw4m",
          "pipe_pst1",
          "pipe_pmt1",
          "pipe_pmp1",
          "pipe_pst4k",
          "pipe_pmt4k",
          "pipe_pmp4k",
          "pipe_sst1",
          "pipe_smt1",
          "pipe_smp1",
          "pipe_sst4k",
          "pipe_smt4k",
          "pipe_smp4k",
          "pipe_tst1",
          "pipe_tmt1",
          "pipe_tmp1",
          "pipe_tst4k",
          "pipe_tmt4k",
          "pipe_tmp4k",
          "conn_accept",
          "close_tcp",
        ];
        this.libmicro_selected = this.t_headers;
      }
    },
    radioChange() {
      this.getVersionData();
      this.getSelectGroup(this.os_version);
      this.getTableHeaders();
      this.getTransferData();
    },
    getVersionData() {
      this.checkQuery.filter.suite = [this.suite];
      this.checkQuery.filter.os_version = [];
      this.checkQuery.field = "os_version";
      this.groupData = [];
      this.group_id_a = "";
      this.group_id_b = "";

      QueryField(this.checkQuery).then((res) => {
        this.versionData = res;
      });
    },
    getSelectGroup(os_version) {
      this.checkQuery.filter.os_version = [os_version];
      this.checkQuery.field = "group_id";
      this.group_id_a = "";
      this.group_id_b = "";

      QueryField(this.checkQuery).then((res) => {
        this.groupData = res;
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
        var echart_params = echart_data[index].test_params;

        this.drawEchart(
          echart_title,
          echart_params,
          index,
          "average",
          "line",
          echart_data[index].datas.average
        );

        this.drawEchart(
          echart_title,
          echart_params,
          index,
          "change",
          "bar",
          echart_data[index].datas.change
        );
      });
    },
    drawEchart(
      echart_title,
      echart_params,
      index,
      data_type,
      echart_type,
      e_data
    ) {
      var echart_id =
        data_type +
        "_" +
        echart_title.replace(".", "_") +
        "_" +
        index +
        "_" +
        echart_params.replace(/\.|\s/g, "_");

      if (e_data.length == 0) {
        return;
      }
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
      this.clean_data();
      if (this.suite === "lmbench3") {
        this.lmbench_data_a.QueryData.filter.os_version = [this.os_version];
        this.lmbench_data_b.QueryData.filter.os_version = [this.os_version];
        this.lmbench_data_c.QueryData.filter.os_version = [this.os_version];
        this.lmbench_data_d.QueryData.filter.os_version = [this.os_version];
        this.lmbench_data_e.QueryData.filter.os_version = [this.os_version];
        this.lmbench_data_f.QueryData.filter.os_version = [this.os_version];
        if (this.group_id_a == "" || this.group_id_b == "") {
          this.lmbench_data_a.QueryData.filter.group_id = [];
          this.lmbench_data_b.QueryData.filter.group_id = [];
          this.lmbench_data_c.QueryData.filter.group_id = [];
          this.lmbench_data_d.QueryData.filter.group_id = [];
          this.lmbench_data_e.QueryData.filter.group_id = [];
          this.lmbench_data_f.QueryData.filter.group_id = [];
        } else {
          this.lmbench_data_a.QueryData.filter.group_id = [
            this.group_id_a,
            this.group_id_b,
          ];
          this.lmbench_data_b.QueryData.filter.group_id = [
            this.group_id_a,
            this.group_id_b,
          ];
          this.lmbench_data_c.QueryData.filter.group_id = [
            this.group_id_a,
            this.group_id_b,
          ];
          this.lmbench_data_d.QueryData.filter.group_id = [
            this.group_id_a,
            this.group_id_b,
          ];
          this.lmbench_data_e.QueryData.filter.group_id = [
            this.group_id_a,
            this.group_id_b,
          ];
          this.lmbench_data_f.QueryData.filter.group_id = [
            this.group_id_a,
            this.group_id_b,
          ];
        }
        this.getData(this.lmbench_data_a);
        this.sleep(50).then(() => {
          this.getData(this.lmbench_data_b);
        });
        this.sleep(500).then(() => {
          this.getData(this.lmbench_data_c);
        });
        this.sleep(1000).then(() => {
          this.getData(this.lmbench_data_d);
        });
        this.sleep(1000).then(() => {
          this.getData(this.lmbench_data_e);
        });
        this.sleep(2000).then(() => {
          this.getData(this.lmbench_data_f);
        });
      }
      if (this.suite === "unixbench") {
        this.unixbench_data.QueryData.filter.os_version = [this.os_version];
        if (this.group_id_a == "" || this.group_id_b == "") {
          this.unixbench_data.QueryData.filter.group_id = [];
        } else {
          this.unixbench_data.QueryData.filter.group_id[0] = this.group_id_a;
          this.unixbench_data.QueryData.filter.group_id[1] = this.group_id_b;
        }
        this.getData(this.unixbench_data);
      }
      if (this.suite === "libmicro") {
        this.libmicro_data.QueryData.filter.os_version = [this.os_version];
        if (this.group_id_a == "" || this.group_id_b == "") {
          this.libmicro_data.QueryData.filter.group_id = [];
        } else {
          this.libmicro_data.QueryData.filter.group_id[0] = this.group_id_a;
          this.libmicro_data.QueryData.filter.group_id[1] = this.group_id_b;
        }
        this.getData(this.libmicro_data);
      }
      if (this.suite === "stream") {
        this.stream_data.QueryData.filter.os_version = [this.os_version];
        if (this.group_id_a == "" || this.group_id_b == "") {
          this.stream_data.QueryData.filter.group_id = [];
        } else {
          this.stream_data.QueryData.filter.group_id[0] = this.group_id_a;
          this.stream_data.QueryData.filter.group_id[1] = this.group_id_b;
        }
        this.getData(this.stream_data);
      }
      if (this.suite === "fio-basic") {
        this.fio_data.QueryData.filter.os_version = [this.os_version];
        this.fio_data_b.QueryData.filter.os_version = [this.os_version];
        this.fio_data_c.QueryData.filter.os_version = [this.os_version];
        if (this.group_id_a == "" || this.group_id_b == "") {
          this.fio_data.QueryData.filter.group_id = [];
          this.fio_data_b.QueryData.filter.group_id = [];
          this.fio_data_c.QueryData.filter.group_id = [];
        } else {
          this.fio_data.QueryData.filter.group_id[0] = this.group_id_a;
          this.fio_data.QueryData.filter.group_id[1] = this.group_id_b;
          this.fio_data_b.QueryData.filter.group_id[0] = this.group_id_a;
          this.fio_data_b.QueryData.filter.group_id[1] = this.group_id_b;
          this.fio_data_c.QueryData.filter.group_id[0] = this.group_id_a;
          this.fio_data_c.QueryData.filter.group_id[1] = this.group_id_b;
        }
        this.getData(this.fio_data);
        this.sleep(200).then(() => {
          this.getData(this.fio_data_b);
        });
        this.sleep(400).then(() => {
          this.getData(this.fio_data_c);
        });
      }
      if (this.suite === "netperf") {
        this.netperfb_data.QueryData.filter.os_version = [this.os_version];
        this.netperfa_data.QueryData.filter.os_version = [this.os_version];
        if (this.group_id_a == "" || this.group_id_b == "") {
          this.netperfb_data.QueryData.filter.group_id = [];
          this.netperfa_data.QueryData.filter.group_id = [];
        } else {
          this.netperfb_data.QueryData.filter.group_id[0] = this.group_id_a;
          this.netperfb_data.QueryData.filter.group_id[1] = this.group_id_b;
          this.netperfa_data.QueryData.filter.group_id[0] = this.group_id_a;
          this.netperfa_data.QueryData.filter.group_id[1] = this.group_id_b;
        }
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
    setStyle(worksheet) {
      worksheet["!cols"] = [{ wpx: 300 }];

      for (var k in worksheet) {
        if (k.includes("!") || worksheet[k].v === "") {
          continue;
        }
        worksheet[k].s = {
          border: {
            top: {
              style: "thin",
            },
            bottom: {
              style: "thin",
            },
            left: {
              style: "thin",
            },
            right: {
              style: "thin",
            },
          },
        };
        if (k.includes("1")) {
          worksheet[k].s.alignment = {
            horizontal: "center",
            vertical: "center",
            wrapText: true,
          };
          worksheet[k].s.fill = {
            bgColor: {
              indexed: 64,
            },
            fgColor: {
              rgb: "92d050",
            },
          };
        }
        if (worksheet[k]["t"] == "s" && worksheet[k]["v"].includes("vs")) {
          worksheet[k].s.alignment = {
            wrapText: true,
          };
          worksheet[k].s.fill = {
            bgColor: {
              indexed: 64,
            },
            fgColor: {
              rgb: "FFFF00",
            },
          };
        } else {
          var col_head = "A" + k.replace(/[A-Z]{1,}/, "");
          if (worksheet[col_head].v.includes("vs")) {
            worksheet[k].z = "0.00%";
            if (worksheet[k].v > 0.1) {
              worksheet[k].s.fill = {
                bgColor: {
                  indexed: 64,
                },
                fgColor: {
                  rgb: "00B050",
                },
              };
            }
            if (worksheet[k].v < -0.1) {
              worksheet[k].s.fill = {
                bgColor: {
                  indexed: 64,
                },
                fgColor: {
                  rgb: "FF0000",
                },
              };
            }
          }
        }
      }
    },
    getExcel() {
      var c_children = document.getElementById("container").children;
      let wb = XLSX.utils.book_new();
      var used_name = {};

      for (var i = 0; i < c_children.length; i++) {
        var el_table = c_children[i].children[1];
        let sheet = XLSX.utils.table_to_sheet(el_table);
        this.setStyle(sheet);
        var sheet_name = sheet["A1"].v;
        if (sheet_name == "Function") sheet_name = this.suite;
        if (used_name[sheet_name] == null) {
          used_name[sheet_name] = 1;
        } else {
          used_name[sheet_name]++;
        }
        if (used_name[sheet_name] > 1) {
          sheet_name = sheet_name + (used_name[sheet_name] - 1);
        }
        XLSX.utils.book_append_sheet(wb, sheet, sheet_name);
      }
      let wbout = XLSXS.write(wb, {
        book_Type: "xlsx",
        bookSST: false,
        type: "binary",
      });
      filesaver.saveAs(
        new Blob([this.s2ab(wbout)], { type: "application/octet-stream" }),
        "测试数据.xlsx"
      );
    },
    s2ab(s) {
      let buf = null;

      if (typeof ArrayBuffer !== "undefined") {
        buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);

        for (let i = 0; i != s.length; ++i) {
          view[i] = s.charCodeAt(i) & 0xff;
        }

        return buf;
      }

      buf = new Array(s.length);

      for (let i = 0; i != s.length; ++i) {
        buf[i] = s.charCodeAt(i) & 0xff;
      }

      return buf;
    },
    stream_filter(s_headers) {
      var checkedHeaders;
      checkedHeaders = this.stream_selected;
      var headers = [];
      headers.push(s_headers[0]);

      var tmp = checkedHeaders.filter(function (v) {
        return s_headers.indexOf(v) > -1;
      });
      headers = headers.concat(tmp);
      return headers;
    },
    netperf_filter(s_headers) {
      var checkedHeaders;
      checkedHeaders = this.netperf_selected;
      var headers = [];
      headers.push(s_headers[0]);

      var tmp = checkedHeaders.filter(function (v) {
        return s_headers.indexOf(v) > -1;
      });
      headers = headers.concat(tmp);
      return headers;
    },
    unixbench_filter(s_headers) {
      var checkedHeaders;
      checkedHeaders = this.unixbench_selected;
      var headers = [];
      headers.push(s_headers[0]);

      var tmp = checkedHeaders.filter(function (v) {
        return s_headers.indexOf(v) > -1;
      });
      headers = headers.concat(tmp);
      return headers;
    },
    lmbench3_filter(s_headers) {
      var checkedHeaders;
      checkedHeaders = this.lmbench3_selected;
      var headers = [];
      headers.push(s_headers[0]);

      var tmp = checkedHeaders.filter(function (v) {
        return s_headers.indexOf(v) > -1;
      });
      headers = headers.concat(tmp);
      return headers;
    },
    libmicro_filter(s_headers) {
      var checkedHeaders;
      checkedHeaders = this.libmicro_selected;
      var headers = [];
      headers.push(s_headers[0]);

      var tmp = checkedHeaders.filter(function (v) {
        return s_headers.indexOf(v) > -1;
      });
      headers = headers.concat(tmp);
      return headers;
    },
    fio_filter(s_headers) {
      var checkedHeaders;
      checkedHeaders = this.fio_selected;
      var headers = [];
      headers.push(s_headers[0]);

      var tmp = checkedHeaders.filter(function (v) {
        return s_headers.indexOf(v) > -1;
      });
      headers = headers.concat(tmp);
      return headers;
    },
    getTransferData() {
      this.transfer_data = [];
      this.transfer_chosen = [];
      for (var i = 0; i < this.t_headers.length; i++) {
        this.transfer_data.push({
          key: i,
          label: this.t_headers[i],
        });
        this.transfer_chosen.push(i);
      }
    },
    transferChange() {
      if (this.suite == "stream") {
        this.stream_selected = [];
        for (var i = 0; i < this.transfer_chosen.length; i++) {
          var index = this.transfer_chosen[i];
          this.stream_selected[i] = this.transfer_data[index].label;
        }
      } else if (this.suite == "netperf") {
        this.netperf_selected = [];
        for (i = 0; i < this.transfer_chosen.length; i++) {
          index = this.transfer_chosen[i];
          this.netperf_selected[i] = this.transfer_data[index].label;
        }
      } else if (this.suite == "unixbench") {
        this.unixbench_selected = [];
        for (i = 0; i < this.transfer_chosen.length; i++) {
          index = this.transfer_chosen[i];
          this.unixbench_selected[i] = this.transfer_data[index].label;
        }
      } else if (this.suite == "lmbench3") {
        this.lmbench3_selected = [];
        for (i = 0; i < this.transfer_chosen.length; i++) {
          index = this.transfer_chosen[i];
          this.lmbench3_selected[i] = this.transfer_data[index].label;
        }
      } else if (this.suite == "libmicro") {
        this.libmicro_selected = [];
        for (i = 0; i < this.transfer_chosen.length; i++) {
          index = this.transfer_chosen[i];
          this.libmicro_selected[i] = this.transfer_data[index].label;
        }
      } else if (this.suite == "fio-basic") {
        this.fio_selected = [];
        for (i = 0; i < this.transfer_chosen.length; i++) {
          index = this.transfer_chosen[i];
          this.fio_selected[i] = this.transfer_data[index].label;
        }
      }
    },
  },
  computed: {},
  mounted() {
    this.getVersionData();
    this.getTableHeaders();
    this.getTransferData();
    if (this.suite === "lmbench3") {
      this.getData(this.lmbench_data_a);
      this.getData(this.lmbench_data_b);
      this.getData(this.lmbench_data_c);
      this.getData(this.lmbench_data_d);
      this.getData(this.lmbench_data_e);
      this.getData(this.lmbench_data_f);
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
      this.sleep(200).then(() => {
        this.getData(this.fio_data_b);
      });
      this.sleep(200).then(() => {
        this.getData(this.fio_data_c);
      });
    }
    if (this.suite === "netperf") {
      this.getData(this.netperfb_data);

      this.sleep(200).then(() => {
        this.getData(this.netperfa_data);
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
  margin-left: 80%;
}
.containers {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 700px;
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
  background: #0c5c02;
}
</style>