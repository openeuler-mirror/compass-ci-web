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
  }
}

</script>

<style lang='scss' scoped>
#footer{
    position: relative;
    width: 100%;
    height: 152px;
    background-image: url('./../../../public/img/footer.png');
    background-size: cover;
    display: block;
    .footer-content{
        display: flex;
        width: 1120px;
        position: absolute;
        height: 80px;
        left: 50%;
        top: 50%;
        margin: -40px 0 0 -560px;
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
            margin-top: 24px;
            .right-word{
                font-size: 11px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                line-height: 24px;
                span{
                    display: inline-block;
                    &:last-of-type{
                        font-size: 12px;
                        margin-left: 135px;
                    }
                }
            }
            .footer-line{
                width: 342px;
                height: 1px;
                background: #FFFFFF;
                opacity: 0.5;
                margin-top: 8px;
            }
        }
    }
    @media (max-width: 1000px) {
        height: 280px;
        .footer-content{
            width: 100%;
            flex-direction: column;
            margin: 0;
            left: 0;
            top: 20px;
            text-align: center;
             .content-left{
                 .left-title{
                     font-size: 25px;
                 }
                 .left-content{
                     font-size: 13px;
                 }
             }
             .content-right{
                margin: 20px 0 0 0;
                .right-word{
                    font-size: 13px;
                    span{
                        &:last-of-type{
                            display: block;
                            margin-left: 0;
                        }
                    }
                }
                .footer-line{
                    width: 100%;
                    height: 2px;
                    margin: 15px auto 0 auto;
                }
             }
        }
    }
}
</style>
