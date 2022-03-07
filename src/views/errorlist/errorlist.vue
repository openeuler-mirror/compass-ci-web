
<template>
  <div id="errorList">
    <Header class="main-header"></Header>
    <div class="content">
      <h1 class="title">Error List</h1>
      <el-table :data="tableData" stripe>
        <template v-for="(item,index) in tableHead">
          <el-table-column
            v-if="item!='result_root' && item!='error_id'"
            :label="item"
            :prop="item"
            :key="index"
            :width="getWidth(index)"
          >
            <template slot-scope="scope">
              <div
                class="go"
                v-if="item==='job_id'"
                @click="goBlank(scope.row['result_root'])"
              >{{scope.row[item]}}</div>
              <div class="go" v-else-if="item==='stderr'" @click="goBlank(scope.row[item])">stderr</div>
              <div v-else>{{scope.row[item]}}</div>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getErrorList } from "@/api/jobs.js";
import Header from "@/components/Header";
import { BASEURLRESULT } from "../../utils/baseUrl.js";
export default {
  name: "ErrorList",
  components: {
    Header
  },
  data() {
    return {
      tableHead: [],
      tableData: [],
      tableHeader: {},
      jobsQuery: {}
    };
  },
  methods: {
    goBlank(src) {
      src = BASEURLRESULT + src + '/';
      window.open(src, "_blank");
    },
    getData() {
      getErrorList(this.$route.query).then(res => {
        this.jobsQuery = res;
        this.tableHead = this.jobsQuery.attributes;
        this.tableData = this.jobsQuery.objects;
      });
    },
    getWidth(index) {
      if (index == 0 || index == 3 || index == 4) return 120;

      return 0;
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style lang="less" scoped>
.go {
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}
</style>
