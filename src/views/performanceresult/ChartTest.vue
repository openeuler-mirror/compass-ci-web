<template>
  <div>
    <Header class="main-header"></Header>

    <el-form :model="QueryData">
      <el-form-item label="suite"
                    label-width="80px"
                    class="input_class">
        <el-input v-model="filter"
                  placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="testbox"
                    label-width="80px"
                    class="input_class">
        <el-input v-model="series"
                  placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="runtime"
                    label-width="80px"
                    class="input_class">
        <el-input v-model="metrics"
                  placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="size"
                    label-width="80px"
                    class="input_class">
        <el-input v-model="x_params"
                  placeholder=""></el-input>
      </el-form-item>

      <el-form-item label="job_id"
                    label-width="80px"
                    class="input_class">
        <el-input v-model="x_params"
                  placeholder=""></el-input>
      </el-form-item>

      <el-form-item class="confirm">
        <el-button @click="getTable">确定</el-button>
      </el-form-item>
      <el-form-item class="example">
        <el-button @click="showExample">Example</el-button>
      </el-form-item>
    </el-form>

    <div id="mychart"
         :style="myChartStyle"></div>
    <div id="mychart1"
         :style="myChartStyle"></div>
    <div id="mychart2"
         :style="myChartStyle"></div>
    <div id="mychart3"
         :style="myChartStyle"></div>
    <div id="mychart4"
         :style="myChartStyle"></div>
    <div id="mychart5"
         :style="myChartStyle"></div>
  </div>
</template>

<script>
// import Header from "@/components/Header";
import * as echarts from "echarts";
import { dataFliter } from '../../utils/dataFliter';
import meminfo from '../../../meminfo.json';

const meminfoData = dataFliter(meminfo);

export default {
  data () {
    return {
      myChartStyle: { width: "100%", height: "400px", marginTop: '40px' } //图表样式
    };
  },
  mounted () {
    this.initEcharts();
    this.initEcharts1();
    this.initEcharts2();
    this.initEcharts3();
    this.initEcharts4();
    this.initEcharts5();


  },
  methods: {
    initEcharts () {
      // 基本柱状图
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        },
        dataZoom: [
          {
            type: 'inside'
          },
          {
            type: 'slider'
          }
        ],
        xAxis: [{
          type: 'category',
          data: meminfoData['meminfo.time']
        }],
        yAxis: [
          {
            type: 'value',
            min: 4100000,
            scale: true
          }
        ],
        series: [
          {
            name: 'meminfo.MemFree',
            type: 'bar',
            data: meminfoData['meminfo.MemFree']
          },
          {
            name: 'meminfo.Memused',
            type: 'bar',
            data: meminfoData['meminfo.Memused']
          }
        ]
      };
      const myChart = echarts.init(document.getElementById("mychart"));
      myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },

    initEcharts1 () {
      // 基本柱状图
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        },
        dataZoom: [
          {
            type: 'inside'
          },
          {
            type: 'slider'
          }
        ],
        xAxis: [{
          type: 'category',
          data: meminfoData['meminfo.time']
        }],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'meminfo.MemFree',
            type: 'bar',
            data: meminfoData['meminfo.MemFree']
          },
          {
            name: 'Buffers',
            type: 'bar',
            data: meminfoData['meminfo.Buffers']
          },
          {
            name: 'Cached',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: meminfoData['meminfo.Cached']
          },
        ]
      };
      const myChart = echarts.init(document.getElementById("mychart1"));
      myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },

    initEcharts2 () {
      // 基本柱状图
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        },
        dataZoom: [
          {
            type: 'inside'
          },
          {
            type: 'slider'
          }
        ],
        xAxis: [{
          type: 'category',
          data: meminfoData['meminfo.time']
        }],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'meminfo.Active',
            type: 'bar',
            data: meminfoData['meminfo.Active']
          },
          {
            name: 'meminfo.Inactive',
            type: 'bar',
            data: meminfoData['meminfo.Inactive']
          }
        ]
      };
      const myChart = echarts.init(document.getElementById("mychart2"));
      myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },

    initEcharts3 () {
      // 基本柱状图
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        },
        dataZoom: [
          {
            type: 'inside'
          },
          {
            type: 'slider'
          }
        ],
        xAxis: [{
          type: 'category',
          data: meminfoData['meminfo.time']
        }],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'meminfo.Active(anon)',
            type: 'bar',
            data: meminfoData['meminfo.Active(anon)']
          },
          {
            name: 'meminfo.Inactive(anon)',
            type: 'bar',
            data: meminfoData['meminfo.Inactive(anon)']
          }
        ]
      };
      const myChart = echarts.init(document.getElementById("mychart3"));
      myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },

    initEcharts4 () {
      // 基本柱状图
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        },
        dataZoom: [
          {
            type: 'inside'
          },
          {
            type: 'slider'
          }
        ],
        xAxis: [{
          type: 'category',
          data: meminfoData['meminfo.time']
        }],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'meminfo.Active(file)',
            type: 'bar',
            data: meminfoData['meminfo.Active(file)']
          },
          {
            name: 'meminfo.Inactive(file)',
            type: 'bar',
            data: meminfoData['meminfo.Inactive(file)']
          }
        ]
      };
      const myChart = echarts.init(document.getElementById("mychart4"));
      myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },

    initEcharts5 () {
      // 基本柱状图
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        },
        dataZoom: [
          {
            type: 'inside'
          },
          {
            type: 'slider'
          }
        ],
        xAxis: [{
          type: 'category',
          data: meminfoData['meminfo.time']
        }],
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'meminfo.Slab',
            type: 'line',
            stack: 'Total',
            data: meminfoData['meminfo.Slab']
          },
          {
            name: 'meminfo.SReclaimable',
            type: 'line',
            stack: 'Total',
            data: meminfoData['meminfo.SReclaimable']
          },
          {
            name: 'meminfo.SUnreclaim',
            type: 'line',
            stack: 'Total',
            data: meminfoData['meminfo.SUnreclaim']
          },
        ]
      };
      const myChart = echarts.init(document.getElementById("mychart5"));
      myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
  }
};
</script>

<style lang='less' scoped>
.input_class {
  width: 35%;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
}
.confirm {
  position: absolute;
  top: 200px;
  left: 800px;
  @media screen and (max-width: 1000px) {
    display: none;
  }
}
.example {
  position: absolute;
  top: 200px;
  left: 1000px;
  @media screen and (max-width: 1000px) {
    display: none;
  }
}

.containers {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}
.chart {
  width: 1000px;
  height: 720px;
  margin-bottom: 10px;
}
</style>

