<template>
  <div id="app">
    <router-view class="container" />
    <Footer class="main-footer"></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
export default {
  components: {
    Footer,
  },
  methods: {
    notice() {
      this.$notify({
        title: "通知",
        message: "由于国庆机房维护，需要到10月5日才可以正常访问数据，给您带来不便之处敬请谅解。",
        duration: 0,
        showClose: false,
      });
    },
  },
  mounted() {
    this.notice();
  },
  updated() {
    window.scroll(0, 0);
  },
};
</script>

<style lang="scss" scoped>
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
</style>
