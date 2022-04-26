<template>
  <div id="test">
    <Header class="main-header"></Header>
    <div class="content">
      <h1 class="title">Test Matrix</h1>
      <p class="summary">多架构多系统测试结果对比</p>
      <div style="margin-top: 15px;margin-bottom:50px;text-align: center;">
        <el-input placeholder="group_id" v-model="groupId" class="input-with-select" >
            <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
        </el-input>
      </div>

      <el-table
        :data="tableData"
        border
        style="width:58%;margin:auto"
        :header-cell-style="{background:'#f8f8ff','text-align':'center'}"
        :cell-style="cellClsNm"
        :cell-class-name="tableCellClassName"
        @cell-click="cell_result">
        <el-table-column
        prop="repoName"
        label="包名"
        align="center">
        </el-table-column>
        <el-table-column
        prop="os"
        label="os"
        width="250"
        align="center">
        </el-table-column>
        <el-table-column
        prop="arch"
        label="架构"
        width="200"
        align="center">
        </el-table-column>
        <el-table-column
        prop="build"
        label="构建测试"
        width="150"
        align="center">
            <template slot-scope="scope">
                <img :src="scope.row.build"/>
            </template>
        </el-table-column>
        <el-table-column
        prop="compatibility"
        label="兼容性测试"
        width="150"
        align="center">
            <template slot-scope="scope_comp">
                <img :src="scope_comp.row.compatibility"/>
            </template>
        </el-table-column>
        <el-table-column
        prop="function"
        label="功能测试"
        width="150"
        align="center">
            <template slot-scope="scope_func">
                <img :src="scope_func.row.function"/>
            </template>
        </el-table-column>
        <!-- <el-table-column
        prop="performance"
        label="性能"
        width="150"
        align="center">
             <template slot-scope="scope_perf">
                <img :src="scope_perf.row.performance"/> 
             </template> 
        </el-table-column> -->
      </el-table>
      </div>
    </div>
</template>
<script>
import Header from "@/components/Header";
import { testMatrix } from "../../api/testMatrix.js";
export default {
  name: "testMatrix",
  components: {
    Header
  },
  data() {
      return {
          groupId:'',
          response:[],
          tableData:[]
      }
    
  },
  methods: {
      cellClsNm(row){
          if(row.columnIndex=="0" || row.columnIndex=="1" ||row.columnIndex=="2"){
              return 'background:#f8f8ff'
          }
      },
      search:function(){
          let data={group_id:this.groupId}
          if(this.groupId==''){
            return;
          }
          testMatrix(data).then( res => {
              this.response=res
              this.toTable();
          })
      },
      toTable:function(){
          this.tableData=[];
          
          for(var i in this.response){
              var tmp=this.response[i];
              let item={
                  repoName :this.groupId.split('-')[0],
                  os:tmp.os + "\u3000" + tmp.os_version,
                  arch:tmp.os_arch,
                  build: tmp.build_job_health=="success" ? require("../../assets/success.png"): tmp.build_job_health==null ? require("../../assets/null.png"):require("../../assets/fail.png"),
                  compatibility: !('install_job_health' in tmp) || tmp.install_job_health==null ? require("../../assets/null.png") :tmp.install_job_health=="success" ? require("../../assets/success.png"):require("../../assets/fail.png"),
                  function:!('func_job_health' in tmp) ? require("../../assets/null.png") :tmp.func_job_health=="success" ? require("../../assets/success.png"):require("../../assets/fail.png"),
              }
              this.tableData.push(item)
          }
      },
      cell_result:function(row,column){
          var href;
          console.log()
          if(column.index >= 3){
            href="https://api.compass-ci.openeuler.org:20007"+this.response[row.index].result_root;
            window.open(href,'_blank');
          }
      },
      tableCellClassName({row,column,rowIndex,columnIndex}){
          row.index=rowIndex;
          column.index=columnIndex;
      }
  }
};
</script>
<style lang="less" scoped>
img{
    height: 20px;
    width: 20px;
}
.input-with-select {
  background-color: #fff;
  width: 50%;
  align-items: center;
}
.div-table {
    width: auto;
}

.page-tips {
  font-weight: bold;
  margin-right: 2%;
}
.jobs-tips {
  padding: 2% 0;
  line-height: 30px;
}
.search {
  margin-left: 92px;
  @media screen and (max-width: 1000px) {
    margin-left: 0;
  }
}
.select-page {
  width: 113px;
}
/deep/.el-form-item__label {
  font-weight: bold;
}
/deep/.el-table th > .cell {
  font-weight: bold;
}
</style>