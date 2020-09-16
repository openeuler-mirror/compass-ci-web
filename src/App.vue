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
  min-height: 100%;
  position: relative;
}
.container {
  min-height: calc(100% - 100px); 
  padding-bottom: 152px;
  @media screen and (max-width: 1000px) {
      padding-bottom:100px;
  }
}
</style>
