<template>
  <div id="app">
    <Header></Header>
    <router-view class="container" />
    <Footer></Footer>
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
  height: 100%;
  padding-bottom: 152px;
  @media screen and (max-width: 1000px) {
      padding-bottom:100px;
  }
}
</style>
