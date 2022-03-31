<template>
  <header id="header">
    <div @click="goHome" class="header-title">
        <div class="ci-logo">CI</div>
      <span class="small-title">{{headTitleObj.HEAD?headTitleObj.HEAD.SMALLTITLE:''}}</span>
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
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
  mounted() {
    this.headTitleObj = require("@/lang/common.js");
  },
};
</script>

<style lang="less" scpoed>
.header-title {
  background-image: url("./../../../public/img/header.png");
  width: 100%;
  height: 90px;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
  display: flex;
  .small-title {
    font-size: 20px;
    width: 40%;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 28px;
    margin: 31px 0 0 40px;
    cursor: pointer;
  }
}
</style>
