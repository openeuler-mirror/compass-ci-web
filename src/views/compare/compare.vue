<template>
  <div id="compare">
    <div class="content">
      <h1 class="title">Compare</h1>
      <p class="summary">summary</p>
      <div class="filters">filters</div>
      <el-form
        :inline="true"
        :model="compareData"
        ref="ruleForm"
        :rules="rules"
        class="demo-form-inline"
      >
        <el-form-item label="suite" prop="suite" label-width="85px" class="com-tips">
          <el-select v-model="compareData.suite" filterable placeholder="请选择" size="medium">
            <el-option v-for="item in suiteData" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="OS" prop="OS"  label-width="85px">
          <el-select v-model="compareData.osStr" filterable placeholder="请选择" size="medium">
            <el-option v-for="item in OSData" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="os_arch" prop="os_arch" label-width="85px">
          <el-select v-model="compareData.os_arch" filterable placeholder="请选择" size="medium">
            <el-option v-for="item in osArchData" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="tbox_group" prop="tbox_group" label-width="85px">
          <el-select v-model="compareData.tbox_group" filterable placeholder="请选择" size="medium">
            <el-option v-for="item in tboxGroupdata" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="dimension" prop="dimension" label-width="85px">
          <el-select
            v-model="compareData.dimension"
            filterable
            placeholder="请选择"
            size="medium"
            @change="isDimesion"
          >
            <el-option v-for="item in dimensionData" :key="item" :label="item" :value="item"></el-option>
          </el-select>
          <el-button class="compare-btn" size="medium" :disabled="flag" @click="compare">compare</el-button>
        </el-form-item>
      </el-form>
      <pre>{{resData}}</pre>
    </div>
  </div>
</template> 
<script>
import {compareCandidates, compare} from "../../api/compare";
export default {
  name: "Compare",
  components: {},
  data() {
    return {
      flag: true,
      listquery: {
        os: "",
        suite: "",
        dimension: "",
      },
      compareData: {
        suite: null,
        osStr: null,
        os_arch: null,
        tbox_group: null,
        dimension: null,
      },
      rules: {
        suite: {
          required: true,
          message: "请选择suite",
          trigger: "change",
        },
        dimension: {
          required: true,
          message: "请选择dimension",
          trigger: "change",
        },
      },
      suiteData: [],
      OSData: [],
      osArchData: [],
      tboxGroupdata: [],
      resData: "",
    };
  },
  methods: {
    isDimesion() {
      if (this.compareData.dimension) {
        this.flag = false;
      }
    },
    compareCandidates() {
      compareCandidates().then((res) => {
        this.suiteData = res.query_conditions.suite;
        this.OSData = res.query_conditions.OS;
        this.osArchData = res.query_conditions.os_arch;
        this.tboxGroupdata = res.query_conditions.tbox_group;
        this.dimensionData = res.dimension;
      });
    },
    compare() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          let subQuery = {};
          if (this.compareData.osStr) {
            subQuery.os = this.compareData.osStr.split(" ")[0];
            subQuery.os_version = this.compareData.osStr.split(" ")[1];
          }
          subQuery.suite = this.compareData.suite;
          subQuery.os_arch = this.compareData.os_arch;
          subQuery.tbox_group = this.compareData.tbox_group;
          subQuery.dimension = this.compareData.dimension;
          compare(subQuery).then((res) => {
            this.resData = res;
          });
        } else {
          return false;
        }
      });
    },
  },
  mounted() {
    this.compareCandidates();
  },
};
</script>
<style lang="scss" scoped>
.filters {
  font-weight: bold;
  padding: 13px 0;
}
.compare-btn {
  background: #0041bd;
  color: #ffffff;
}
.compare-btn:hover,
.compare-btn:focus {
  background: #0041bd;
  color: #ffffff;
}
.el-button.is-disabled,
.el-button.is-disabled:focus,
.el-button.is-disabled:hover,
.el-button.is-disabled:active {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: rgba(0, 65, 189, .8);
  border-color: #ebeef5;
}
/deep/.el-form-item__label { 
    @media (max-width: 1000px) {
        text-align: left;
    }
}
</style>