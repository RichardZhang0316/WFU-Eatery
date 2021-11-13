//Chart
import * as echarts from '../../ec-canvas/echarts';

let chart = null;  // Create object "Chart"

function initChart(canvas, width, height, dpr) {  // initial Chart的function
  chart = echarts.init(canvas, null, {  // object, initial method
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = { //点击时的option小界面
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
      },
      confine: true
    },
    legend: {
      data: ['Pit','North Pit']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    yAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: 'Pit',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [70, 80, 60, 30, 25, 40, 60, 70, 80, 60, 30, 25, 40, 60],
        itemStyle: {
          // emphasis: {
          // color: '#37a2da'
          // }
        }
      },
      {
        name: 'North Pit',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [50, 30, 90, 20, 25, 30, 40, 50, 30, 90, 20, 25, 30, 40],
        itemStyle: {
          // emphasis: {
          // color: '#37a2da'
          // }
        }
      },
    ]
  };

  chart.setOption(option);
  return chart;
}




// pages/Pit/Pit.js
Page({
    //Chart
    onShareAppMessage: function (res) {
        return {
          title: 'ECharts 可以在微信小程序中使用啦！',
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
        setTimeout(function () {
          // 获取 chart 实例的方式
          // console.log(chart)
        }, 2000);
      }
})


