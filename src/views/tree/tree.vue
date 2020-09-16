<template>
  <div id="tree">
    <div class="content">
      <h1 class="title">Tree</h1>
      <p class="summary">summary</p>
      <div class="tree-header-tips">
        <el-row :gutter="10" class="tree-infos">
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" class="tree-info">
            <div>git repo</div>
          </el-col>
          <el-col :xs="8" :sm="6" :md="10" :lg="6" :xl="3" class="tree-info_detail">
            <div>{{banner.repo?banner.repo:''}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="tree-infos">
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" class="tree-info">
            <div>git url</div>
          </el-col>
          <el-col :xs="8" :sm="6" :md="10" :lg="10" :xl="10" class="tree-info_detail">
            <span class="goUrl" @click="goGit(banner.git_url)">{{banner.git_url}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="tree-infos">
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" class="tree-info">
            <div>branches</div>
          </el-col>
          <el-col
            :xs="8" :sm="6" :md="4" :lg="2" :xl="1" class="tree-info-detail"  v-for="item in banner.branch" :key="item" >
            <div>{{item}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="tree-infos">
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" class="tree-info">
            <div>jobs</div>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="2" :xl="1" class="tree-info-detail">
            <!-- <div>index/stable</div> -->
          </el-col>
        </el-row>
      </div>
      <el-table :data="tableData" stripe class="jobs-data">
        <el-table-column
          :label="item"
          :key="index"
          v-for="(item,index) in tableHead"
        >
          <template slot-scope="scope" >
              <span class="goUrl" @click="goTestBox('https://gitee.com/wu_fengguang/lab-z9/tree/master/hosts/'+scope.row[item])" v-if="item ==='testbox'">{{scope.row[item]}}</span>
              <span class="goUrl" @click="goResult('http://124.90.34.227:11300/result/'+scope.row.suite +'/'+ scope.row.id)" v-else-if="item ==='job_state'">{{scope.row[item]}}</span>
              <span class="goUrl" @click="goTree(scope.row[item])" v-else-if="item =='upstream_repo'">{{scope.row[item]}}</span>
              <span v-else>{{scope.row[item]}}</span>
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
export default {
  name: "Tree",
  components: {},
  data() {
    return {
      pageSizeOptions: [10, 20, 50],
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
      isSmall:false,
    };
  },
  methods: {
    goTree(item) {
      this.$router.push({
        path:'/tree',
        query:{
          upstream_repo:item
        }
      })
    },
    goTestBox(src) {
       window.location.href = src
    },
    goResult(src) {
      window.location.href = src
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
        if(this.isMobile()) {
          this.isSmall = true
        } else {
          this.isSmall = false
        }
      });
    },
    handleCurrentChange(val) {
      this.listQuery.page_num = val;
      this.getJobs();
    },
     isMobile() {
     let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    },
  },
  mounted() {
    this.listQuery.upstream_repo = this.$route.query.upstream_repo;
    if (this.listQuery.upstream_repo) {
      this.getJobs();
    }
  },
};
</script>
<style>
.tree-infos {
  padding: 10px 0;
}
.tree-info {
  font-weight: bold;
}
.branch {
  margin-right: 2%;
}
.tree-data {
  /* margin-top: 30px; */
}
.pagination {
  margin: 2% 0;
}
</style>