
<template>
  <div id="errorList">
    <Header class="main-header"></Header>
    <div class="content">
      <h1 class="title">Error List</h1>
      <el-table :data="tableData" stripe>
        <el-table-column
          v-for="(item,index) in tableHead"
          :label="item"
          :prop="item"
          :key="index"
          :width="getWidth(index)"
        >
          <template slot-scope="scope">
            <div
              class="go"
              v-if="item==='result_root'"
              @click="goBlank(scope.row[item])"
            >result_root</div>
            <div v-else>{{scope.row[item]}}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getErrorList } from "@/api/jobs.js";
import Header from "@/components/Header";
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
      return index % 3 == 0 ? 120 : 0;
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style lang='scss' scoped>
.go {
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}
</style>