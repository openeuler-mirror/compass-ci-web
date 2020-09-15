<template>
  <div id="jobs">
    <!-- <Header></Header> -->
    <div class="content">
      <h1 class="title">Jobs</h1>
      <p class="summary">summary</p>
      <el-row :gutter="10">
        <el-col :xs="20" :sm="15" :md="15" :lg="8" :xl="3" class="jobs-tips">
          <span class="page-tips">reports per page</span>
          <el-select
            v-model="listQuery.page_size"
            placeholder="请选择"
            size="medium"
            @change="getJobs"
          >
            <el-option v-for="item in pageSizeOptions" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="16" :sm="8" :md="8" :lg="6" :xl="3" class="jobs-tips">
          <el-input
            v-model="listQuery.upstream_repo"
            placeholder="Filter the results"
            size="medium"
            @keydown.enter.native="getJobs"
            clearable
            @clear="getJobs"
          >
            <el-button slot="append" icon="el-icon-search" @click="getJobs"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="tableData" stripe class="jobs-data">
        <el-table-column
          :label="item"
          :key="index"
          v-for="(item,index) in tableHead"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span
              class="goUrl"
              @click="goTestBox('https://gitee.com/wu_fengguang/lab-z9/tree/master/hosts/'+scope.row[item])"
              v-if="item ==='testbox'"
            >{{scope.row[item]}}</span>
            <span
              class="goUrl"
              @click="goResult('http://124.90.34.227:11300/result/'+scope.row.suite +'/'+ scope.row.id)"
              v-else-if="item ==='job_state'"
            >{{scope.row[item]}}</span>
            <span
              class="goUrl"
              @click="goTree(scope.row[item])"
              v-else-if="item =='upstream_repo'"
            >{{scope.row[item]}}</span>
            <span v-else>{{scope.row[item]}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, pager, jumper"
        :total="jobsQuery.total"
        class="pagination"
        :pager-count="5"
        :small="isSmall"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import {getJobs} from "../../api/jobs.js";
// import Header from "../../components/Header";
export default {
  name: "Jobs",
  components: {
    // Header,
  },
  data() {
    return {
      // 表头假数据
      tableHead: [],
      // 表格数据
      tableData: [],
      state: "",
      tableHeader: {},
      currentPage: 1,
      // 请求参数
      listQuery: {
        upstream_repo: null,
        page_size: 10,
        page_num: 1,
      },
      pageSizeOptions: [10, 20, 50],
      jobsQuery: {},
      isSmall: false,
    };
  },
  methods: {
    goTree(item) {
      this.$router.push({
        path: "/tree",
        query: {
          upstream_repo: item,
        },
      });
    },
    goTestBox(src) {
      window.location.href = src;
    },
    goResult(src) {
      window.location.href = src;
    },
    getJobs() {
      getJobs(this.listQuery).then((res) => {
        this.jobsQuery = res;
        this.tableHead = this.jobsQuery.fields;
        this.tableData = this.jobsQuery.jobs;
        if (this.isMobile()) {
          this.isSmall = true;
        } else {
          this.isSmall = false;
        }
      });
    },
    handleCurrentChange(val) {
      this.listQuery.page_num = val;
      this.getJobs();
    },
    isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
  },
  mounted() {
    this.getJobs();
  },
};
</script>
<style>
.page-tips {
  font-weight: bold;
  margin-right: 2%;
}
.jobs-tips {
  padding: 2% 0;
  line-height: 30px;
}
.jobs-data {
  width: 100%;
}
.pagination {
  width: 100%;
  /* margin: 2% 0; */
}
</style>