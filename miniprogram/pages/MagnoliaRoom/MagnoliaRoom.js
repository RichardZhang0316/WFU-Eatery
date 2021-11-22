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
