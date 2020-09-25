<template>
  <div id="disclaimer">
    <Header class="main-header"></Header>
    <div class="content">
      <h1 class="title">Compass CI免责声明</h1>
      <p class="title-tip">您了解并同意，当您开始使用我们提供的Compass CI软件测试服务（以下简称“本服务”）时，即表示您同意以下条款。</p>
      <p class="tips">1、我们不会就您使用本服务进行收费。与此同时，请您注意，本服务按现状提供，不带有任何明示或暗示的担保或条件，包括但不限于本服务的可用性、非侵权的默示担保或保证。</p>
      <p class="tips">2、基于本服务的测试结果可能受到一些因素的干扰（包括但不限于被测试软件本身含有病毒，或测试过程中受到第三方软件攻击等）。因此，测试结果仅供参考，我们不保证测试结果的准确性、可靠性或完整性。</p>
      <p class="tips">3、本服务只能用于个人学习研究，不允许用于商业目的。如您将测试结果用于商业目的，因此引起的所有责任和法律后果，由您自行承担。</p>
      <p class="tips">4、您不可以对测试结果进行修改。如您修改测试结果，因此产生的所有责任和法律后果，由您自行承担。</p>
      <p class="tips">5、在不违反以上条款的前提下，您可以将测试结果向第三方公开，但是您应当在公开时注明“该报告由Compass CI生成”。</p>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
export default {
  name: "Disclaimer",
  components: {
    Header,
  },
};
</script>
<style lang="scss" scope>
.tips, .title-tip{
    text-indent: 2em;
    line-height: 30px;
}
</style>