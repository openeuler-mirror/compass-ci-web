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
        <el-button @click="fetchAndUncompressData">确定</el-button>
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
// import { dataFliter } from '../../utils/dataFliter';
// import meminfo from '../../../meminfo.json';
// import JSZip from "jszip"
import exeJSZip from '../../utils/exeJSZip'
// import axios from 'axios';
// import { getJobs } from "../../api/jobs1";
// import { getTemplateZipData } from '../../utils/getTemplateZipData'
// const this.meminfoData = dataFliter(meminfo);

export default {
  data () {
    return {
      meminfoData: {},
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
    async fetchAndUncompressData () {
      await this.unzipOnline()
    },

    // 执行在线解压操作
    async unzipOnline () {
      const data = await exeJSZip.getBinaryContent(
        'http://localhost:8080/api/download',
        this.handleProgress
      );
      console.log('dejodoj', JSON.stringify(data))
      await exeJSZip.iterateZipFile(data, (relativePath, zipEntry) => {
        console.log('----', `${zipEntry.dir}---${zipEntry.name}`)
      });
    },

    // 处理下载进度
    handleProgress (progressData) {
      const { loaded, total } = progressData;
      if (loaded === total) {
        console.log("文件已下载，努力解压中");
      }
    },

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
          data: this.meminfoData['meminfo.time']
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
            type: 'line',
            stack: 'Total',
            data: this.meminfoData['meminfo.MemFree']
          },
          {
            name: 'meminfo.Memused',
            type: 'line',
            stack: 'Total',
            data: this.meminfoData['meminfo.Memused']
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
          data: this.meminfoData['meminfo.time']
        }],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'meminfo.MemFree',
            type: 'line',
            stack: 'Total',
            data: this.meminfoData['meminfo.MemFree']
          },
          {
            name: 'Buffers',
            type: 'line',
            stack: 'Total',
            data: this.meminfoData['meminfo.Buffers']
          },
          {
            name: 'Cached',
            type: 'line',
            stack: 'Total',
            emphasis: {
              focus: 'series'
            },
            data: this.meminfoData['meminfo.Cached']
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
          data: this.meminfoData['meminfo.time']
        }],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'meminfo.Active',
            type: 'line',
            stack: 'Total',
            data: this.meminfoData['meminfo.Active']
          },
          {
            name: 'meminfo.Inactive',
            type: 'line',
            stack: 'Total',
            data: this.meminfoData['meminfo.Inactive']
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
          data: this.meminfoData['meminfo.time']
        }],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'meminfo.Active(anon)',
            type: 'line',
            stack: 'Total',
            data: this.meminfoData['meminfo.Active(anon)']
          },
          {
            name: 'meminfo.Inactive(anon)',
            type: 'line',
            stack: 'Total',
            data: this.meminfoData['meminfo.Inactive(anon)']
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
          data: this.meminfoData['meminfo.time']
        }],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'meminfo.Active(file)',
            type: 'line',
            stack: 'Total',
            data: this.meminfoData['meminfo.Active(file)']
          },
          {
            name: 'meminfo.Inactive(file)',
            type: 'line',
            stack: 'Total',
            data: this.meminfoData['meminfo.Inactive(file)']
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
          data: this.meminfoData['meminfo.time']
        }],
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'meminfo.Slab',
            type: 'line',
            stack: 'Total',
            data: this.meminfoData['meminfo.Slab']
          },
          {
            name: 'meminfo.SReclaimable',
            type: 'line',
            stack: 'Total',
            data: this.meminfoData['meminfo.SReclaimable']
          },
          {
            name: 'meminfo.SUnreclaim',
            type: 'line',
            stack: 'Total',
            data: this.meminfoData['meminfo.SUnreclaim']
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

../../api/jobs1