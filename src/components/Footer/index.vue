<template>
  <footer id="footer">
    <div class="footer-content">
      <div class="content-left">
        <p class="left-title" @click="JoinUs">{{footTitleObj.FOOOTER?footTitleObj.FOOOTER.LEFTTITLE:''}}</p>
        <p class="left-content">{{footTitleObj.FOOOTER?footTitleObj.FOOOTER.LEFTCONTENT:''}}</p>
      </div>
      <div class="content-right">
        <p class="right-word">
          <span @click="goPrivacyPolicy">{{footTitleObj.FOOOTER?footTitleObj.FOOOTER.WORDLEFT:''}}</span>
          <span @click="goLegalNotices">{{footTitleObj.FOOOTER?footTitleObj.FOOOTER.WORDRIGHT:''}}</span>
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
      window.open("https://openeuler.org/zh/legal.html", "_blank");
    },
    goPrivacyPolicy() {
        window.open("https://openeuler.org/zh/privacyPolicy.html", "_blank");
    },
    JoinUs() {
        window.open("https://gitee.com/forest_deer/crystal-ci", "_blank")
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
  background-image: url("./../../../public/img/footer.png");
  background-size: cover;
  display: block;
  .footer-content {
    display: flex;
    width: 1120px;
    position: absolute;
    height: 80px;
    left: 50%;
    top: 50%;
    margin: -40px 0 0 -560px;
    .content-left {
      .left-title {
        font-size: 40px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 56px;
        width: 272px;
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
      margin-left: 400px;
      margin-top: 24px;
      text-align: center;
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
          &:last-of-type {
            border-left: 1px solid #ffffff;
          }
        }
      }
      .footer-line {
        width: 342px;
        color: #ffffff;
        // background: #FFFFFF;
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
        margin: 20px 0 0 0;
        .right-word {
          font-size: 13px;
          span {
            &:last-of-type {
              display: block;
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
