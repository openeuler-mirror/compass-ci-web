
<template>
    <div id="CustomErrorBar">
        <Header class="main-header"></Header>
        <el-input type="textarea" :rows="6" id="myinput" v-model="inputvalue" placeholder="请输入内容..."></el-input>
        <el-button @click="getEcharts">确定</el-button>
        <div id="container" class="containers"></div>
    </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header";
import echarts from 'echarts';
export default {
  name: "CustomErrorBar",
  components: { Header},
  data() {
    return {
     inputvalue:''
    };
  },
  methods: {
            renderDeviationAreaArray(dataArray,deviationArray){//用于生成方差区域的数组
                var deviationAreaArray=[]
                var len=dataArray.length;
                for(var i=0;i<len;i++){
                    deviationAreaArray.push([i,dataArray[i]+dataArray[i]*deviationArray[i]/100,dataArray[i]-dataArray[i]*deviationArray[i]/100])//[x坐标序号,最大值，最小值]
                } 
                return deviationAreaArray
            },
            renderItem(_params, api) {//生成描绘方差图所需的参数
                var xValue = api.value(0);
                var highPoint = api.coord([xValue, api.value(1)]);
                var lowPoint = api.coord([xValue, api.value(2)]);
                var halfWidth = api.size([1, 0])[0] * 0.1;
                var style = api.style({
                    stroke: api.visual('color'),
                    fill: null
                });

                return {
                    type: 'group',
                    children: [{
                        type: 'line',
                        transition: ['shape'],
                        shape: {
                            x1: highPoint[0] - halfWidth, y1: highPoint[1],
                            x2: highPoint[0] + halfWidth, y2: highPoint[1]
                        },
                        style: style
                    }, {
                        type: 'line',
                        transition: ['shape'],
                        shape: {
                            x1: highPoint[0], y1: highPoint[1],
                            x2: lowPoint[0], y2: lowPoint[1]
                        },
                        style: style
                    }, {
                        type: 'line',
                        transition: ['shape'],
                        shape: {
                            x1: lowPoint[0] - halfWidth, y1: lowPoint[1],
                            x2: lowPoint[0] + halfWidth, y2: lowPoint[1]
                        },
                        style: style
                    }]
                };
            },
            renderSeries(sourceData){//描绘折线图+方差图所需的参数
                var series=[];
                for(var j=0;j<sourceData.datas.length;j++){      
                        var objLine={ 
                            type:'line',
                            data:sourceData.datas[j].data,
                            itemStyle:{
                                color:'#77bef7'
                            }
                        };
                        var objCustom={
                            type:'custom',
                            itemStyle:{
                                normal:{
                                    borderWidth:1.5
                                }
                            },
                        renderItem:this.renderItem,
                        data:this.renderDeviationAreaArray(sourceData.datas[j].data,sourceData.datas[j].deviation),//返回方差数组
                        z:100
                        };

                        series.push(objLine);
                        series.push(objCustom);    
                    }
                
                return series;
            },
            getEcharts(){
                var container=document.getElementById("container");
                if(this.inputvalue){
                    var jsons= eval('(' + this.inputvalue + ')')
                    var parms=JSON.stringify(jsons)
                    axios.post('http://124.160.11.57:10002/performance_result',parms)
                    .then(res=>{
                        var sourceData=res.data
                    for(var i=0; i<sourceData.length; i++) {
                        var el = document.createElement('div');
                        el.id = "chart" + i;
                        el.className = "chart";
                        el.style="width:700px;height:720px;"
                        container.appendChild(el);
                        var myChart = echarts.init(document.getElementById("chart" + i));
                    
                        var option = {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'shadow'
                                }, 
                                   
                                   formatter(params){
                                       var res='<p>runtime:'+params[0].name+'</p>' 
                                       var average1='<p>'+'average:'+params[0].data+'</p>'
                                       var deviation1='<p>'+'deviation:'+params[1].data[1]+'</p>'+'</br>'
                                       var average2='<p>'+'average:'+params[2].data+'</p>'
                                       var deviation2='<p>'+'deviation:'+params[3].data[1]+'</p>'
                                       return res+average1+deviation1+average2+deviation2
                                   }                
                            },
                            title: {
                                text: sourceData[i].title
                            },
                        
                            xAxis: {
                                data: sourceData[i].datas[0].x_params

                            },
                            yAxis: {}, 

                            grid: {
                                left: '15%',
                            },
                        };
                        var series=this.renderSeries(sourceData[i]);
                        option.series=series;
                        option&&myChart.setOption(option);//绘图  
                    }
                 })
                }
              
            }
  },
  mounted() {
  },
};
</script>

<style lang='scss' scoped>
    .containers {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 20px;
    }
    .chart {
        width: 700px;
        height: 720px;
        margin-bottom: 10px;
    }
    .el-textarea {
        margin-top: 20px;
        margin-left: 40px;
        width: 50%;
    } 
    .el-button {
        width: 100px;
        height: 35px;
        display: block;
        margin-left: 40px;
        margin-top: 10px;
    } 
</style>