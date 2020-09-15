<template>
  <div id="repos">
    <div class="content">
      <h1 class="title">Repos</h1>
      <p class="summary">summary</p>
      <el-row :gutter="10">
        <el-col :xs="40" :sm="10" :md="10" :lg="8" :xl="3" class="jobs-tips">
          <span class="page-tips">reports per page</span>
          <el-select
            v-model="listQuery.page_size"
            placeholder="请选择"
            size="medium"
            @change="getAllRepos"
          >
            <el-option v-for="item in pageSizeOptions" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-table :data="reposList" stripe class="repos-data">
        <el-table-column prop="git_repo" label="git_repo"></el-table-column>
        <el-table-column label="git_repo">
          <template slot-scope="scope">
            <span class="goUrl" @click="goRepos(scope.row.git_url)">{{scope.row.git_url}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, pager, jumper"
        :total="repoData.total"
        class="pagination"
        :pager-count="5"
        :small="isSmall"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import {getAllRepos} from "../../api/repo";
export default {
  name: "Repos",
  data() {
    return {
      listQuery: {
        page_size: 10,
        page_num: 1,
      },
      repoData: {},
      reposList: [],
      pageSizeOptions: [10, 20, 50],
      isSmall: false,
      currentPage:1
    };
  },
  methods: {
    getAllRepos() {
      getAllRepos(this.listQuery).then((res) => {
        this.repoData = res;
        this.reposList = this.repoData.repos;
        if (this.isMobile()) {
          this.isSmall = true;
        } else {
          this.isSmall = false;
        }
      });
    },
    goRepos(src) {
      window.location.href = src;
    },
    handleCurrentChange(val) {
      this.listQuery.page_num = val;
      this.getAllRepos();
    },
    isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
  },
  mounted() {
    this.getAllRepos();
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
</style>