<template>
	<div class="row">
          <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="reports per page" class="select-pages">
          <el-select
            v-model="listQuery.page_size"
            placeholder="请选择"
            size="medium"
            class="select-page"
            @change="getSrpms(listQuery)"
          >
            <el-option
              v-for="item in pageSizeOptions"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="search">
          <el-input
            class="search-input"
            v-model="filter"
            placeholder="search srpms"
            size="medium"
            @keydown.enter.native="handSearch"
            clearable
            @clear="getSrpms(listQuery)"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handSearch"
            ></el-button>
          </el-input>
        </el-form-item>
      </el-form>
    <el-table v-show="tableData.length" :data="tableData" stripe class="jobs-data">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column
          :label="item"
          :key="index"
          v-for="(item, index) in tableHead"
        >
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="light"
              :content="String(scope.row[item])"
              placement="top-start"
              :disabled="toolDisabled"
            >
              <div slot="content" v-if="item == 'error_ids'">
                <template v-for="(ids, idsIndex) in scope.row[item]">
                  <p :key="idsIndex">{{ ids + "," }}</p>
                </template>
              </div>
              <div slot="content" v-else>{{ scope.row[item] }}</div>
              <span
                class="goUrl wrap"
                @click="goBlank(scope.row.result_url)"
                v-if="item === 'result_url'"
                @mouseover="showtip(item)"
                >Link</span
              >
              <span
                class="goUrl wrap"
                @click="goBlank(scope.row.rpmbuild_result_url)"
                v-else-if="item === 'rpmbuild_result_url'"
                @mouseover="showtip(item)"
                >Link</span
              >
              <span
                class="goUrl wrap"
                @click="goBlank(scope.row.srpm_addr)"
                v-else-if="item == 'srpm_addr'"
                @mouseover="showtip(item)"
                >源码地址</span
              >
              <span
                class="wrap"
                v-else-if="item == 'error_ids'"
                @mouseover="showtip(item)"
              >
                <template v-for="item in scope.row[item]">
                  <span :key="item">{{ item }}</span>
                </template>
              </span>
              <span class="wrap" v-else @mouseover="showtip(item)">{{
                scope.row[item]
              }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

    </el-main>
		<!-- 展示欢迎词 -->
		<h1 v-show="info.isFirst">这里是oepkgs仓库中软件包的查询入口，欢迎使用！</h1>
		<!-- 展示加载中 -->
		<h1 v-show="info.isLoading">加载中....</h1>
		<!-- 展示错误信息 -->
		<h1 v-show="info.errMsg">{{info.errMsg}}</h1>
	</div>
</template>

<script>
import { getSrpms } from "../../api/jobs.js";
//import { BASEURLTESTBOX, BASEURLRESULT } from "../../utils/baseUrl.js";
	export default {
		name:'Oepkgs',
		data() {
			const item = {
                    srpm_addr:'',
                    softwareName: '',
                    arch: '',
                    version: '',
                    result_url:'',
                    rpmbuild_result_url:'',
                    type:''
                    };
			return {
                pageSizeOptions: [10, 20, 30],
                tableData: [],
                filter: null,
                tableHeader: {},
                jobsQuery: {},
                listQuery: {
                    page_size: 10,
                    page_num: 0,
                },
                tableHead: [],
                toolDisabled: false,
                info:{
                    isFirst:true,
                    isLoading:false,
                    errMsg:'',
                    keyWord:'',
                    users:Array().fill(item)	
                }
        }
		},
		computed:{
		    filtpackages(){
                return this.tableData.filter((p)=>{
                    return p.softwareName.indexOf(this.filter) !== -1
                })
            }
		},
    methods: {
        showtip(item) {
          if (
            item == "result_url" ||
            item == "rpmbuild_result_url" ||
            item == "srpm_addr" ||
            item == "upstream_commit" ||
            item == "start_time" ||
            item == "id" ||
            item == "error_ids" ||
            item == "upstream_branch" ||
            item == "suite" ||
            item == "os_version"
          ) {
            this.toolDisabled = false;
          } else {
            this.toolDisabled = true;
          }
        },
        handSearch() {
        },
        updateURL(data) {
          var routeQuery = {};
          for (var x in data) {
            if (x != "page_num" && x != "page_size") {
              routeQuery[x] = data[x];
            }
          }
          this.$router.push({
            path: this.$route.path,
            query: routeQuery,
          });
        },
        getSrpms(data) {
          this.updateURL(data);
          getSrpms(data).then((res) => {
            this.jobsQuery = res;
            this.tableHead = this.jobsQuery.fields;
            console.log(this.jobsQuery,'jobquery是什么？');
            this.tableData = this.jobsQuery;
            console.log(this.jobsQuery,'jobquery是什么？');
            console.log(data,'zhelidedata是什么？');
          });
        },
      goBlank(src) {
          window.open(src, "_blank");
        }
    },
		mounted() {
      var data = this.$route.query;
      console.log(data,'data是什么？');
      data.page_size = this.listQuery.page_size;
      data.page_num = this.listQuery.page_num;

      this.getSrpms(data);
      console.log(this.tableData,'ta是什么？');
		},
	};
</script>


<style scoped>
	.album {
		min-height: 50rem; /* Can be removed; just added for demo purposes */
		padding-top: 3rem;
		padding-bottom: 3rem;
		background-color: #f7f7f7;
	}

	.card {
		float: left;
		width: 33.333%;
		padding: .75rem;
		margin-bottom: 2rem;
		border: 1px solid #efefef;
		text-align: center;
	}

	.card > img {
		margin-bottom: .75rem;
		border-radius: 100px;
	}

	.card-text {
		font-size: 85%;
	}

	  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
.jobs-data {
  width: 100%;
}
.search {
  margin-left: 92px;
  @media screen and (max-width: 1000px) {
    margin-left: 0;
  }
}
.search-input {
  width: 550px;
}
.select-page {
  width: 113px;
}
/deep/.el-form-item__label {
  font-weight: bold;
}
.ids-num {
  color: #002fa7;
}
/deep/.el-table th > .cell {
  font-weight: bold;
}
</style>