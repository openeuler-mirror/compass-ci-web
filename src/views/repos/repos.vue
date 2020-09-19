<template>
  <div id="repos">
    <Header class="main-header"></Header>
    <div class="content">
      <h1 class="title">Repos</h1>
      <p class="summary">summary</p>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="reports per page" class="select-pages">
          <el-select
            v-model="listQuery.page_size"
            placeholder="请选择"
            size="medium"
            class="select-page"
            @change="getAllRepos"
          >
            <el-option v-for="item in pageSizeOptions" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-table :data="reposList" stripe class="repos-data">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="git_repo" label="git_repo"></el-table-column>
        <el-table-column label="git_url">
          <template slot-scope="scope">
            <span @click="goRepos(scope.row.git_url)" class="goUrl">{{scope.row.git_url}}</span>
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
        :page-size="listQuery.page_size"
        :small="isSmall"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { getAllRepos } from "../../api/repo";
import Header from "@/components/Header";
export default {
  name: "Repos",
  components: {
    Header,
  },
  data() {
    return {
      listQuery: {
        page_size: 10,
        page_num: 1,
      },
      repoData: {},
      reposList: [],
      pageSizeOptions: [10, 20, 30],
      isSmall: false,
      currentPage: 1,
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
      window.open(src, "_blank");
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
<style lang='scss' scoped>
.page-tips {
  font-weight: bold;
  margin-right: 2%;
}
.jobs-tips {
  padding: 2% 0;
  line-height: 30px;
}
.select-page {
  width: 113px;
}
/deep/.el-form-item__label {
  font-weight: bold;
}
</style>