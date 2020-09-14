<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
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
  mounted() {
    
  }
}
</script>

<style>
#app {
  height: 100%;
}
.container {
  height: 100%;
  padding-bottom: 152px;
}
</style>
