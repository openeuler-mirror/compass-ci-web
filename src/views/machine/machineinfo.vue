<template>
  <div id="jobs">
    <Header class="main-header"></Header>
    <div class="content">
      <h1 class="title">Compass CI 机器资源列表</h1>
      <p class="summary">compass-ci的资源池有物理机、虚拟机和容器</p>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="物理机" name="first">
          <template>
            <pmachine></pmachine>
          </template>
        </el-tab-pane>
        <el-tab-pane label="虚拟机" name="second">
          <template>
            <vmachine></vmachine>
          </template>
        </el-tab-pane>
        <el-tab-pane label="容器" name="third">
          <template>
            <docker></docker>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
import pmachine from "./pmachine.vue";
import vmachine from "./vmachine.vue";
import docker from "./docker.vue";

export default {
  name: "machineinfo",
  components: {
    Header,
    pmachine,
    vmachine,
    docker,
  },
  data() {
    return {
      activeName: "first",
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
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  mounted() {
    var data = this.$route.query;
    data.page_size = this.listQuery.page_size;
    data.page_num = this.listQuery.page_num;

    this.getTestbox(data);
  },
};
</script>

