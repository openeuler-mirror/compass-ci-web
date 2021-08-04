<template>
  <div id="JobSummary">
    <Header class="main-header"></Header>
    <div class="content">
      <h1 class="title">Job Summary</h1>
      <el-form :model="listQuery">
        <el-form-item label="Filter" class="filter">
          <el-input v-model="filter" placeholder="eg:suite=iperf os=openeuler"></el-input>
        </el-form-item>
        <el-form-item label="Group By" class="group-by">
          <el-input
            v-model="listQuery.GROUP_BY"
            placeholder="eg:os_version"
            @keydown.enter.native="getData"
          ></el-input>
        </el-form-item>
        <el-form-item class="confirm">
          <el-button @click="getData">确定</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" stripe>
        <el-table-column
          v-for="(item,index) in tableHead"
          :label="item"
          :prop="item"
          width
          :key="index"
        >
          <template slot-scope="scope">
            <div
              class="go"
              v-if="item==='nr_fail'"
              @click="handleClick(scope.row[listQuery.GROUP_BY])"
            >{{scope.row[item]}}</div>
            <div v-else>{{scope.row[item]}}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getJobsSummary } from "@/api/jobs.js";
import Header from "@/components/Header";
export default {
  name: "JobSummary",
  components: {
    Header
  },
  data() {
    return {
      tableHead: [],
      tableData: [],
      tableHeader: {},
      filter: "",
      listQuery: {
        GROUP_BY: ""
      },
      jobsQuery: {}
    };
  },
  methods: {
    handleClick(id) {
      let obj = {};
      if (this.filter) {
        var filters = this.filter.split(" ");
        for (var f of filters) {
          var key_vaule = f.split("=");
          obj[key_vaule[0]] = key_vaule[1];
        }
      }

      obj[this.listQuery.GROUP_BY] = id;
      this.$router.push({
        path: "/error-list",
        query: obj
      });
    },
    parseFilter() {
      if (this.filter) {
        var filters = this.filter.split(" ");
        for (var f of filters) {
          var key_vaule = f.split("=");
          this.listQuery[key_vaule[0]] = key_vaule[1];
        }
      }
    },
    getData() {
      this.parseFilter();
      if (Object.keys(this.listQuery).length > 1 && this.listQuery.GROUP_BY) {
        this.$router.push({
          path: this.$route.path,
          query: this.listQuery
        });
        getJobsSummary(this.listQuery).then(res => {
          this.jobsQuery = res;
          this.tableHead = this.jobsQuery.attributes;
          this.tableData = this.jobsQuery.objects;
        });
      } else {
        this.$message("Filter和Grounp By为必填项");
      }
    }
  },
  mounted() {
    var data = this.$route.query;
    if (Object.keys(data).length != 0) {
      getJobsSummary(data).then(res => {
        this.jobsQuery = res;
        this.tableHead = this.jobsQuery.attributes;
        this.tableData = this.jobsQuery.objects;
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.filter,
.group-by {
  width: 30%;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
}
.confirm {
  position: absolute;
  top: 350px;
  left: 750px;
  @media screen and (max-width: 1000px) {
    display: none;
  }
}
.go {
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}
</style>