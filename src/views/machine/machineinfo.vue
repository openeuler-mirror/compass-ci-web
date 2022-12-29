<template>
  <div id="jobs">
    <Header class="main-header"></Header>
    <div class="content">
      <h1 class="title">Compass CI 机器资源列表</h1>
      <p class="summary">compass-ci的资源池有物理机、虚拟机和容器</p>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="物理机" name="first">
          <template>
            <pmachine type="physical"></pmachine>
          </template>
        </el-tab-pane>
        <el-tab-pane label="虚拟机" name="second">
          <template>
            <pmachine type="vm"></pmachine>
          </template>
        </el-tab-pane>
        <el-tab-pane label="容器" name="third">
          <template>
            <pmachine type="dc"></pmachine>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
import pmachine from "./pmachine.vue";

export default {
  name: "machineinfo",
  components: {
    Header,
    pmachine,
  },
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>