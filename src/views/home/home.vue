<template>
  <div class="home">
    <home-header></home-header>
    <div class="link-card-box">
      <link-card :insideName="Jobs" class="card1"></link-card>
      <link-card :insideName="compare" class="card2"></link-card>
      <link-card :insideName="repo" class="card3"></link-card>
      <!-- <link-card :insideName="Testboxes" class="card4"></link-card> -->
    </div>
  </div>
</template>

<script>
import linkCard from "@/components/LinkCard";
import homeHeader from "@/components/homeHeader";
export default {
  name: "Home",
  components: {
    linkCard,
    homeHeader,
  },
  data() {
    return {
      Jobs: {
        name: "Jobs",
        describe: "列举开源软件测试的状态最新信息",
      },
      compare: {
        name: "Compare results",
        describe: "查阅开源软件历史测试结果信息",
      },
      repo: {
        name: "Git repo",
        describe: "列举当前所有已经融入crystal-ci的开源软件",
      },
      Testboxes: {
        name: "Testboxes",
        describe: "用于查阅当前系统资源的使用状态（待开放）",
      },
    };
  },
  methods: {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.home {
  position: relative;
  width: 100%;
  .link-card-box {
    width: 1129px;
    height: 100%;
    margin-left: 20%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: -5%;
    @media screen and (max-width: 1000px) {
        width: 100%;
        margin-left: 0;
    }
    .card1 {
      margin-bottom: 30px;
      @media screen and (max-width: 1000px) {
        margin: 30px auto 0 auto;
      }
    }
    .card2 {
      margin-left: 3%;
      margin-bottom: 30px;
     @media screen and (max-width: 1000px) {
        margin: 30px auto 0 auto;
      }
    }
    .card3 {
      margin-left: 10%;
      margin-bottom: 30px;
      @media screen and (max-width: 1000px) {
        margin: 30px auto 0 auto;
      }
    }
    .card4 {
      margin-left: 2%;
      margin-bottom: 30px;
      @media screen and (max-width: 1000px) {
        margin: 30px auto 0 auto;
      }
    }
  }
}
</style>
