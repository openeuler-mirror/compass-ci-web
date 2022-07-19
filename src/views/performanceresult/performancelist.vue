
<template>
  <div id="CustomErrorBar">
    <Header class="main-header"></Header>
    <h1 class="title">Performance Result</h1>
    <div class="content">
      <div style="background-color: #eeeeee; float: left">
        <p style="text-align: center; margin-top: 10px; margin-bottom: 10px">
          <font size="5">比较基线</font>
        </p>
        <div style="float: left">
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
      </div>

      <div style="float: right">
        <el-form>
          <el-form-item>
            <el-button @click="addObject">增加</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="delObject">删除</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div
        id="compareObject"
        style="background-color: #eeeeee; float: right; margin-right: 20px"
      >
        <p style="text-align: center; margin-top: 10px; margin-bottom: 10px">
          <font size="5">对比对象</font>
        </p>
        <div style="float: left">
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
        <div
          v-for="(obj, index) in compare_object"
          :key="index"
          style="float: left"
        >
          <el-form>
            <el-form-item class="input_class">
              <el-select
                v-model="obj.os"
                filterable
                placeholder="请选择"
                size="medium"
                clearable
                @change="selectChangeVersion(index, obj.os)"
              >
                <el-option
                  v-for="item in osData"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="input_class">
              <el-select
                v-model="obj.os_version"
                filterable
                placeholder="请选择"
                size="medium"
                clearable
                @change="getSelectGroup(index, obj.os_version)"
              >
                <el-option
                  v-for="item in obj.versionData"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="input_class">
              <el-select
                v-model="obj.group_id"
                filterable
                placeholder="请选择"
                size="medium"
                clearable
              >
                <el-option
                  v-for="item in obj.groupData"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
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
            :titles="['可选表头项', '已选表头项']"
            v-model="transfer_chosen"
            :data="transfer_data"
            @change="transferChange"
          >
          </el-transfer>
        </div>
      </div>
    </div>
    <div id="container" class="containers">
      <div>
        <el-dialog :title="testbox" :visible.sync="dialogTableVisible">
          <textarea
            v-model="textData"
            style="font-size: 15pt; width: 100%"
            rows="33"
            disabled
          ></textarea>
        </el-dialog>
      </div>
      <div v-show="im_show">
        <el-table
          :data="table_improve"
          border
          :header-cell-style="{ background: '#ffc000', color: '#000' }"
          style="width: 500px"
        >
          <el-table-column
            :label="suite"
            prop="compare_versions"
          ></el-table-column>
          <el-table-column
            label="总体性能提升比例"
            prop="improvement"
            width="150"
          ></el-table-column>
        </el-table>
      </div>
      <div
        v-for="(l_item, l_index) in unixbench_data.table_data"
        :key="l_index"
      >
        <div class="test_params" style="float: left" v-show="false">
          test_params: {{ l_item.test_params }}
        </div>
        <div style="float: right">
          <el-form>
            <el-form-item>
              <el-button @click="getHostInfo(l_item.testbox)"
                >host info</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div>
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
        </div>

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

      <div v-for="(t_item, t_index) in libmicro_data.table_data" :key="t_index">
        <div class="test_params" style="float: left" v-show="false">
          test_params: {{ t_item.test_params }}
        </div>
        <div style="float: right">
          <el-form>
            <el-form-item>
              <el-button @click="getHostInfo(t_item.testbox)"
                >host info</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div>
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
        </div>

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
        <div class="test_params" style="float: left" v-show="false">
          test_params: {{ t_item.test_params }}
        </div>
        <div style="float: right">
          <el-form>
            <el-form-item>
              <el-button @click="getHostInfo(t_item.testbox)"
                >host info</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div>
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
        </div>

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
        <div class="test_params" style="float: left" v-show="false">
          test_params: {{ t_item.test_params }}
        </div>
        <div style="float: right">
          <el-form>
            <el-form-item>
              <el-button @click="getHostInfo(t_item.testbox)"
                >host info</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div>
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
        </div>

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
        <div class="test_params" style="float: left" v-show="false">
          test_params: {{ t_item.test_params }}
        </div>
        <div style="float: right">
          <el-form>
            <el-form-item>
              <el-button @click="getHostInfo(t_item.testbox)"
                >host info</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div>
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
        </div>

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
        <div class="test_params" style="float: left" v-show="false">
          test_params: {{ t_item.test_params }}
        </div>
        <div style="float: right">
          <el-form>
            <el-form-item>
              <el-button @click="getHostInfo(t_item.testbox)"
                >host info</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div>
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
        </div>

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

      <div
        v-for="(t_item, t_index) in lmbench_data_a.table_data"
        :key="t_index"
      >
        <div class="test_params" style="float: left" v-show="false">
          test_params: {{ t_item.test_params }}
        </div>
        <div style="float: right">
          <el-form>
            <el-form-item>
              <el-button @click="getHostInfo(t_item.testbox)"
                >host info</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-table
            :data="t_item.data"
            border
            :header-cell-style="{ background: '#02951e', color: '#000' }"
            :row-style="tableRowStyle"
            :cell-style="tableCellStyle"
            style="width: 1500px"
          >
            <el-table-column
              v-for="(item, index) in lmbench3_filter(t_item.header)"
              :key="index"
              :label="item"
              :prop="item"
            ></el-table-column>
          </el-table>
        </div>

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

      <div
        v-for="(t_item, t_index) in lmbench_data_b.table_data"
        :key="t_index"
      >
        <div class="test_params" style="float: left" v-show="false">
          test_params: {{ t_item.test_params }}
        </div>
        <div style="float: right">
          <el-form>
            <el-form-item>
              <el-button @click="getHostInfo(t_item.testbox)"
                >host info</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-table
            :data="t_item.data"
            border
            :header-cell-style="{ background: '#02951e', color: '#000' }"
            :row-style="tableRowStyle"
            :cell-style="tableCellStyle"
            style="width: 1500px"
          >
            <el-table-column
              v-for="(item, index) in lmbench3_filter(t_item.header)"
              :key="index"
              :label="item"
              :prop="item"
            ></el-table-column>
          </el-table>
        </div>

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

      <div
        v-for="(t_item, t_index) in lmbench_data_c.table_data"
        :key="t_index"
      >
        <div class="test_params" style="float: left" v-show="false">
          test_params: {{ t_item.test_params }}
        </div>
        <div style="float: right">
          <el-form>
            <el-form-item>
              <el-button @click="getHostInfo(t_item.testbox)"
                >host info</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-table
            :data="t_item.data"
            border
            :header-cell-style="{ background: '#02951e', color: '#000' }"
            :row-style="tableRowStyle"
            :cell-style="tableCellStyle"
            style="width: 1500px"
          >
            <el-table-column
              v-for="(item, index) in lmbench3_filter(t_item.header)"
              :key="index"
              :label="item"
              :prop="item"
            ></el-table-column>
          </el-table>
        </div>

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

      <div
        v-for="(t_item, t_index) in lmbench_data_d.table_data"
        :key="t_index"
      >
        <div class="test_params" style="float: left" v-show="false">
          test_params: {{ t_item.test_params }}
        </div>
        <div style="float: right">
          <el-form>
            <el-form-item>
              <el-button @click="getHostInfo(t_item.testbox)"
                >host info</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-table
            :data="t_item.data"
            border
            :header-cell-style="{ background: '#02951e', color: '#000' }"
            :row-style="tableRowStyle"
            :cell-style="tableCellStyle"
            style="width: 1500px"
          >
            <el-table-column
              v-for="(item, index) in lmbench3_filter(t_item.header)"
              :key="index"
              :label="item"
              :prop="item"
            ></el-table-column>
          </el-table>
        </div>

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

      <div
        v-for="(t_item, t_index) in lmbench_data_e.table_data"
        :key="t_index"
      >
        <div class="test_params" style="float: left" v-show="false">
          test_params: {{ t_item.test_params }}
        </div>
        <div style="float: right">
          <el-form>
            <el-form-item>
              <el-button @click="getHostInfo(t_item.testbox)"
                >host info</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-table
            :data="t_item.data"
            border
            :header-cell-style="{ background: '#02951e', color: '#000' }"
            :row-style="tableRowStyle"
            :cell-style="tableCellStyle"
            style="width: 1500px"
          >
            <el-table-column
              v-for="(item, index) in lmbench3_filter(t_item.header)"
              :key="index"
              :label="item"
              :prop="item"
            ></el-table-column>
          </el-table>
        </div>

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

      <div
        v-for="(t_item, t_index) in lmbench_data_f.table_data"
        :key="t_index"
      >
        <div class="test_params" style="float: left" v-show="false">
          test_params: {{ t_item.test_params }}
        </div>
        <div style="float: right">
          <el-form>
            <el-form-item>
              <el-button @click="getHostInfo(t_item.testbox)"
                >host info</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-table
            :data="t_item.data"
            border
            :header-cell-style="{ background: '#02951e', color: '#000' }"
            :row-style="tableRowStyle"
            :cell-style="tableCellStyle"
            style="width: 1500px"
          >
            <el-table-column
              v-for="(item, index) in lmbench3_filter(t_item.header)"
              :key="index"
              :label="item"
              :prop="item"
            ></el-table-column>
          </el-table>
        </div>

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
        <div class="test_params" style="float: left" v-show="false">
          test_params: {{ l_item.test_params }}
        </div>
        <div style="float: right">
          <el-form>
            <el-form-item>
              <el-button @click="getHostInfo(l_item.testbox)"
                >host info</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div>
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
        </div>

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

      <div v-for="(l_item, l_index) in netperfa_data.table_data" :key="l_index">
        <div class="test_params" style="float: left" v-show="false">
          test_params: {{ l_item.test_params }}
        </div>
        <div style="float: right">
          <el-form>
            <el-form-item>
              <el-button @click="getHostInfo(l_item.testbox)"
                >host info</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div>
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
        </div>

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
    </div>
  </div>
</template>

<script>
import { getPerformanceResult, QueryField, getHostInfo } from "@/api/jobs.js";
import Header from "@/components/Header";
import echarts from "echarts";
import XLSX from "xlsx";
import XLSXS from "xlsx-style";
import filesaver from "file-saver";
export default {
  name: "CustomErrorBar",
  components: { Header },
  data() {
    return {
      textData: "",
      testbox: "",
      dialogTableVisible: false,
      stream_selected: [],
      netperf_selected: [],
      unixbench_selected: [],
      lmbench3_selected: [],
      libmicro_selected: [],
      fio_selected: [],
      t_headers: ["copy", "scale", "add", "triad"],
      transfer_data: [],
      transfer_chosen: [],
      compare_object: [],
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
      lmbench_data_a: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: { suite: ["lmbench3"], group_id: [] },
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
          series: [
            { os: "openeuler", os_version: "21.03-iso" },
            { os: "openeuler", os_version: "21.09-iso" },
          ],
          x_params: ["metric"],
          title: "Processor_Processes",
        },
      },
      lmbench_data_b: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: { suite: ["lmbench3"], group_id: [] },
          metrics: [
            "lmbench3.PIPE.latency.us",
            "lmbench3.AF_UNIX.sock.stream.latency.us",
            "lmbench3.UDP.usinglocalhost.latency.us",
            "lmbench3.TCP.localhost.latency",
            "lmbench3.CONNECT.localhost.latency.us",
          ],
          series: [
            { os: "openeuler", os_version: "21.03-iso" },
            { os: "openeuler", os_version: "21.09-iso" },
          ],
          x_params: ["metric"],
          title: "local_latency",
        },
      },
      lmbench_data_c: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: { suite: ["lmbench3"], group_id: [] },
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
          series: [
            { os: "openeuler", os_version: "21.03-iso" },
            { os: "openeuler", os_version: "21.09-iso" },
          ],
          x_params: ["metric"],
          title: "local_bandwidths",
        },
      },
      lmbench_data_d: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: { suite: ["lmbench3"], group_id: [] },
          metrics: [
            "lmbench3.CTX.2P.0K.latency.us",
            "lmbench3.CTX.2P.16K.latency.us",
            "lmbench3.CTX.2P.64K.latency.us",
            "lmbench3.CTX.8P.16K.latency.us",
            "lmbench3.CTX.8P.64K.latency.us",
            "lmbench3.CTX.16P.16K.latency.us",
            "lmbench3.CTX.16P.64K.latency.us",
          ],
          series: [
            { os: "openeuler", os_version: "21.03-iso" },
            { os: "openeuler", os_version: "21.09-iso" },
          ],
          x_params: ["metric"],
          title: "Context_switching",
        },
      },
      lmbench_data_e: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: { suite: ["lmbench3"], group_id: [] },
          metrics: [
            "lmbench3.Mmap_Latency",
            "lmbench3.Prot_Fault",
            "lmbench3.Pagefaults.ms",
            "lmbench3.Select.100fd.latency.us",
          ],
          series: [
            { os: "openeuler", os_version: "21.03-iso" },
            { os: "openeuler", os_version: "21.09-iso" },
          ],
          x_params: ["metric"],
          title: "VM_latencies",
        },
      },
      lmbench_data_f: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: { suite: ["lmbench3"], group_id: [] },
          metrics: [
            "lmbench3.L1_$",
            "lmbench3.L2_$",
            "lmbench3.Main_mem",
            "lmbench3.Rand_mem",
          ],
          series: [
            { os: "openeuler", os_version: "21.03-iso" },
            { os: "openeuler", os_version: "21.09-iso" },
          ],
          x_params: ["metric"],
          title: "Memor_latencies",
          test_params: ["pp.lmbench3.nr_threads"],
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
          filter: {
            suite: ["fio-basic"],
            "pp.fio-setup-basic.rw": ["randrw"],
            group_id: [],
          },
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
          test_params: ["pp.fio-setup-basic.rw"],
        },
      },
      fio_data_b: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: {
            suite: ["fio-basic"],
            "pp.fio-setup-basic.rw": ["read", "randread"],
            group_id: [],
          },
          metrics: ["fio.read_iops", "fio.read_bw_MBps"],
          series: [
            { os: "openeuler", os_version: "21.03-iso" },
            { os: "openeuler", os_version: "21.09-iso" },
          ],
          x_params: ["bs"],
          test_params: ["pp.fio-setup-basic.rw"],
        },
      },
      fio_data_c: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: {
            suite: ["fio-basic"],
            "pp.fio-setup-basic.rw": ["write", "randwrite"],
            group_id: [],
          },
          metrics: ["fio.write_iops", "fio.wirte_bw_MBps"],
          series: [
            { os: "openeuler", os_version: "21.03-iso" },
            { os: "openeuler", os_version: "21.09-iso" },
          ],
          x_params: ["bs"],
          test_params: ["pp.fio-setup-basic.rw"],
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
            "pp.netperf.test": ["TCP_RR", "TCP_CRR", "UDP_RR"],
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
      improve_percent: {},
      table_improve: [],
      im_show: false,
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
      /*
      原始表头 title_trans:
        fio-read_iops
        fio-write_iops
        fio-read_bw_MBps
        fio-write_bw_MBps
      无法声明fio测试的读写方式，需结合sData.test_params中的pp.fio-setup-basic.rw参数，声明读写方式。

      sData.test_params:
        "pp.fio-setup-basic.rw=randrw pp.fio-setup-basic.rwmixread=70"
      found:  ["pp.fio-setup-basic.rw=randrw",
                index: 0,
                input: "pp.fio-setup-basic.rw=randrw pp.fio-setup-basic.rwmixread=70",
                groups: undefined]
      rw: randrw
      title_trans:
        fio-read_iops --> randrwread_iop_blocksize
      */
      var re = /pp.fio-setup-basic.rw=\w+\S/i;
      var found = sData.test_params.match(re);
      var rw = found[0].split("=")[1];
      if (rw == "randrw") {
        var read_or_write = title_trans.replace("fio-", "").split("_")[0];
        rw = rw + read_or_write;
      }
      if (title_trans == "fio-read_iops" || title_trans == "fio-write_iops") {
        if (sData.test_params.includes("pp.fio-setup-basic.rw")) {
          title_trans = rw + "_iops_blocksize";
        }
      }
      if (title_trans == "fio-read_bw_MBps" || title_trans == "fio-write_bw_MBps") {
        if (sData.test_params.includes("pp.fio-setup-basic.rw")) {
          title_trans = rw + "_bw_blocksize";
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
        test_params: sData.test_params,
        testbox: sData.testbox,
      });
    },
    getRowData(title, data) {
      var tmp = {};
      tmp[title] = data.series;

      if (data.series.includes("vs")) {
        if (this.improve_percent[data.series] == null) {
          this.improve_percent[data.series] = { total: 0, num: 0, percent:0 };
        }
        for (var i = 0; i < data.x_params.length; i++) {
          tmp[data.x_params[i]] = data.data[i] + "%";
          this.improve_percent[data.series].total += data.data[i];
          this.improve_percent[data.series].num += 1;
        }
        this.improve_percent[data.series].percent = this.improve_percent[data.series].total / this.improve_percent[data.series].num;
        this.table_improve = [{"compare_versions": data.series, "improvement": this.improve_percent[data.series].percent.toFixed(4) + "%"}];
        this.im_show = true;
      } else {
        for (i = 0; i < data.x_params.length; i++) {
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
        JobData.echart_data = this.transfer_res(res);
        var sourceData = JobData.echart_data;

        for (var i = 0; i < sourceData.length; i++) {
          this.getTableData(sourceData[i], JobData.table_data);
        }
        this.sleep(2000).then(() => {
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
      this.getosData();
      this.getSelectVersiona(this.os_a);
      this.getSelectVersionb(this.os_b);
      this.getSelectGroupa(this.os_version_a);
      this.getSelectGroupb(this.os_version_b);
      this.getTableHeaders();
      this.getTransferData();
      this.improve_percent = {};
      this.table_improve = [];
      this.im_show = false;
      for (var index = 0; index < this.compare_object.length; index++) {
        this.getSelectVersion(index, this.compare_object[index].os);
        this.getSelectGroup(index, this.compare_object[index].os_version);
      }
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
    selectChangeVersion(index, os) {
      this.compare_object[index].os_version = "";
      this.getSelectVersion(index, os);
    },
    getSelectVersion(index, os) {
      this.compare_object[index].group_id = "";
      this.compare_object[index].versionData = [];
      this.compare_object[index].groupData = [];
      var checkQuery = this.compare_object[index].checkQuery;

      checkQuery.filter.suite = [this.suite];
      checkQuery.filter.os = [os];
      checkQuery.filter.os_version = [];
      checkQuery.field = "os_version";
      QueryField(checkQuery).then((res) => {
        this.compare_object[index].versionData = res;
      });
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
    getSelectGroup(index, os_version) {
      this.compare_object[index].group_id = "";
      this.compare_object[index].groupData = [];
      var checkQuery = this.compare_object[index].checkQuery;

      checkQuery.filter.suite = [this.suite];
      checkQuery.filter.os_version = [os_version];
      checkQuery.field = "group_id";
      QueryField(checkQuery).then((res) => {
        this.compare_object[index].groupData = res;
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
    groupIdEmpty() {
      for (var i = 0; i < this.compare_object.length; i++) {
        if (this.compare_object[i].group_id == "") {
          return true;
        }
      }
      return false;
    },
    queryCharts() {
      var series = [
        { os: this.os_a, os_version: this.os_version_a },
        { os: this.os_b, os_version: this.os_version_b },
      ];
      for (var i = 0; i < this.compare_object.length; i++) {
        var every_set = {
          os: this.compare_object[i].os,
          os_version: this.compare_object[i].os_version,
        };
        series.push(every_set);
      }
      this.lmbench_data_a.QueryData.series = series;
      this.lmbench_data_b.QueryData.series = series;
      this.lmbench_data_c.QueryData.series = series;
      this.lmbench_data_d.QueryData.series = series;
      this.lmbench_data_e.QueryData.series = series;
      this.lmbench_data_f.QueryData.series = series;

      this.unixbench_data.QueryData.series = series;

      this.libmicro_data.QueryData.series = series;

      this.stream_data.QueryData.series = series;

      this.netperfa_data.QueryData.series = series;
      this.netperfb_data.QueryData.series = series;

      this.fio_data.QueryData.series = series;
      this.fio_data_b.QueryData.series = series;
      this.fio_data_c.QueryData.series = series;

      if (
        this.group_id_a == "" ||
        this.group_id_b == "" ||
        this.groupIdEmpty()
      ) {
        this.lmbench_data_a.QueryData.filter.group_id = [];
        this.lmbench_data_b.QueryData.filter.group_id = [];
        this.lmbench_data_c.QueryData.filter.group_id = [];
        this.lmbench_data_d.QueryData.filter.group_id = [];
        this.lmbench_data_e.QueryData.filter.group_id = [];
        this.lmbench_data_f.QueryData.filter.group_id = [];
        this.unixbench_data.QueryData.filter.group_id = [];
        this.libmicro_data.QueryData.filter.group_id = [];
        this.stream_data.QueryData.filter.group_id = [];
        this.netperfa_data.QueryData.filter.group_id = [];
        this.netperfb_data.QueryData.filter.group_id = [];
        this.fio_data.QueryData.filter.group_id = [];
        this.fio_data_b.QueryData.filter.group_id = [];
        this.fio_data_c.QueryData.filter.group_id = [];
      } else {
        var group_ids = [this.group_id_a, this.group_id_b];
        for (i = 0; i < this.compare_object.length; i++) {
          var every_group_id = this.compare_object[i].group_id;
          if (every_group_id != "") {
            group_ids.push(every_group_id);
          }
        }
        this.lmbench_data_a.QueryData.filter.group_id = group_ids;
        this.lmbench_data_b.QueryData.filter.group_id = group_ids;
        this.lmbench_data_c.QueryData.filter.group_id = group_ids;
        this.lmbench_data_d.QueryData.filter.group_id = group_ids;
        this.lmbench_data_e.QueryData.filter.group_id = group_ids;
        this.lmbench_data_f.QueryData.filter.group_id = group_ids;

        this.unixbench_data.QueryData.filter.group_id = group_ids;
        this.libmicro_data.QueryData.filter.group_id = group_ids;
        this.stream_data.QueryData.filter.group_id = group_ids;
        this.netperfa_data.QueryData.filter.group_id = group_ids;
        this.netperfb_data.QueryData.filter.group_id = group_ids;

        this.fio_data.QueryData.filter.group_id = group_ids;
        this.fio_data_b.QueryData.filter.group_id = group_ids;
        this.fio_data_c.QueryData.filter.group_id = group_ids;
      }

      this.clean_data();
      if (this.suite === "lmbench3") {
        this.getData(this.lmbench_data_a);
        this.sleep(100).then(() => {
          this.getData(this.lmbench_data_b);
        });
        this.sleep(200).then(() => {
          this.getData(this.lmbench_data_c);
        });
        this.sleep(300).then(() => {
          this.getData(this.lmbench_data_d);
        });
        this.sleep(1000).then(() => {
          this.getData(this.lmbench_data_e);
        });
        this.sleep(1900).then(() => {
          this.getData(this.lmbench_data_f);
        });
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
        this.sleep(400).then(() => {
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

      if (c_children.length < 2) {
        this.$message("导出失败");
        return;
      }

      for (var i = 2; i < c_children.length; i++) {
        var el_table = c_children[i].children[2];
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
    addObject() {
      var obj = {
        os: "",
        os_version: "",
        group_id: "",
        versionData: [],
        groupData: [],
        checkQuery: {
          filter: {
            suite: [this.suite],
            os: [],
            os_version: [],
          },
          field: "os",
        },
      };
      this.compare_object.push(obj);
    },
    delObject() {
      this.compare_object.pop();
    },
    getHostInfo(testbox) {
      this.testbox = testbox;
      getHostInfo({ testbox: testbox }).then((res) => {
        this.textData = JSON.stringify(res, null, "\t");
        this.dialogTableVisible = true;
      });
    },
  },
  mounted() {
    this.getosData();
    this.getTableHeaders();
    this.getTransferData();
  },
};
</script>

<style lang='less' scoped>
.input_class {
  width: 85%;
}
.confirm {
  float: left;
  margin-left: 30%;
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
  background: #02851e;
}
</style>
