//Chart
import * as echarts from '../../ec-canvas/echarts';

let chart = null; // Create object "Chart"

function initChart(canvas, width, height, dpr) { // initial Chart的function
  chart = echarts.init(canvas, null, { // object, initial method
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = { //点击时的option小界面
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'line' // 默认为直线，可选为：'line' | 'shadow'
      },
      confine: true
    },
    legend: {
      data: ['Pit', 'North Pit']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    yAxis: [{
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      axisLabel: {
        color: '#666'
      }
    }],
    xAxis: [{
      type: 'category',
      axisTick: {
        show: false
      },
      data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'],
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      axisLabel: {
        color: '#666'
      }
    }],
    series: [{
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
  onShow: function () {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年  
    var Y = date.getFullYear();
    //获取月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var sj = Y + '-' + M + '-' + D;

    this.getMenu(sj);
    this.setData({
      dataCurrent:0
    });
  },
  getMenu: function (sj) {
    var that = this;
    // wx.showLoading({
    //   title: '',
    // })
    const db = wx.cloud.database({});
    const cont = db.collection('diningHallMenu');
    cont.where({
      _id: sj,
    }).get({
      success: res => {
        console.log(res.data);
        var ary = res.data[0];
        delete ary._id;
        for (var i in ary) {
          var obj = [];
          //console.log(i);
          var a = 0;
          for (var j in ary[i]) {
            obj.push({
              id: a,
              name: j,
              open: false,
              pages: ary[i][j]
            });
            a++;
          }
          if (i == 'DINNER (4:30pm-8pm)') {
            that.setData({
              dinnerL: obj
            });
            console.log(obj);
          } else if (i == 'LATE BRUNCH (11am-2pm)') {
            that.setData({
              labrunchL: obj
            });
          } else if (i == 'BRUNCH (9am-11am)') {
            that.setData({
              brunchL: obj
            });
          } else if (i == 'PIT STOP (2pm-4:30pm)') {
            that.setData({
              pitSL: obj
            });
          }
        }

        // wx.hideLoading()
      }
    })

  },
  currentCheck: function (e) {
    const that = this;
    if (that.data.dataCurrent === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        dataCurrent: e.target.dataset.current
      })
    }
  },
  kindToggle1(e) {
    var id = e.currentTarget.id;
    id = parseInt(id);
    var list = this.data.brunchL; // this.data.list;
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      brunchL: list
    })
  },
  kindToggle2(e) {
    var id = e.currentTarget.id;
    id = parseInt(id);
    var list = this.data.labrunchL; // this.data.list;
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      labrunchL: list
    })
  },
  kindToggle3(e) {
    var id = e.currentTarget.id;
    id = parseInt(id);
    var list = this.data.pitSL; // this.data.list;
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      pitSL: list
    })
  },
  kindToggle(e) {
    var id = e.currentTarget.id;
    id = parseInt(id);
    var list = this.data.dinnerL; // this.data.list;
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      dinnerL: list
    })
  },


  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () {},
      fail: function () {}
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