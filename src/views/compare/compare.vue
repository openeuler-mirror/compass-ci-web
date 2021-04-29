<template>
  <div id="compare">
    <Header class="main-header"></Header>
    <div class="content">
      <h1 class="title">Compare</h1>
      <p class="summary">让测试分析过程更简单，更高效</p>
      <div class="filters">filters</div>
      <el-form
        :inline="true"
        :model="compareData"
        ref="ruleForm"
        :rules="rules"
        class="demo-form-inline"
      >
        <el-form-item label="suite" prop="suite" label-width="100px" class="com-tips">
          <el-select
            v-model="compareData.suite"
            filterable
            placeholder="请选择"
            size="medium"
            clearable
            @clear="clearCheck('suite')"
          >
            <el-option v-for="item in suiteData" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="OS" prop="OS" label-width="100px">
          <el-cascader
            v-model="handlerValue"
            ref="refHandle"
            @change="changeOs"
            :options="OSData"
            :props="{ checkStrictly: true }"
            size="medium"
            clearable
            @clear="clearCheck('os')"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="os_arch" prop="os_arch" label-width="100px">
          <el-select
            v-model="compareData.os_arch"
            filterable
            placeholder="请选择"
            size="medium"
            clearable
            @clear="clearCheck('os_arch')"
          >
            <el-option v-for="item in osArchData" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="tbox_group" prop="tbox_group" label-width="120px">
          <el-select
            v-model="compareData.tbox_group"
            filterable
            placeholder="请选择"
            size="medium"
            clearable
            @clear="clearCheck('tbox_group')"
          >
            <el-option v-for="item in tboxGroupdata" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="dimension" prop="dimension" label-width="100px">
          <el-select
            v-model="compareData.dimension"
            filterable
            placeholder="请选择"
            size="medium"
            @change="isDimesion"
            clearable
            @clear="changeFlag"
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
import { compareCandidates, compare } from "../../api/compare";
import Header from "@/components/Header";
export default {
  name: "Compare",
  components: {
    Header,
  },
  watch: {
    handlerValue() {
      if (this.$refs.refHandle) {
        this.$refs.refHandle.dropDownVisible = false; //监听值发生变化就关闭它
      }
    },
  },
  data() {
    return {
      handlerValue: null,
      flag: true,
      listquery: {
        os: "",
        suite: "",
        dimension: "",
      },
      compareData: {
        suite: null,
        osStr: null,
        os: null,
        os_version: null,
        os_arch: null,
        tbox_group: null,
        dimension: null,
      },
      rules: {
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
      dimensionData: [],
      resData: "",
    };
  },
  methods: {
    clearCheck(str) {
      if (str == "os") {
        this.compareData.os = null;
        this.os_version = null;
      } else {
        this.compareData[str] = null;
      }
    },
    changeOs(val) {
      this.compareData.os = val[0];
      this.compareData.os_version = val[1];
    },
    isDimesion() {
      if (this.compareData.dimension) {
        this.flag = false;
      }
    },
    changeFlag() {
      this.flag = true;
    },
    compareCandidates() {
      compareCandidates().then((res) => {
        this.suiteData = res.query_conditions.suite.sort();
        this.OSData = this.propsdata(res.query_conditions.OS);
        this.osArchData = res.query_conditions.os_arch;
        this.tboxGroupdata = res.query_conditions.tbox_group;
        this.dimensionData = res.dimension;
      });
    },
    handleValid() {
      let arrCom = [];
      for (let item in this.compareData) {
        if (item !== "dimension") {
          arrCom.push(this.compareData[item]);
        }
      }
      let boll = arrCom.some((item) => {
        return item != null;
      });
      if (boll) {
        return boll;
      } else {
        this.$message("请选择 suite OS OS_ arch tbox_group 其中至少一个选项");
      }
    },
    compare() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          if (this.handleValid()) {
            compare(this.compareData).then((res) => {
              this.resData = res;
            });
          }
        } else {
          return false;
        }
      });
    },
    propsdata(arr) {
      let result = [];
      let osdata = []
      osdata = arr
      osdata.forEach((item) => {
        let obj = {
          children: [],
        };
        Object.keys(item).map((key) => {
          if (key === "os") {
            obj.value = item[key];
            obj.label = item[key];
          }
          if (key === "os_version") {
            item[key].forEach((iten) => {
              let obj1 = {};
              obj1.value = iten;
              obj1.label = iten;
              obj.children.push(obj1);
            });
          }
        });
        result.push(obj)
      });
      return result
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
  background-color: rgba(0, 65, 189, 0.8);
  border-color: #ebeef5;
}
/deep/.el-form-item__label {
  @media screen and (max-width: 1000px) {
    text-align: left;
  }
}
</style>