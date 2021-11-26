import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

/* 尝试写Javascript爬虫 （失败）
function getPercentage() {
  var url = require("url")
  //var querystring = require("querystring")
  var $ = require("jquery")
  var axios = require("axios")
  var cheerio = require("cheerio")
  axios.get("https://services.is.wfu.edu/dining-occupancy/").then(resp => {
  //var repos = []
  //for (var i=0; i<3; i++) {
    var $ = cheerio.load(h2)
    
    Percent : find("h2").text.trim(),
    
    //repos.push(repo)
    //}
    console.log(Percent)  
  //})
})
*/

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  //获取实时人流数据，链接Javascript爬虫(未成功)
  var PecentageM = 40;   //最终data

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
        lineStyle: {
          width: 30,
          color: [
            [0.3, '#d6b160'],
            [0.7, '#957b43'],
            [1, '#554626']
          ]
        }
      },
      pointer: {
        itemStyle: {
          color: 'auto'
        }
      },
      axisTick: {
        distance: -30,
        length: 8,
        lineStyle: {
          color: '#fff',
          width: 2
        }
      },
      splitLine: {
        distance: -30,
        length: 30,
        lineStyle: {
          color: '#fff',
          width: 4
        }
      },
      axisLabel: {
        color: 'auto',
        distance: 35,
        fontSize: 15,
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
