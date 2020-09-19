<template>
    <div class="reeor">
       <Header class="main-header"></Header> 
       <div class="content">
           <p class="tips">
               未完待续，敬请期待......
           </p>
       </div>
    </div>
</template>
<script>
import Header from "@/components/Header";
export default {
  name: 'Error',
  components: {
    Header,
  },
}
</script>
<style lang="scss" scope>
   .tips {
       font-size: 30px;
       font-weight: bold;
       margin-top: 5%;
   } 
</style>