
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
                @change="selectChangeArcha"
              >
                <el-option
                  v-for="item in versionData_a"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="arch" label-width="120px" class="input_class">
              <el-select
                v-model="os_arch_a"
                filterable
                placeholder="请选择"
                size="medium"
                clearable
                @change="getSelectGroupa"
              >
                <el-option
                  v-for="item in archData_a"
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
                @change="selectChangeArchb"
              >
                <el-option
                  v-for="item in versionData_b"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="arch" label-width="120px" class="input_class">
              <el-select
                v-model="os_arch_b"
                filterable
                placeholder="请选择"
                size="medium"
                clearable
                @change="getSelectGroupb"
              >
                <el-option
                  v-for="item in archData_b"
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
                @change="selectChangeArch(index, obj.os, obj.os_version)"
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
                v-model="obj.os_arch"
                filterable
                placeholder="请选择"
                size="medium"
                clearable
                @change="getSelectGroup(index, obj.os, obj.os_version, obj.os_arch)"
              >
                <el-option
                  v-for="item in obj.archData"
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
            <el-radio label="speccpu-2006">speccpu-2006</el-radio>
            <el-radio label="speccpu-2017">speccpu-2017</el-radio>
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
        <div style="float: left; margin-left: 4%">
          <el-form>
            <el-form-item class="confirm">
              <el-button @click="getAllDataExcel">总体数据导出</el-button>
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
          style="width: 650px"
        >
          <el-table-column
            :label="suite"
            prop="compare_versions"
            width="350"
          ></el-table-column>
          <el-table-column
            label="总体性能提升比例"
            prop="improvement"
            v-if="!lmbench_show"
          ></el-table-column>
          <el-table-column
            label="latency提升比例"
            prop="latency_improvement"
            width="150"
            v-if="lmbench_show"
          ></el-table-column>
          <el-table-column
            label="bandwidth提升比例"
            prop="bandwidth_improvement"
            width="150"
            v-if="lmbench_show"
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

      <div v-for="(t_item, t_index) in speccpu_2006_data_a.table_data" :key="t_index">
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
              v-for="(item, index) in speccpu_2006_filter(t_item.header)"
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

      <div v-for="(t_item, t_index) in speccpu_2006_data_b.table_data" :key="t_index">
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
              v-for="(item, index) in speccpu_2006_filter(t_item.header)"
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

      <div v-for="(t_item, t_index) in speccpu_2006_data_c.table_data" :key="t_index">
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
              v-for="(item, index) in speccpu_2006_filter(t_item.header)"
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

      <div v-for="(t_item, t_index) in speccpu_2006_data_d.table_data" :key="t_index">
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
              v-for="(item, index) in speccpu_2006_filter(t_item.header)"
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

      <div v-for="(t_item, t_index) in speccpu_2017_data_a.table_data" :key="t_index">
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
              v-for="(item, index) in speccpu_2017_filter(t_item.header)"
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

      <div v-for="(t_item, t_index) in speccpu_2017_data_b.table_data" :key="t_index">
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
              v-for="(item, index) in speccpu_2017_filter(t_item.header)"
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

      <div v-for="(t_item, t_index) in speccpu_2017_data_c.table_data" :key="t_index">
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
              v-for="(item, index) in speccpu_2017_filter(t_item.header)"
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

      <div v-for="(t_item, t_index) in speccpu_2017_data_d.table_data" :key="t_index">
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
              v-for="(item, index) in speccpu_2017_filter(t_item.header)"
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
      speccpu_2006_selected: [],
      speccpu_2017_selected: [],
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
      archData_a: [],
      archData_b: [],
      versionData_a: [],
      versionData_b: [],
      groupData_a: [],
      groupData_b: [],
      checkQuery: {
        filter: {
          suite: [],
          os: [],
          os_arch: [],
          os_version: [],
          job_state: ["finished"],
        },
        field: "os",
      },
      checkQuery_b: {
        filter: {
          suite: [],
          os: [],
          os_arch: [],
          os_version: [],
          job_state: ["finished"],
        },
        field: "os",
      },
      os_a: "",
      os_b: "",
      os_arch_a: "",
      os_arch_b: "",
      os_version_a: "",
      os_version_b: "",
      group_id_a: "",
      base_all_data: {"stream": [],
                      "netperf": [],
                      "unixbench": [],
                      "lmbench3": [],
                      "libmicro": [],
                      "fio-basic": [],
                      "speccpu-2006": [],
                      "speccpu-2017": [],
                    },
      group_id_b: "",
      speccpu_2006_data_a: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: {
            suite: ["speccpu-2006"],
            "pp.speccpu-2006.test_item":["rate"], 
            "pp.speccpu-2006.num_type": ["int"],
            group_id: [],
          },
          metrics: [
            "speccpu-2006.400.perlbench_Rate",
            "speccpu-2006.401.bzip2_Rate",
            "speccpu-2006.403.gcc_Rate",
            "speccpu-2006.429.mcf_Rate",
            "speccpu-2006.445.gobmk_Rate",
            "speccpu-2006.456.hmmer_Rate",
            "speccpu-2006.458.sjeng_Rate",
            "speccpu-2006.462.libquantum_Rate",
            "speccpu-2006.464.h264ref_Rate",
            "speccpu-2006.471.omnetpp_Rate",
            "speccpu-2006.473.astar_Rate",
            "speccpu-2006.483.xalancbmk_Rate",
            "speccpu-2006.Est.SPECint(R)_rate_base2006"
          ],
          series: [
            { os: "openeuler", os_version: "21.03-iso" },
            { os: "openeuler", os_version: "21.09-iso" },
          ],
          x_params: ["metric"],
          test_params: ["pp.speccpu-2006.test_item", "pp.speccpu-2006.num_type"]
        },
      },
      speccpu_2006_data_b: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: {
            suite: ["speccpu-2006"],
            "pp.speccpu-2006.test_item":["speed"], 
            "pp.speccpu-2006.num_type": ["int"],
            group_id: [],
          },
          metrics: [
            "speccpu-2006.400.perlbench_Ratio",
            "speccpu-2006.401.bzip2_Ratio",
            "speccpu-2006.403.gcc_Ratio",
            "speccpu-2006.429.mcf_Ratio",
            "speccpu-2006.445.gobmk_Ratio",
            "speccpu-2006.456.hmmer_Ratio",
            "speccpu-2006.458.sjeng_Ratio",
            "speccpu-2006.462.libquantum_Ratio",
            "speccpu-2006.464.h264ref_Ratio",
            "speccpu-2006.471.omnetpp_Ratio",
            "speccpu-2006.473.astar_Ratio",
            "speccpu-2006.483.xalancbmk_Ratio",
            "speccpu-2006.Est.SPECint(R)_base2006"
          ],
          series: [
            { os: "openeuler", os_version: "21.03-iso" },
            { os: "openeuler", os_version: "21.09-iso" },
          ],
          x_params: ["metric"],
          test_params: ["pp.speccpu-2006.test_item", "pp.speccpu-2006.num_type"]
        },
      },
      speccpu_2006_data_c: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: {
            suite: ["speccpu-2006"],
            "pp.speccpu-2006.test_item":["speed"], 
            "pp.speccpu-2006.num_type": ["fp"],
            group_id: [],
          },
          metrics: [
            "speccpu-2006.410.bwaves_Ratio",
            "speccpu-2006.416.gamess_Ratio",
            "speccpu-2006.433.milc_Ratio",
            "speccpu-2006.434.zeusmp_Ratio",
            "speccpu-2006.435.gromacs_Ratio",
            "speccpu-2006.436.cactusADM_Ratio",
            "speccpu-2006.437.leslie3d_Ratio",
            "speccpu-2006.444.namd_Ratio",
            "speccpu-2006.447.dealII_Ratio",
            "speccpu-2006.450.soplex_Ratio",
            "speccpu-2006.453.povray_Ratio",
            "speccpu-2006.454.calculix_Ratio",
            "speccpu-2006.459.GemsFDTD_Ratio",
            "speccpu-2006.465.tonto_Ratio",
            "speccpu-2006.470.lbm_Ratio",
            "speccpu-2006.481.wrf_Ratio",
            "speccpu-2006.482.sphinx3_Ratio",
            "speccpu-2006.Est.SPECfp(R)_base2006"
          ],
          series: [
            { os: "openeuler", os_version: "21.03-iso" },
            { os: "openeuler", os_version: "21.09-iso" },
          ],
          x_params: ["metric"],
          test_params: ["pp.speccpu-2006.test_item", "pp.speccpu-2006.num_type"]
        },
      },
      speccpu_2006_data_d: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: {
            suite: ["speccpu-2006"],
            "pp.speccpu-2006.test_item":["rate"], 
            "pp.speccpu-2006.num_type": ["fp"],
            group_id: [],
          },
          metrics: [
            "speccpu-2006.410.bwaves_Rate",
            "speccpu-2006.416.gamess_Rate",
            "speccpu-2006.433.milc_Rate",
            "speccpu-2006.434.zeusmp_Rate",
            "speccpu-2006.435.gromacs_Rate",
            "speccpu-2006.436.cactusADM_Rate",
            "speccpu-2006.437.leslie3d_Rate",
            "speccpu-2006.444.namd_Rate",
            "speccpu-2006.447.dealII_Rate",
            "speccpu-2006.450.soplex_Rate",
            "speccpu-2006.453.povray_Rate",
            "speccpu-2006.454.calculix_Rate",
            "speccpu-2006.459.GemsFDTD_Rate",
            "speccpu-2006.465.tonto_Rate",
            "speccpu-2006.470.lbm_Rate",
            "speccpu-2006.481.wrf_Rate",
            "speccpu-2006.482.sphinx3_Rate",
            "speccpu-2006.Est.SPECfp(R)_rate_base2006"
          ],
          series: [
            { os: "openeuler", os_version: "21.03-iso" },
            { os: "openeuler", os_version: "21.09-iso" },
          ],
          x_params: ["metric"],
          test_params: ["pp.speccpu-2006.test_item", "pp.speccpu-2006.num_type"]
        },
      },
      speccpu_2017_data_a: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: {
            suite: ["speccpu-2017"],
            "pp.speccpu-2017.item": ["fprate"], 
            group_id: [],
          },
          metrics: [
            "speccpu-2017.503.bwaves_r",
            "speccpu-2017.507.cactuBSSN_r",
            "speccpu-2017.508.namd_r",
            "speccpu-2017.510.parest_r",
            "speccpu-2017.511.povray_r",
            "speccpu-2017.519.lbm_r",
            "speccpu-2017.521.wrf_r",
            "speccpu-2017.526.blender_r",
            "speccpu-2017.527.cam4_r",
            "speccpu-2017.538.imagick_r",
            "speccpu-2017.544.nab_r",
            "speccpu-2017.549.fotonik3d_r",
            "speccpu-2017.554.roms_r",
            "speccpu-2017.Est.SPECrate2017_fp_base",
          ],
          series: [
            { os: "openeuler", os_version: "21.03-iso" },
            { os: "openeuler", os_version: "21.09-iso" },
          ],
          x_params: ["metric"],
        },
      },
      speccpu_2017_data_b: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: {
            suite: ["speccpu-2017"],
            "pp.speccpu-2017.item": ["fpspeed"], 
            group_id: [],
          },
          metrics: [
            "speccpu-2017.603.bwaves_s",
            "speccpu-2017.607.cactuBSSN_s",
            "speccpu-2017.619.lbm_s",
            "speccpu-2017.621.wrf_s",
            "speccpu-2017.627.cam4_s",
            "speccpu-2017.628.pop2_s",
            "speccpu-2017.638.imagick_s",
            "speccpu-2017.644.nab_s",
            "speccpu-2017.649.fotonik3d_s",
            "speccpu-2017.654.roms_s",
            "speccpu-2017.Est.SPECspeed2017_fp_base",
          ],
          series: [
            { os: "openeuler", os_version: "21.03-iso" },
            { os: "openeuler", os_version: "21.09-iso" },
          ],
          x_params: ["metric"],
        },
      },
      speccpu_2017_data_c: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: {
            suite: ["speccpu-2017"],
            "pp.speccpu-2017.item": ["intspeed"], 
            group_id: [],
          },
          metrics: [
            "speccpu-2017.600.perlbench_s",
            "speccpu-2017.602.gcc_s",
            "speccpu-2017.605.mcf_s",
            "speccpu-2017.620.omnetpp_s",
            "speccpu-2017.623.xalancbmk_s",
            "speccpu-2017.625.x264_s",
            "speccpu-2017.631.deepsjeng_s",
            "speccpu-2017.641.leela_s",
            "speccpu-2017.648.exchange2_s",
            "speccpu-2017.657.xz_s",
            "speccpu-2017.Est.SPECspeed2017_int_base",
          ],
          series: [
            { os: "openeuler", os_version: "21.03-iso" },
            { os: "openeuler", os_version: "21.09-iso" },
          ],
          x_params: ["metric"],
        },
      },
      speccpu_2017_data_d: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: {
            suite: ["speccpu-2017"],
            "pp.speccpu-2017.item": ["intrate"], 
            group_id: [],
          },
          metrics: [
            "speccpu-2017.500.perlbench_r",
            "speccpu-2017.502.gcc_r",
            "speccpu-2017.505.mcf_r",
            "speccpu-2017.520.omnetpp_r",
            "speccpu-2017.523.xalancbmk_r",
            "speccpu-2017.525.x264_r",
            "speccpu-2017.531.deepsjeng_r",
            "speccpu-2017.541.leela_r",
            "speccpu-2017.548.exchange2_r",
            "speccpu-2017.557.xz_r",
            "speccpu-2017.Est.SPECrate2017_int_base",
          ],
          series: [
            { os: "openeuler", os_version: "21.03-iso" },
            { os: "openeuler", os_version: "21.09-iso" },
          ],
          x_params: ["metric"],
        },
      },
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
            "lmbench3.Process.fork+execve.latency.us",
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
          title: "local_latencies",
        },
      },
      lmbench_data_c: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: { suite: ["lmbench3"], group_id: [] },
          metrics: [
            "lmbench3.PIPE.bandwidth.MB/sec",
            "lmbench3.AF_UNIX.sock.stream.bandwidth.MB/sec",
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
          title: "Context_switching_ctxsw",
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
          title: "File_&_VM_latencies",
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
          title: "Memory_latencies",
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
      /**
       * old data template
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
      **/
      unixbench_data: {
        table_data: [],
        echart_data: [],
        QueryData: {
          filter: {
            suite: ["unixbench"],
            "pp.unixbench.nr_task": [1, 56, 80, 96, 128],
            group_id: [],
          },
          metrics: [
            "unixbench.Dhrystone_2_using_register_variables",
            "unixbench.Double-Precision_Whetstone",
            "unixbench.Execl_Throughput",
            "unixbench.File_Copy_1024_bufsize_2000_maxblocks",
            "unixbench.File_Copy_256_bufsize_500_maxblocks",
            "unixbench.File_Copy_4096_bufsize_8000_maxblocks",
            "unixbench.Pipe_Throughput",
            "unixbench.Pipe-based_Context_Switching",
            "unixbench.Process_Creation",
            "unixbench.Shell_Scripts_(1_concurrent)",
            "unixbench.Shell_Scripts_(8_concurrent)",
            "unixbench.System_Call_Overhead",
            "unixbench.System_Benchmarks_Index_Score",
          ],
          series: [
            { os: "openeuler", os_version: "20.03-LTS-SP3-iso" },
            { os: "openeuler", os_version: "22.03-LTS-iso" },
          ],
          x_params: ["metric"],
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
          metrics: ["fio.write_iops", "fio.write_bw_MBps"],
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
        "lmbench3-AF_UNIX-sock-stream-bandwidth-MB/sec": "AF_UNIX",
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
        "unixbench-Dhrystone_2_using_register_variables":
          "Dhrystone_2_using_register_variables",
        "unixbench-Double-Precision_Whetstone": "Double-Precision_Whetstone",
        "unixbench-Execl_Throughput": "Execl_Throughput",
        "unixbench-File_Copy_1024_bufsize_2000_maxblocks":
          "File_Copy_1024_bufsize_2000_maxblocks",
        "unixbench-File_Copy_256_bufsize_500_maxblocks":
          "File_Copy_256_bufsize_500_maxblocks",
        "unixbench-File_Copy_4096_bufsize_8000_maxblocks":
          "File_Copy_4096_bufsize_8000_maxblocks",
        "unixbench-Pipe_Throughput": "Pipe_Throughput",
        "unixbench-Pipe-based_Context_Switching":
          "Pipe-based_Context_Switching",
        "unixbench-Process_Creation": "Process_Creation",
        "unixbench-Shell_Scripts_(1_concurrent)":
          "Shell_Scripts_(1_concurrent)",
        "unixbench-Shell_Scripts_(8_concurrent)":
          "Shell_Scripts_(8_concurrent)",
        "unixbench-System_Call_Overhead": "System_Call_Overhead",
        "unixbench-System_Benchmarks_Index_Score":
          "System_Benchmarks_Index_Score",
      },
      improve_percent: {},
      table_improve: [],
      im_show: false,
      lmbench_show: false,
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
      this.improve_percent = {};
      this.table_improve = [];
      this.stream_data.table_data = [];
      this.stream_data.echart_data = [];
      this.speccpu_2006_data_a.table_data = [];
      this.speccpu_2006_data_a.echart_data = [];
      this.speccpu_2006_data_b.table_data = [];
      this.speccpu_2006_data_b.echart_data = [];
      this.speccpu_2006_data_c.table_data = [];
      this.speccpu_2006_data_c.echart_data = [];
      this.speccpu_2006_data_d.table_data = [];
      this.speccpu_2006_data_d.echart_data = [];
      this.speccpu_2017_data_a.table_data = [];
      this.speccpu_2017_data_b.table_data = [];
      this.speccpu_2017_data_c.table_data = [];
      this.speccpu_2017_data_d.table_data = [];
      this.speccpu_2017_data_a.echart_data = [];
      this.speccpu_2017_data_b.echart_data = [];
      this.speccpu_2017_data_c.echart_data = [];
      this.speccpu_2017_data_d.echart_data = [];
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
    async getTableData(sData, table_data) {
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
      var rw = null;
      if (found !== null) { rw = found[0].split("=")[1];}
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
        var tmp = await this.getRowData(title_trans, avg_data[i]);
        tData.push(tmp);
      }

      for (i = 0; i < change_data.length; i++) {
        tmp = await this.getRowData(title_trans, change_data[i]);
        tData.push(tmp);
      }
      table_data.push({
        header: tHeader,
        data: tData,
        title: sData.title,
        test_params: sData.test_params,
        testbox: sData.testbox,
      });
      var tmp_table_data = JSON.parse(JSON.stringify(table_data))
      if (this.base_all_data[this.suite].length > 0) {
        this.base_all_data[this.suite] = this.base_all_data[this.suite].concat(await this.get_table_data(tmp_table_data))
      } else {
        this.base_all_data[this.suite] = await this.get_table_data(tmp_table_data)
      }
    },
    getRowData(title, data) {
      var tmp = {};
      tmp[title] = data.series;

      if (data.series.includes("vs")) {
        for (var i = 0; i < data.x_params.length; i++) {
          tmp[data.x_params[i]] = data.data[i] + "%";
          if (this.suite == "unixbench") {
            if (data.x_params[i] == "System_Benchmarks_Index_Score") {
              this.table_improve = [
                {
                  compare_versions: data.series,
                  improvement: tmp[data.x_params[i]],
                },
              ];
            }
          }
        }
        if (this.suite != "unixbench") {
          var series = data.series.split(" vs ");
          var base = series[1];
          var test_obj = series[0];
          var found = 0;
          if (this.suite == "lmbench3") {
            var base_average = this.improve_percent[base].g_average;
            var base_bd_average = this.improve_percent[base].bd_g_average;
            var average = this.improve_percent[test_obj].g_average;
            var bd_average = this.improve_percent[test_obj].bd_g_average;

            for (i = 0; i < this.table_improve.length; i++) {
              if (this.table_improve[i].compare_versions == data.series) {
                this.table_improve[i].latency_improvement =
                  ((1 - average / base_average) * 100).toFixed(2) + "%";
                this.table_improve[i].bandwidth_improvement =
                  ((bd_average / base_bd_average - 1) * 100).toFixed(2) + "%";
                found = 1;
              }
            }
            if (found == 0) {
              this.table_improve.push({
                compare_versions: data.series,
                latency_improvement:
                  ((1 - average / base_average) * 100).toFixed(2) + "%",
                bandwidth_improvement:
                  ((bd_average / base_bd_average - 1) * 100).toFixed(2) + "%",
              });
            }
          } else {
            base_average = this.improve_percent[base].g_average;
            average = this.improve_percent[test_obj].g_average;
            var improve = ((average / base_average - 1) * 100).toFixed(2) + "%";
            if (this.suite == "libmicro") {
              improve = ((1 - average / base_average) * 100).toFixed(2) + "%";
            }

            found = 0;
            for (i = 0; i < this.table_improve.length; i++) {
              if (this.table_improve[i].compare_versions == data.series) {
                this.table_improve[i].improvement = improve;
                found = 1;
              }
            }
            if (found == 0) {
              this.table_improve.push({
                compare_versions: data.series,
                improvement: improve,
              });
            }
          }
        }
        this.im_show = true;
      } else {
        var product = 1;
        var num = 0;
        for (i = 0; i < data.x_params.length; i++) {
          tmp[data.x_params[i]] = data.data[i];
          if (data.data[i] != 0) {
            product *= data.data[i];
            num += 1;
          }
        }
        var g_average = 0;
        if (num > 0) {
          g_average = Math.pow(product, 1 / num);
        }

        if (this.suite != "unixbench") {
          if (this.suite == "lmbench3") {
            if (this.improve_percent[data.series] == null) {
              this.improve_percent[data.series] = {
                product: 1,
                num: 0,
                g_average: 0,
                bd_product: 1,
                bd_num: 0,
                bd_g_average: 0,
              };
            }
            if (g_average != 0) {
              if (title == "local_bandwidths") {
                this.improve_percent[data.series].bd_product *= g_average;
                this.improve_percent[data.series].bd_num += 1;
                this.improve_percent[data.series].bd_g_average = Math.pow(
                  this.improve_percent[data.series].bd_product,
                  1 / this.improve_percent[data.series].bd_num
                );
              } else {
                this.improve_percent[data.series].product *= g_average;
                this.improve_percent[data.series].num += 1;
                this.improve_percent[data.series].g_average = Math.pow(
                  this.improve_percent[data.series].product,
                  1 / this.improve_percent[data.series].num
                );
              }
            }
          } else {
            if (this.improve_percent[data.series] == null) {
              this.improve_percent[data.series] = {
                product: 1,
                num: 0,
                g_average: 0,
              };
            }
            if (g_average != 0) {
              this.improve_percent[data.series].product *= g_average;
              this.improve_percent[data.series].num += 1;
              this.improve_percent[data.series].g_average = Math.pow(
                this.improve_percent[data.series].product,
                1 / this.improve_percent[data.series].num
              );
            }
          }
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
        if (tHeader[i].includes("speccpu-2006")) {
          tHeader[i] = tHeader[i].replace("speccpu-2006-", "")
        }
        if (tHeader[i].includes("speccpu-2017")) {
          tHeader[i] = tHeader[i].replace("speccpu-2017-", "")
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
    async getData(JobData) {
      await getPerformanceResult(JobData.QueryData).then((res) => {
        JobData.echart_data = this.transfer_res(res);
        var sourceData = JobData.echart_data;
        if (sourceData.length == 0) {
          this.$message("本次请求数据为空");
        }

        for (var i = 0; i < sourceData.length; i++) {
          this.getTableData(sourceData[i], JobData.table_data);
        }
        this.sleep(2000).then(() => {
          this.get_Echarts(JobData.echart_data);
        });
      });
    },
    async get_table_data(data) {
      var all_data = []
      var data_header = []
      for (var i=0; i < data.length;i++) {
        data_header = JSON.parse(JSON.stringify(data[i].header))
        if (this.suite == "netperf") {
          await this.getTableHeaders()
          data_header = this.netperf_filter(data_header)
        } else if (this.suite == "unixbench") {
          await this.getTableHeaders()
          data_header = this.unixbench_filter(data_header)
        } else if (this.suite == "lmbench3") {
          await this.getTableHeaders()
          data_header = this.lmbench3_filter(data_header)
        } else if (this.suite == "libmicro") {
          await this.getTableHeaders()
          data_header = this.libmicro_filter(data_header)
        } else if (this.suite == "speccpu-2006") {
          await this.getTableHeaders()
          data_header = this.speccpu_2006_filter(data_header)
        } else if (this.suite == "speccpu-2017") {
          await this.getTableHeaders()
          data_header = this.speccpu_2017_filter(data_header)
        } else if (this.suite == "fio-basic") {
          await this.getTableHeaders()
          data_header = this.fio_filter(data_header)
        }
        all_data.push(data_header)
        for (var j=0; j < data[i].data.length; j++) {
          var tmp_list = JSON.parse(JSON.stringify(data_header))
          for (var key in data[i].data[j]) {
            var index = data_header.indexOf(key)
            tmp_list[index] = data[i].data[j][key]
          }
          all_data.push(tmp_list)
        }
        all_data.push("")
      }
      return all_data
    },
    async getBaseAlldata() {
      var data = []
      this.suite =  "stream"
      await this.queryCharts()
      this.suite = "netperf"
      await this.queryCharts();
      await this.sleep(800).then(() => {
        this.suite = "unixbench"
        this.queryCharts()
      });
      await this.sleep(900).then(() => {
        this.suite = "lmbench3"
        this.queryCharts()
      });
      await this.sleep(4500).then(() => {
        this.suite = "libmicro"
        this.queryCharts()
      });
      await this.sleep(4700).then(() => {
        this.suite = "fio-basic"
        this.queryCharts()
      });
      await this.sleep(5500).then(() => {
        this.suite = "speccpu-2006"
        this.queryCharts()
      })
      await this.sleep(6000).then(() => {
        this.suite = "speccpu-2017"
        this.queryCharts()
      })
      await this.sleep(6500).then(() => {
        data = JSON.parse(JSON.stringify(this.base_all_data))
      })
      return data
    },
    getTableHeaders() {
      if (this.suite == "stream") {
        this.t_headers = ["copy", "scale", "add", "triad"];
        this.stream_selected = this.t_headers;
      } else if (this.suite == "speccpu-2006") {
        this.t_headers = [
          "400-perlbench_Rate",
          "401-bzip2_Rate",
          "403-gcc_Rate",
          "429-mcf_Rate",
          "445-gobmk_Rate",
          "456-hmmer_Rate",
          "458-sjeng_Rate",
          "462-libquantum_Rate",
          "464-h264ref_Rate",
          "471-omnetpp_Rate",
          "473-astar_Rate",
          "483-xalancbmk_Rate",
          "Est-SPECint(R)_rate_base2006",
          "400-perlbench_Ratio",
          "401-bzip2_Ratio",
          "403-gcc_Ratio",
          "429-mcf_Ratio",
          "445-gobmk_Ratio",
          "456-hmmer_Ratio",
          "458-sjeng_Ratio",
          "462-libquantum_Ratio",
          "464-h264ref_Ratio",
          "471-omnetpp_Ratio",
          "473-astar_Ratio",
          "483-xalancbmk_Ratio",
          "Est-SPECint(R)_base2006",
          "410-bwaves_Ratio",
          "416-gamess_Ratio",
          "433-milc_Ratio",
          "434-zeusmp_Ratio",
          "435-gromacs_Ratio",
          "436-cactusADM_Ratio",
          "437-leslie3d_Ratio",
          "444-namd_Ratio",
          "447-dealII_Ratio",
          "450-soplex_Ratio",
          "453-povray_Ratio",
          "454-calculix_Ratio",
          "459-GemsFDTD_Ratio",
          "465-tonto_Ratio",
          "470-lbm_Ratio",
          "481-wrf_Ratio",
          "482-sphinx3_Ratio",
          "Est-SPECfp(R)_base2006",
          "410-bwaves_Rate",
          "416-gamess_Rate",
          "433-milc_Rate",
          "434-zeusmp_Rate",
          "435-gromacs_Rate",
          "436-cactusADM_Rate",
          "437-leslie3d_Rate",
          "444-namd_Rate",
          "447-dealII_Rate",
          "450-soplex_Rate",
          "453-povray_Rate",
          "454-calculix_Rate",
          "459-GemsFDTD_Rate",
          "465-tonto_Rate",
          "470-lbm_Rate",
          "481-wrf_Rate",
          "482-sphinx3_Rate",
          "Est-SPECfp(R)_rate_base2006"];
        this.speccpu_2006_selected = this.t_headers
      } else if (this.suite == "speccpu-2017") {
        this.t_headers = [
          "500-perlbench_r",
          "502-gcc_r",
          "505-mcf_r",
          "520-omnetpp_r",
          "523-xalancbmk_r",
          "525-x264_r",
          "531-deepsjeng_r",
          "541-leela_r",
          "548-exchange2_r",
          "557-xz_r",
          "Est-SPECrate2017_int_base",
          "600-perlbench_s",
          "602-gcc_s",
          "605-mcf_s",
          "620-omnetpp_s",
          "623-xalancbmk_s",
          "625-x264_s",
          "631-deepsjeng_s",
          "641-leela_s",
          "648-exchange2_s",
          "657-xz_s",
          "Est-SPECspeed2017_int_base",
          "503-bwaves_r",
          "507-cactuBSSN_r",
          "508-namd_r",
          "510-parest_r",
          "511-povray_r",
          "519-lbm_r",
          "521-wrf_r",
          "526-blender_r",
          "527-cam4_r",
          "538-imagick_r",
          "544-nab_r",
          "549-fotonik3d_r",
          "554-roms_r",
          "Est-SPECrate2017_fp_base",
          "603-bwaves_s",
          "607-cactuBSSN_s",
          "619-lbm_s",
          "621-wrf_s",
          "627-cam4_s",
          "628-pop2_s",
          "638-imagick_s",
          "644-nab_s",
          "649-fotonik3d_s",
          "654-roms_s",
          "Est-SPECspeed2017_fp_base",
        ]
        this.speccpu_2017_selected = this.t_headers
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
          "Dhrystone_2_using_register_variables",
          "Double-Precision_Whetstone",
          "Execl_Throughput",
          "File_Copy_1024_bufsize_2000_maxblocks",
          "File_Copy_256_bufsize_500_maxblocks",
          "File_Copy_4096_bufsize_8000_maxblocks",
          "Pipe_Throughput",
          "Pipe-based_Context_Switching",
          "Process_Creation",
          "Shell_Scripts_(1_concurrent)",
          "Shell_Scripts_(8_concurrent)",
          "System_Call_Overhead",
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
      this.$forceUpdate();
      this.getosData();
      this.getSelectVersiona(this.os_a);
      this.getSelectVersionb(this.os_b);
      this.getSelectArcha(this.os_version_a);
      this.getSelectArchb(this.os_version_b);
      this.getSelectGroupa(this.os_arch_a);
      this.getSelectGroupb(this.os_arch_b);
      this.getTableHeaders();
      this.getTransferData();
      this.improve_percent = {};
      this.table_improve = [];
      this.im_show = false;
      if (this.suite == "lmbench3") {
        this.lmbench_show = true;
      } else {
        this.lmbench_show = false;
      }
      for (var index = 0; index < this.compare_object.length; index++) {
        this.getSelectVersion(index, this.compare_object[index].os);
        this.getSelectArch(index, this.compare_object[index].os, this.compare_object[index].os_version);
        this.getSelectGroup(index, this.compare_object[index].os, this.compare_object[index].os_version, this.compare_object[index].os_arch);
      }
    },
    getosData() {
      this.checkQuery.filter.suite = [this.suite];
      this.checkQuery.filter.os = [];
      this.checkQuery.filter.os_version = [];
      this.checkQuery.filter.os_arch = [];
      this.checkQuery.field = "os";
      this.group_id_a = "";
      this.versionData_a = [];
      this.groupData_a = [];

      this.checkQuery_b.filter.suite = [this.suite];
      this.checkQuery_b.filter.os = [];
      this.checkQuery_b.filter.os_version = [];
      this.checkQuery_b.filter.os_arch = [];
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
    selectChangeArcha(os_version_a) {
      this.os_arch_a = ""
      this.getSelectArcha(os_version_a)
    },
    selectChangeArchb(os_version_b) {
      this.os_arch_b = ""
      this.getSelectArchb(os_version_b)
    },
    selectChangeArch(index, os, os_version) {
      this.compare_object[index].os_arch = ""
      this.getSelectArch(index, os, os_version)
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
    getSelectArch(index, os, os_version) {
      this.compare_object[index].group_id = "";
      this.compare_object[index].archData = [];
      this.compare_object[index].groupData = [];
      var checkQuery = this.compare_object[index].checkQuery;

      checkQuery.filter.suite = [this.suite];
      checkQuery.filter.os = [os];
      checkQuery.filter.os_version = [os_version];
      checkQuery.field = "os_arch";
      QueryField(checkQuery).then((res) => {
        this.compare_object[index].archData = res;
      });
    },
    getSelectArcha(os_version_a) {
      this.checkQuery.filter.os = [this.os_a];
      this.checkQuery.filter.os_version = [os_version_a];
      this.checkQuery.filter.os_arch = [];
      this.checkQuery.field = "os_arch";
      this.group_id_a = "";
      this.archData_a = [];
      this.groupData_a = [];

      QueryField(this.checkQuery).then((res) => {
        this.archData_a = res;
      });
    },
    getSelectArchb(os_version_b) {
      this.checkQuery_b.filter.os = [this.os_b];
      this.checkQuery_b.filter.os_version = [os_version_b];
      this.checkQuery_b.filter.os_arch = [];
      this.checkQuery_b.field = "os_arch";
      this.group_id_b = "";
      this.archData_b = [];
      this.groupData_b = [];

      QueryField(this.checkQuery_b).then((res) => {
        this.archData_b = res;
      });
    },
    getSelectVersiona(os) {
      this.checkQuery.filter.os = [os];
      this.checkQuery.filter.os_version = [];
      this.checkQuery.filter.os_arch = [];
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
      this.checkQuery_b.filter.os_arch = [];
      this.checkQuery_b.field = "os_version";
      this.group_id_b = "";
      this.versionData_b = [];
      this.groupData_b = [];

      QueryField(this.checkQuery_b).then((res) => {
        this.versionData_b = res;
      });
    },
    getSelectGroupa(os_arch) {
      this.checkQuery.filter.os_arch = [os_arch];
      this.checkQuery.field = "group_id";
      this.group_id_a = "";

      QueryField(this.checkQuery).then((res) => {
        this.groupData_a = res;
      });
    },
    getSelectGroupb(os_arch) {
      this.checkQuery_b.filter.os_arch = [os_arch];
      this.checkQuery_b.field = "group_id";
      this.group_id_b = "";

      QueryField(this.checkQuery_b).then((res) => {
        this.groupData_b = res;
      });
    },
    getSelectGroup(index, os, os_version, os_arch) {
      this.compare_object[index].group_id = "";
      this.compare_object[index].groupData = [];
      var checkQuery = this.compare_object[index].checkQuery;

      checkQuery.filter.suite = [this.suite];
      checkQuery.filter.os_version = [os_version];
      checkQuery.filter.os = [os]
      checkQuery.filter.os_arch = [os_arch];
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
    async queryCharts() {
      var series = [
        { os: this.os_a, os_version: this.os_version_a, os_arch: this.os_arch_a, group_id: this.group_id_a },
        { os: this.os_b, os_version: this.os_version_b, os_arch: this.os_arch_b, group_id: this.group_id_b },
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

      this.speccpu_2006_data_a.QueryData.series = series;
      this.speccpu_2006_data_b.QueryData.series = series;
      this.speccpu_2006_data_c.QueryData.series = series;
      this.speccpu_2006_data_d.QueryData.series = series;
      this.speccpu_2017_data_a.QueryData.series = series;
      this.speccpu_2017_data_b.QueryData.series = series;
      this.speccpu_2017_data_c.QueryData.series = series;
      this.speccpu_2017_data_d.QueryData.series = series;

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
        this.speccpu_2006_data_a.QueryData.filter.group_id = [];
        this.speccpu_2006_data_b.QueryData.filter.group_id = [];
        this.speccpu_2006_data_c.QueryData.filter.group_id = [];
        this.speccpu_2006_data_d.QueryData.filter.group_id = [];
        this.speccpu_2017_data_a.QueryData.filter.group_id = [];
        this.speccpu_2017_data_b.QueryData.filter.group_id = [];
        this.speccpu_2017_data_c.QueryData.filter.group_id = [];
        this.speccpu_2017_data_d.QueryData.filter.group_id = [];
        
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

      await this.clean_data();
      if (this.suite === "lmbench3") {
        await this.getData(this.lmbench_data_a);
        await this.sleep(100).then(() => {
          this.getData(this.lmbench_data_b);
        });
        await this.sleep(200).then(() => {
          this.getData(this.lmbench_data_c);
        });
        await this.sleep(300).then(() => {
          this.getData(this.lmbench_data_d);
        });
        await this.sleep(900).then(() => {
          this.getData(this.lmbench_data_e);
        });
        await this.sleep(1800).then(() => {
          this.getData(this.lmbench_data_f);
        });
      }
      if (this.suite === "unixbench") {
        await this.getData(this.unixbench_data);
      }
      if (this.suite === "libmicro") {
        await this.getData(this.libmicro_data);
      }
      if (this.suite === "stream") {
        await this.getData(this.stream_data);
      }
      if (this.suite === "speccpu-2006") {
        await this.getData(this.speccpu_2006_data_a)
        await this.getData(this.speccpu_2006_data_b)
        await this.getData(this.speccpu_2006_data_c)
        await this.getData(this.speccpu_2006_data_d)
      }
      if (this.suite === "speccpu-2017") {
        await this.getData(this.speccpu_2017_data_a)
        await this.getData(this.speccpu_2017_data_b)
        await this.getData(this.speccpu_2017_data_c)
        await this.getData(this.speccpu_2017_data_d)
      }
      if (this.suite === "fio-basic") {
        await this.getData(this.fio_data);
        await this.sleep(200).then(() => {
          this.getData(this.fio_data_b);
        });
        await this.sleep(400).then(() => {
          this.getData(this.fio_data_c);
        });
      }
      if (this.suite === "netperf") {
        await this.getData(this.netperfb_data);

        await this.sleep(200).then(() => {
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
    async getAllDataExcel() {
      var sheet_data_hash = await this.getBaseAlldata()
      let wb = XLSX.utils.book_new();
      for (var key in sheet_data_hash) {
        var sheet_name = key
        var jsonObj = sheet_data_hash[key]
        if("[]" !== jsonObj) {
          let worksheet = XLSX.utils.json_to_sheet(jsonObj, {skipHeader: true})
          XLSX.utils.book_append_sheet(wb, worksheet, sheet_name)
        }
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
      await this.sleep(100).then(() => {
        location.reload()
      });
    },
    getExcel() {
      var c_children = document.getElementById("container").children;
      let wb = XLSX.utils.book_new();

      if (c_children.length < 2) {
        this.$message("导出失败");
        return;
      }
      var jsonObj = [];
      for (var i = 2; i < c_children.length; i++) {
        var el_table = c_children[i].children[2];
        let sheet = XLSX.utils.table_to_sheet(el_table);
        this.setStyle(sheet);
        let a = XLSX.utils.sheet_to_json(sheet, {header: 1});
        jsonObj = jsonObj.concat(a).concat([''])
      }
      let worksheet = XLSX.utils.json_to_sheet(jsonObj, {skipHeader: true})
      XLSX.utils.book_append_sheet(wb, worksheet, "测试结果")
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
    speccpu_2006_filter(s_headers) {
      var checkedHeaders;
      checkedHeaders = this.speccpu_2006_selected;
      var headers = [];
      headers.push(s_headers[0]);

      var tmp = checkedHeaders.filter(function (v) {
        return s_headers.indexOf(v) > -1;
      });
      headers = headers.concat(tmp);
      return headers;
    },
    speccpu_2017_filter(s_headers) {
      var checkedHeaders;
      checkedHeaders = this.speccpu_2017_selected;
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
      } else if (this.suite == "speccpu-2006") {
        this.speccpu_2006_selected = [];
        for (i = 0; i < this.transfer_chosen.length; i++) {
          index = this.transfer_chosen[i];
          this.speccpu_2006_selected[i] = this.transfer_data[index].label;
        }
      } else if (this.suite == "speccpu-2017") {
        this.speccpu_2017_selected = [];
        for (i = 0; i < this.transfer_chosen.length; i++) {
          index = this.transfer_chosen[i];
          this.speccpu_2017_selected[i] = this.transfer_data[index].label;
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
            job_state: ["finished"],
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
  margin-top: 800px;
  flex-direction: column;
  align-items: center;
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
