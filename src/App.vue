<template>
  <div id="app" >
    <div id="nav" >
      <el-menu
          router="true"
          :default-active="1"
          class="header_title"
          mode="horizontal">
        <el-menu-item index="1" route="/"><div ><i class="el-icon-house"></i>home</div></el-menu-item>
        <el-menu-item index="2" route="/jobs"><div ><i class="el-icon-position"></i>jobs</div></el-menu-item>
        <el-menu-item index="3" route="/repos"><div><i class="el-icon-star-off"></i>repos</div></el-menu-item>
        <el-menu-item index="4" route="/oepkgs"><div ><i class="el-icon-notebook-2"></i>oepkgs</div></el-menu-item>
        <el-menu-item index="5" route="/compare"><div ><i class="el-icon-odometer"></i>compareResult</div></el-menu-item>
        <el-submenu index="6">
          <template slot="title"><i class="el-icon-data-analysis"></i>summary</template>
          <el-menu-item index="6-1" route="/job-summary">jobSummary</el-menu-item>
          <el-menu-item index="6-2" route="/performance-result">performanceResult</el-menu-item>
          <el-menu-item index="6-3" route="/testMatrix">testMatrix</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <router-view class="container" style="margin-top: 3.7%"/>
    <Footer class="main-footer"></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
export default {
  data() {
    return {

    }
  },
  components: {
    Footer,
  },
  methods: {
    notice() {
      this.$notify({
        title: "通知",
        message: "机房于2020年11月28日20:00至2020年11月29日20:00维护，将不能正常访问数据，给您带来的不便，敬请谅解！",
        duration: 0,
        showClose: false,
      });
    },
  },
  mounted() {

  },
  updated() {
    window.scroll(0, 0);
  },
};
</script>

<style lang="less" scoped>
#app {
  height: 100%;
  position: relative;
}
.container {
  padding-bottom: 62px;
  min-height: calc(100vh - 152px);
  @media screen and (max-width: 1000px) {
    padding-bottom: 100px;
  }
}
.header_title {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  padding-left: 9%;
}
</style>
