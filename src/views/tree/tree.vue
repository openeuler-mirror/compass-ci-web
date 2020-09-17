<template>
  <div id="tree">
    <div class="content">
      <h1 class="title">Tree</h1>
      <p class="summary">summary</p>
      <div class="tree-header-tips">
        <el-form label-position="left" class="tree-header-tips">
          <el-form-item label="git repo">
            <div>{{banner.repo?banner.repo:''}}</div>
          </el-form-item>
          <el-form-item label="git url">
            <div class="goUrl" @click="goGit(banner.git_url)">{{banner.git_url}}</div>
          </el-form-item>
          <el-form-item label="branches">
            <template v-for="item in banner.branch">
              <span :key="item" class="branch">{{item}}</span>
            </template>
          </el-form-item>
          <el-form-item label="jobs"></el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" stripe class="jobs-data">
        <el-table-column :label="item" :key="index" v-for="(item,index) in tableHead">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="light"
              :content="String(scope.row[item])"
              placement="top-start"
              :disabled="toolDisabled"
            >
              <div slot="content"  v-if="item == 'error_ids'">
                <template v-for=" (ids,idsIndex) in scope.row[item]">
                  <p :key="idsIndex">
                    {{ids+','}}
                  </p>
                </template>
              </div>
              <div slot="content"  v-else>{{scope.row[item]}}</div>
              <span
                class="goUrl wrap"
                @click="goTestBox(testBoxUrl+scope.row[item])"
                v-if="item ==='testbox'"
                @mouseover="showtip(item)"
              >{{scope.row[item]}}</span>
              <span
                class="goUrl wrap"
                @click="goResult(resultUrl+scope.row.suite +'/'+ scope.row.id)"
                v-else-if="item ==='job_state'"
                @mouseover="showtip(item)"
              >{{scope.row[item]}}</span>
              <span
                class="wrap"
                v-else-if="item =='upstream_repo'"
                @mouseover="showtip(item)"
              >{{scope.row[item]}}</span>
              <span class="wrap" v-else-if="item =='error_ids'" @mouseover="showtip(item)">
                <template v-for="item in scope.row[item]">
                  <span :key="item">{{item}}</span>
                </template>
              </span>
              <span class="wrap" v-else @mouseover="showtip(item)">{{scope.row[item]}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div>
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
  </div>
</template>
<script>
import { getJobs } from "../../api/jobs.js";
import {BASEURLRESULT, BASEURLTESTBOX} from "../../utils/baseUrl.js";
export default {
  name: "Tree",
  components: {},
  data() {
    return {
      pageSizeOptions: [10, 20, 30],
      tableData: [],
      tableHead: [],
      currentPage: 1,
      listQuery: {
        upstream_repo: "",
        page_size: 10,
        page_num: 1,
      },
      jobsQuery: {},
      banner: {},
      isSmall: false,
      toolDisabled: false,
      resultUrl: "",
      testBoxUrl: "",
    };
  },
  methods: {
    showtip(item) {
      if (
        item == "testbox" ||
        item == "error_ids" ||
        item == "upstream_repo" ||
        item == "upstream_commit" ||
        item == "start_time" ||
        item == "id" ||
        item == "error_ids"
      ) {
        this.toolDisabled = false;
      } else {
        this.toolDisabled = true;
      }
    },
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
    goGit(src) {
      window.location.href = src;
    },
    getJobs() {
      getJobs(this.listQuery).then((res) => {
        this.jobsQuery = res;
        this.tableHead = this.jobsQuery.fields;
        this.tableData = this.jobsQuery.jobs;
        this.banner = this.jobsQuery.banner;
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
    this.testBoxUrl = BASEURLTESTBOX;
    this.resultUrl = BASEURLRESULT;
    this.listQuery.upstream_repo = this.$route.query.upstream_repo;
    if (this.listQuery.upstream_repo) {
      this.getJobs();
    }
  },
};
</script>
<style lang='scss' scoped>
.tree-infos {
  padding: 10px 0;
}
.tree-info {
  font-weight: bold;
}
.branch {
  margin-right: 2%;
}
/deep/.el-form-item__label {
  font-weight: bold;
  width: 180px;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
}
</style>