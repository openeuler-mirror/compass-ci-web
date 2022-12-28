<template>
  <div>
    <el-form ref="form" :model="sizeForm" label-width="150px" size="medium">
      <el-form-item label="reports per page" class="select-pages">
        <el-select
          v-model="listQuery.page_size"
          placeholder="请选择"
          size="medium"
          class="select-page"
          @change="getTestbox(listQuery)"
        >
          <el-option
            v-for="item in pageSizeOptions"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-checkbox-group v-model="selected_state">
          <el-checkbox-button
            :label="item"
            :key="index"
            v-for="(item, index) in state_list"
            @change="selectChangeState"
          ></el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="架构">
        <el-checkbox-group v-model="selected_arch">
          <el-checkbox-button
            :label="item"
            :key="index"
            v-for="(item, index) in arch_list"
            @change="selectChangeState"
          ></el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="占用用户">
        <el-checkbox-group v-model="selected_user">
          <el-checkbox-button
            :label="item"
            :key="index"
            v-for="(item, index) in user_list"
            @change="selectChangeState"
          ></el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="机器规格">
        <el-checkbox-group v-model="selected_tbox_group">
          <el-checkbox-button
            :label="item"
            :key="index"
            v-for="(item, index) in tbox_group_list"
            @change="selectChangeState"
          ></el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
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
import { queryTestbox } from "../../api/jobs.js";

export default {
  name: "pmachine",
  props: ['type'],
  data() {
    return {
      pageSizeOptions: [10, 20, 30],
      tableData: [],
      totalData: [],
      total: 1000,
      tableHeader: {},
      toolDisabled: false,
      jobsQuery: {},
      testboxQuery: {},
      listQuery: {
        page_size: 10,
        page_num: 0,
        type: this.type,
        state: [],
        arch: [],
        my_account: [],
        tbox_group: [],
      },
      selected_state: [],
      selected_tbox_group: [],
      selected_user: [],
      selected_arch: [],
      user_list: [],
      arch_list: [],
      state_list: [],
      tbox_group_list: [],
      tableHead: [
        "testbox",
        "state",
        "arch",
        "job_id",
        "user",
        "time",
        "suite",
        "tbox_group",
      ],
    };
  },
  methods: {
    getTestbox(data) {
      getTestbox(data).then((res) => {
        this.jobsQuery = res;
        this.tableData = this.jobsQuery.info;
        this.total = this.jobsQuery.total;
      });
    },
    selectChangeState() {
      this.listQuery.state = this.selected_state;
      this.listQuery.arch = this.selected_arch;
      this.listQuery.my_account = this.selected_user;
      this.listQuery.tbox_group = this.selected_tbox_group;
      this.getTestbox(this.listQuery);
    },
    queryTestbox(data) {
      queryTestbox(data).then((res) => {
        this.testboxQuery = res;
        this.state_list = this.testboxQuery.State;
        this.arch_list = this.testboxQuery.Arch;
        this.user_list = this.testboxQuery.User;
        this.tbox_group_list = this.testboxQuery.TboxGroup;
      });
    },
    handleSizeChange(val) {
      this.listQuery.page_size = val;
      this.getTestbox(this.listQuery);
    },
    handleCurrentChange(val) {
      this.listQuery.page_num = val;
      this.getTestbox(this.listQuery);
    },
    getWidth(item) {
      if (item == "state") {
        return 150;
      } else if (item == "testbox") {
        return 350;
      } else if (item == "time") {
        return 210
      } else if (item == "tbox_group") {
        return 300
      } else if (item == "user" || item == "suite") {
        return 160
      }
    },
    getLable(item) {
      if (item == "testbox") {
        return "机器";
      } else if (item == "state") {
        return "机器状态";
      } else if (item == "arch") {
        return "架构";
      } else if (item == "user") {
        return "用户";
      } else if (item == "time") {
        return "启用时间";
      }
      return item;
    },
  },
  mounted() {
    var data = this.$route.query;
    data.page_size = this.listQuery.page_size;
    data.page_num = this.listQuery.page_num;
    data.type = this.listQuery.type;

    this.getTestbox(data);
    this.queryTestbox(data);
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