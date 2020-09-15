<!-- 头部 -->
<template>
  <header id="header">
    <div @click="goHome">
      <p class="small-title">{{headTitleObj.HEAD?headTitleObj.HEAD.SMALLTITLE:''}}</p>
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

<style lang='scss' scpoed>
#header {
  background-image: url("./../../../public/img/header.png");
  width: 100%;
  height: 90px;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
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
}
</style>
