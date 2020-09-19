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
  mounted() {},
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
