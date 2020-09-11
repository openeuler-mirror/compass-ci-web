<!-- 底部 -->
<template>
    <footer id="footer">
        <div class="footer-content">
             <div class="content-left">
                <p class="left-title">{{footTitleObj.FOOOTER?footTitleObj.FOOOTER.LEFTTITLE:''}}</p>
                <p class="left-content">{{footTitleObj.FOOOTER?footTitleObj.FOOOTER.LEFTCONTENT:''}}</p>
            </div>
            <div class="content-right">
                <p class="right-word">
                    <span>{{footTitleObj.FOOOTER?footTitleObj.FOOOTER.WORDLEFT:''}}</span>
                    <span>{{footTitleObj.FOOOTER?footTitleObj.FOOOTER.WORDRIGHT:''}}</span>
                </p>
                <div class="footer-line"></div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
  data () {
    return {
      footTitleObj: {}
    }
  },
  mounted () {
    this.footTitleObj = require('@/lang/common.js')
    // console.log(this.footTitleObj)
  }
}

</script>

<style lang='scss' scoped>
#footer{
    position: relative;
    bottom: 0;
    width: 100%;
    height: 152px;
    background-image: url('./../../../public/img/footer.png');
    background-size: cover;
    display: block;
    position: relative;
    padding: 0 10%;
    .footer-content{
        display: flex;
        width: 1120px;
        position: absolute;
        height: 80px;
        left: 50%;
        top: 50%;
        margin: -40px 0 0 -600px;
        .content-left{
            .left-title{
                font-size: 40px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                line-height: 56px;
            }
            .left-content{
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                line-height: 24px;
            }
        }
        .content-right{
            margin-left: 400px;
            .right-word{
                font-size: 11px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                line-height: 24px;
                span{
                    &:last-of-type{
                        font-size: 12px;
                    }
                }
            }
            .footer-line{
                width: 342px;
                height: 1px;
                background: #FFFFFF;
                opacity: 0.5;
            }
        }
    }
}
</style>
