<template>
  <div class="link-card">
    <div class="back-card" @click="goPath">
      <p class="describe">{{insideName.describe}}</p>
      <div class="link-car">
        <p>{{insideName.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    insideName: {
      type: Object,
    },
  },
  methods: {
    goPath() {
      if (this.insideName.name == "Jobs") {
        this.$router.push("/jobs");
      } else if (this.insideName.name == "Testboxes") {
        window.location.href =
          "https://gitee.com/wu_fengguang/lab-z9/tree/master/hosts/";
      } else if (this.insideName.name == "Git repo") {
        this.$router.push("/repos");
      } else if (this.insideName.name == "Compare results") {
        this.$router.push("/compare");
        // return false
      }
    },
  },
  mounted() {},
};
</script>

<style lang='scss' scoped>
.link-card {
  position: relative;
  margin: 30px;
  @media screen and (max-width: 1000px) {
    margin-right: 0;
    display: flex;
    direction: row;
    flex-wrap: nowrap;
  }
  .back-card {
    // width: 304px;
    width: 359px;
    @media screen and (max-width: 1000px) {
      width: 280px;
    }
    height: 200px;
    background: #ffffff;
    box-shadow: 0px 10px 30px 0px rgba(2, 108, 255, 0.15);
    border-radius: 20px;
    padding: 20px 30px;
    text-align: left;
    cursor: pointer;
  }
  .link-car {
    width: 252px;
    @media screen and (max-width: 1000px) {
      width: 240px;
    }
    height: 76px;
    background: #1057ca;
    box-shadow: 0px 10px 30px 0px rgba(2, 108, 255, 0.15),
      0px -10px 20px 0px rgba(2, 108, 255, 0.15);
    border-radius: 10px 20px 10px 20px;
    position: absolute;
    bottom: -10px;
    left: -10px;
    font-size: 25px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 36px;
    text-shadow: 0px 10px 30px rgba(2, 108, 255, 0.15);
    padding: 20px 0 20px 20px;
  }
}
.disableCom {
    color: #9b9b9b;
    width: 252px;
    @media screen and (max-width: 1000px) {
      width: 240px;
    }
    height: 76px;
    background: #1057ca;
    box-shadow: 0px 10px 30px 0px rgba(2, 108, 255, 0.15),
      0px -10px 20px 0px rgba(2, 108, 255, 0.15);
    border-radius: 10px 20px 10px 20px;
    position: absolute;
    bottom: -10px;
    left: -10px;
    font-size: 25px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 36px;
    text-shadow: 0px 10px 30px rgba(2, 108, 255, 0.15);
    padding: 20px 0 20px 20px;
  }
</style>
