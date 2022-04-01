<template>
  <header class="home-header">
    <!-- <p class="small-title">{{headTitleObj.HEAD?headTitleObj.HEAD.SMALLTITLE:''}}</p> -->
    <div class="ci-logo">CI</div>
    <div class="nav-div">
      <el-menu
        default-active="/job-summary"
        mode="horizontal"
        background-color="unset"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
      >
        <el-menu-item index="/job-summary">测试汇总</el-menu-item>
        <el-menu-item index="/performance-result">性能图表</el-menu-item>
      </el-menu>
    </div>
    <div class="center-title">
      <p class="tile">{{headTitleObj.HEAD?headTitleObj.HEAD.CENTERTITLE:''}}</p>
      <p class="home-content">{{headTitleObj.HEAD?headTitleObj.HEAD.CENTERCONTENT:''}}</p>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      headTitleObj: {}
    };
  },
  methods: {
    handleSelect(path) {
      window.open(path);
    }
  },
  mounted() {
    this.headTitleObj = require("@/lang/common.js");
  }
};
</script>

<style lang="less" scpoed>
.home-header {
  background-image: url("./../../../public/img/home_header.png");
  width: 100%;
  height: 478px;
  position: relative;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  overflow: hidden;
  @media screen and (max-width: 1000px) {
    background-size: auto 100%;
  }
  .center-title {
    margin: 85px 0 0 10%;
    text-align: left;
    @media screen and (max-width: 1000px) {
      margin: 10px 10%;
    }
    .tile {
      font-size: 40px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 56px;
    }
    .home-content {
      margin: 14px 0;
      font-size: 16px;
      width: 1150px;
      @media screen and (min-width: 1920px) {
        width: 70%;
      }
      @media screen and (max-width: 1000px) {
        width: 100%;
        margin: 0;
      }
      font-family: FZLTXIHJW--GB1-0, FZLTXIHJW--GB1;
      font-weight: 400;
      color: #ffffff;
      line-height: 28px;
    }
  }
}
.small-title {
  font-size: 20px;
  width: 40%;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 28px;
  margin: 31px 0 0 10%;
  cursor: pointer;
}
</style>
