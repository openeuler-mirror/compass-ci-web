<template>
  <header class="home-header">
    <p class="small-title">{{headTitleObj.HEAD?headTitleObj.HEAD.SMALLTITLE:''}}</p>
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
      headTitleObj: {},
    };
  },
  mounted() {
    this.headTitleObj = require("@/lang/common.js");
  },
};
</script>

<style lang='scss' scpoed>
.home-header {
  background-image: url("./../../../public/img/home_header.png");
  width: 100%;
  height: 478px;
  position: relative;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  overflow: hidden;
  .center-title {
    margin: 150px 0 0 25%;
    text-align: left;
    @media screen and (max-width: 1000px) {
      margin: 82px 10%;
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
      font-family: FZLTXIHJW--GB1-0, FZLTXIHJW--GB1;
      font-weight: 400;
      color: #ffffff;
      line-height: 28px;
    }
  }
}
.small-title {
  font-size: 20px;
  width: 30%;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 28px;
  margin: 31px 0 0 10%;
  cursor: pointer;
}
</style>
