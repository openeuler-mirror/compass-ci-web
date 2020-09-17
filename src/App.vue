<template>
  <div id="app">
    <Header class="main-header"></Header>
    <router-view class="container" />
    <Footer class="main-footer"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  components: {
    Header,
    Footer,
  },
  mounted() {},
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
      padding-bottom:100px;
  }
}
</style>
