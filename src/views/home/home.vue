<template>
  <div class="home">
    <home-header></home-header>
    <div class="link-card-box">
      <link-card :insideName="Jobs" class="card1"></link-card>
      <link-card :insideName="repo" class="card2"></link-card>
      <link-card :insideName="compare" class="card3"></link-card>
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
        describe: "测试任务最新信息",
      },
      repo: {
        name: "Git repo",
        describe: "已加入的开源软件清单",
      },
      compare: {
        name: "Compare results",
        describe: "查询及比较历史测试结果",
      },
      Testboxes: {
        name: "Testboxes",
        describe: "用于查阅当前系统资源的使用状态",
      },
    };
  },
  methods: {},
  mounted() {
    
  },
};
</script>
<style lang="scss" scoped>
.home {
  position: relative;
  width: 100%;
  .link-card-box {
    height: 100%;
    margin: 0 10%;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    @media screen and (max-width: 1000px) {
      width: 100%;
      margin-left: 0;
      font-size: 16px;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .card1 {
      @media screen and (max-width: 1000px) {
        margin: 30px auto 0 auto;
      }
    }
    .card2 {
      @media screen and (max-width: 1000px) {
        margin: 30px auto 0 auto;
      }
    }
    .card3 {
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
