<template>
  <div>
    <el-table :data="tableData" stripe class="jobs-data">
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <el-table-column
        :label="getLable(item)"
        :key="index"
        v-for="(item, index) in tableHead"
        :prop="item"
        :width="getWidth(item)"
      >
        <template slot-scope="scope">
          <template>
            <span>{{ scope.row[item] }}</span>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="listQuery.page_num"
      :page-size="listQuery.page_size"
      layout="total, prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
import { getTestbox } from "../../api/jobs.js";

export default {
  name: "vmachine",
  data() {
    return {
      tableData: [],
      totalData: [],
      total: 1000,
      filter: null,
      tableHeader: {},
      toolDisabled: false,
      jobsQuery: {},
      listQuery: {
        page_size: 10,
        page_num: 0,
      },
      tableHead: [
        "key",
        "doc_count",
      ],
    };
  },
  methods: {
    getTestbox(data) {
      getTestbox(data).then((res) => {
        this.jobsQuery = res;
        this.tableData = this.jobsQuery.vm;
        console.log(this.tableData);
      });
    },
    getWidth(item) {
      if (item == "doc_count" || item == "version" || item == "arch") {
        return 100;
      } else if (item == "os") {
        return 200;
      } else if (item == "key") {
        return 300;
      }
    },
    getLable(item) {
      if (item == "key") {
        return "机器规格";
      } else if (item == "doc_count") {
        return "数量";
      }
      return item;
    },
  },
  mounted() {
    var data = this.$route.query;
    data.page_size = this.listQuery.page_size;
    data.page_num = this.listQuery.page_num;

    this.getTestbox(data);
  },
};
</script>


<style lang="less" scoped>
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