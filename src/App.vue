<template>
  <div id="app">
    <router-view class="container" />
    <Footer class="main-footer"></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
export default {
  data() {
    return {
      
    }
  },
  components: {
    Footer,
  },
  methods: {
    notice() {
      this.$notify({
        title: "通知",
        message: "机房于2020年11月28日20:00至2020年11月29日20:00维护，将不能正常访问数据，给您带来的不便，敬请谅解！",
        duration: 0,
        showClose: false,
      });
    },
  },
  mounted() {
    
  },
  updated() {
    window.scroll(0, 0);
  },
};
</script>

<style lang="less" scoped>
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
