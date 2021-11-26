import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  

  wx.cloud.callFunction({
    name: 'realTime',
    // 传递给云函数的event参数
  }).then(res => {
    // resolve(res.result)
    console.log(res);
    var PecentageM = 90;   //最终data

    //实时人流图表的基础参数设置
    var option = {
      backgroundColor: "#ffffff",
      series: [{
        name: 'Real_Time',
        type: 'gauge',
        detail: {
          formatter: '{value}%',
          color: '#9E7E38',
        },
        axisLine: {
          show: true,
        },
        data: [{
          value: PecentageM,
          name: 'Occupancy',
          }
        ],
        itemStyle: {
          color: '#9E7E38',
        }
      }]
    };
  
    chart.setOption(option, true);
  
    return chart;
  })
}
 

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {
  }
});
