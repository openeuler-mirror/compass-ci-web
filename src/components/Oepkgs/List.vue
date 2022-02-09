<template>
	<div class="row">
		<!-- 展示用户列表 -->
		<!--
		<div v-show="info.users.length" class="card" v-for="(software,index) in info.users" :key="index">
			{{software.softwareName}}-{{software.arch}}-{{software.type}}

		</div>
		-->
		<!--
		<el-main>
      <el-table v-show="info.users.length" :data="filtpackages">
	          <el-table-column prop="srpm_addr" label="软件包来源" width="140">
        </el-table-column>
        <el-table-column prop="softwareName" label="软件名" width="140">
        </el-table-column>
        <el-table-column prop="version" label="版本号" width="120">
        </el-table-column>
		        <el-table-column prop="arch" label="架构" width="120">
        </el-table-column>
		        <el-table-column prop="result_url" label="安装测试结果" width="120">
        </el-table-column>
		        <el-table-column prop="rpmbuild_result_url" label="构建测试结果" width="120">
        </el-table-column>
        <el-table-column prop="type" label="类型">
        </el-table-column>
      </el-table>
	  -->

<el-table v-show="info.users.length" :data="filtpackages" stripe class="jobs-data">
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
	export default {
		name:'List',
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
			tableHead: ['srpm_addr','softwareName', 'version','arch','result_url', 'rpmbuild_result_url'],

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
		mounted() {
			this.$bus.$on('updateListData',(dataObj)=>{
				console.log(dataObj,"dataobj是什么")
				this.info = {...this.info,...dataObj}
			})
		},
		computed:{
		    filtpackages(){
						return this.info.users.filter((p)=>{
							return p.softwareName.indexOf(this.info.keyWord) !== -1
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
	goBlank(src) {
      window.open(src, "_blank");
    }
}
	}
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
</style>