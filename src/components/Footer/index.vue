<template>
  <footer id="footer">
    <div class="footer-content">
      <div class="content-left">
        <p
          class="left-title"
          @click="JoinUs"
        >{{footTitleObj.FOOOTER?footTitleObj.FOOOTER.LEFTTITLE:''}}</p>
        <p class="left-content">{{footTitleObj.FOOOTER?footTitleObj.FOOOTER.LEFTCONTENT:''}}</p>
      </div>
      <div class="content-right">
        <p class="right-word">
          <span @click="goPrivacyPolicy">{{footTitleObj.FOOOTER?footTitleObj.FOOOTER.WORDLEFT:''}}</span>
          <span @click="goLegalNotices">{{footTitleObj.FOOOTER?footTitleObj.FOOOTER.WORDRIGHT:''}}</span>
          <span @click="goDisclamer">{{footTitleObj.FOOOTER?footTitleObj.FOOOTER.DISCLAIMER:''}}</span>
        </p>
        <div class="footer-line">{{footTitleObj.FOOOTER?footTitleObj.FOOOTER.COPYRIGHT:''}}</div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      footTitleObj: {},
    };
  },
  methods: {
    goLegalNotices() {
      window.open("https://openeuler.org/zh/other/legal/", "_blank");
    },
    goPrivacyPolicy() {
      window.open("https://openeuler.org/zh/other/privacy/", "_blank");
    },
    JoinUs() {
      window.open("https://gitee.com/openeuler/compass-ci", "_blank");
    },
    goDisclamer() {
       this.$router.push("/disclaimer");
    }
  },
  mounted() {
    this.footTitleObj = require("@/lang/common.js");
  },
};
</script>

<style lang='scss' scoped>
#footer {
  position: relative;
  width: 100%;
  height: 152px;
  padding: 0 10%;
  background-image: url("./../../../public/img/footer.png");
  background-size: cover;
  display: block;
  .footer-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    .content-left {
      align-self: center;
      .left-title {
        font-size: 40px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 56px;
        cursor: pointer;
      }
      .left-content {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 24px;
      }
    }
    .content-right {
      width: 342px;
      margin-top: 24px;
      text-align: center;
      align-self: center;
      .right-word {
        width: 342px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 24px;
        cursor: pointer;
        span {
          display: inline-block;
          padding: 0 15px;
          &:nth-of-type(2){
            border-left: 1px solid #ffffff;
          }
          &:last-of-type{
            border-left: 1px solid #ffffff;
          }
        }
      }
      .footer-line {
        width: 342px;
        color: #ffffff;
        opacity: 0.5;
        margin-top: 8px;
        font-size: 12px;
      }
    }
  }
  @media screen and (max-width: 1000px) {
    height: 280px;
    .footer-content {
      width: 100%;
      flex-direction: column;
      margin: 0;
      left: 0;
      top: 20px;
      text-align: center;
      .content-left {
        .left-title {
          font-size: 25px;
        }
        .left-content {
          font-size: 13px;
        }
      }
      .content-right {
        width: 100%;
        margin: 20px 0 0 0;
        .right-word {
          font-size: 13px;
          text-align: center;
          width: 100%;
          span {
            &:last-of-type {
              margin-left: 0;
            }
          }
        }
        .footer-line {
          width: 100%;
          height: 2px;
          margin: 15px auto 0 auto;
        }
      }
    }
  }
}
</style>
