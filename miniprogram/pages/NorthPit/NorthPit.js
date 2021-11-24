// import cfg from '../../utils/config.js';
// import util from '../../utils/util.js';

//Popular Time 表格
import * as echarts from '../../ec-canvas/echarts';
let chart = null;  
var util = require('../../utils/util.js');

// initial Chart的function
function initChart(canvas, width, height, dpr) {  
  chart = echarts.init(canvas, null, {            // object, initial method
    width: width,
    height: height,
    devicePixelRatio: dpr   
  });
  canvas.setChart(chart);

  //获取当日是星期几
  var myDate = new Date();
  var D = myDate.getDay()
  console.log(D) //测试用，例如: 2 = Tue
  
  var Mon = {              
    tooltip: {trigger:'axis',axisPointer: {type: 'shadow'},confine: true,formatter: '{b0}: {c0}%', padding:[5,10,5,10,]}, //提示框前端
    grid: {left: 20,right: 20,bottom: 15,top: 40,containLabel: true}, // 整体表格所在的grid的大小设置
    yAxis: [{type: 'value',axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格y轴设置
    xAxis: [{type: 'category',axisTick: { show: false },data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格x轴设置
    series: [{name: 'Pit', type: 'bar', label: {normal: {show: true,position: 'inside'}},itemStyle: {borderRadius: [4, 4, 0, 0], color: '#9E7E38', shadowColor: 'rgba(0, 0, 0, 0.5)', shadowBlur: 2}, //Series设置
        // 👇 Monday 数据！！！
        data: [2.9, 6.6, 12, 29, 44, 37, 23, 20, 21, 28, 48, 40, 28, 21, 18], },]}
  
  var Tue = {              
    tooltip: {trigger:'axis',axisPointer: {type: 'shadow'},confine: true,formatter: '{b0}: {c0}%', padding:[5,10,5,10,]}, //提示框前端
    grid: {left: 20,right: 20,bottom: 15,top: 40,containLabel: true}, // 整体表格所在的grid的大小设置
    yAxis: [{type: 'value',axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格y轴设置
    xAxis: [{type: 'category',axisTick: { show: false },data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格x轴设置
    series: [{name: 'Pit', type: 'bar', label: {normal: {show: true,position: 'inside'}},itemStyle: {borderRadius: [4, 4, 0, 0], color: '#9E7E38', shadowColor: 'rgba(0, 0, 0, 0.5)', shadowBlur: 2}, //Series设置
        // 👇 Tuesday 数据！！！
        data: [99, 77, 12, 29, 44, 80, 80, 80, 21, 28, 48, 40, 28, 90, 18], },]}

  var Wed = {              
    tooltip: {trigger:'axis',axisPointer: {type: 'shadow'},confine: true,formatter: '{b0}: {c0}%', padding:[5,10,5,10,]}, //提示框前端
    grid: {left: 20,right: 20,bottom: 15,top: 40,containLabel: true}, // 整体表格所在的grid的大小设置
    yAxis: [{type: 'value',axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格y轴设置
    xAxis: [{type: 'category',axisTick: { show: false },data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格x轴设置
    series: [{name: 'Pit', type: 'bar', label: {normal: {show: true,position: 'inside'}},itemStyle: {borderRadius: [4, 4, 0, 0], color: '#9E7E38', shadowColor: 'rgba(0, 0, 0, 0.5)', shadowBlur: 2}, //Series设置
        // 👇 Wednesday 数据！！！
        data: [99, 77, 12, 29, 44, 80, 80, 80, 21, 28, 48, 40, 28, 90, 18], },]}

  var Thur = {              
    tooltip: {trigger:'axis',axisPointer: {type: 'shadow'},confine: true,formatter: '{b0}: {c0}%', padding:[5,10,5,10,]}, //提示框前端
    grid: {left: 20,right: 20,bottom: 15,top: 40,containLabel: true}, // 整体表格所在的grid的大小设置
    yAxis: [{type: 'value',axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格y轴设置
    xAxis: [{type: 'category',axisTick: { show: false },data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格x轴设置
    series: [{name: 'Pit', type: 'bar', label: {normal: {show: true,position: 'inside'}},itemStyle: {borderRadius: [4, 4, 0, 0], color: '#9E7E38', shadowColor: 'rgba(0, 0, 0, 0.5)', shadowBlur: 2}, //Series设置
        // 👇 Wednesday 数据！！！
        data: [99, 77, 12, 29, 44, 80, 80, 80, 21, 28, 48, 40, 28, 90, 18], },]}
        
  var Fri = {              
    tooltip: {trigger:'axis',axisPointer: {type: 'shadow'},confine: true,formatter: '{b0}: {c0}%', padding:[5,10,5,10,]}, //提示框前端
    grid: {left: 20,right: 20,bottom: 15,top: 40,containLabel: true}, // 整体表格所在的grid的大小设置
    yAxis: [{type: 'value',axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格y轴设置
    xAxis: [{type: 'category',axisTick: { show: false },data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格x轴设置
    series: [{name: 'Pit', type: 'bar', label: {normal: {show: true,position: 'inside'}},itemStyle: {borderRadius: [4, 4, 0, 0], color: '#9E7E38', shadowColor: 'rgba(0, 0, 0, 0.5)', shadowBlur: 2}, //Series设置
        // 👇 Wednesday 数据！！！
        data: [99, 77, 12, 29, 44, 80, 80, 80, 21, 28, 48, 40, 28, 90, 18], },]}  

  var Sat = {              
    tooltip: {trigger:'axis',axisPointer: {type: 'shadow'},confine: true,formatter: '{b0}: {c0}%', padding:[5,10,5,10,]}, //提示框前端
    grid: {left: 20,right: 20,bottom: 15,top: 40,containLabel: true}, // 整体表格所在的grid的大小设置
    yAxis: [{type: 'value',axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格y轴设置
    xAxis: [{type: 'category',axisTick: { show: false },data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格x轴设置
    series: [{name: 'Pit', type: 'bar', label: {normal: {show: true,position: 'inside'}},itemStyle: {borderRadius: [4, 4, 0, 0], color: '#9E7E38', shadowColor: 'rgba(0, 0, 0, 0.5)', shadowBlur: 2}, //Series设置
        // 👇 Wednesday 数据！！！
        data: [99, 77, 12, 29, 44, 80, 80, 80, 21, 28, 48, 40, 28, 90, 18], },]}
        
  var Sun = {              
    tooltip: {trigger:'axis',axisPointer: {type: 'shadow'},confine: true,formatter: '{b0}: {c0}%', padding:[5,10,5,10,]}, //提示框前端
    grid: {left: 20,right: 20,bottom: 15,top: 40,containLabel: true}, // 整体表格所在的grid的大小设置
    yAxis: [{type: 'value',axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格y轴设置
    xAxis: [{type: 'category',axisTick: { show: false },data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格x轴设置
    series: [{name: 'Pit', type: 'bar', label: {normal: {show: true,position: 'inside'}},itemStyle: {borderRadius: [4, 4, 0, 0], color: '#9E7E38', shadowColor: 'rgba(0, 0, 0, 0.5)', shadowBlur: 2}, //Series设置
        // 👇 Wednesday 数据！！！
        data: [99, 77, 12, 29, 44, 80, 80, 80, 21, 28, 48, 40, 28, 90, 180], },]}       

  if (D == 1){
    var option = Mon;
  }
  if (D == 2){
    var option = Tue;
  }
  if (D == 3){
    var option = Sun;
  }
  if (D == 4){
    var option = Thur;
  }
  if (D == 5){
    var option = Fri;
  }
  if (D == 6){
    var option = Sat;
  }
  if (D == 7){
    var option = Wed;
  }

  chart.setOption(option);
  return chart;
}




var app = getApp();
Page({
    data: {
      ec: {
        onInit: initChart
      },
        choose: false,
        animationData: {},
        stopBtn: true,  //动画未执行完之前禁用按钮
        navTab: ['Breakfast','Lunch','Dinner'],        
        currentTab: 0,
        id:'timetable',
        sendList:[],

        timeTable:[{realTimeTable:'Mon: 10:00 AM- 1:00 AM'},{realTimeTable:'Tue: 10:00 AM- 1:00 AM'},{realTimeTable:'Wed: 10:00 AM- 1:00 AM'},{realTimeTable:'Thu: 10:00 AM- 1:00 AM'},{realTimeTable:'Fri: 10:00 AM- 1:00 AM'},{realTimeTable:'Sat: 10:00 AM- 1:00 AM'},{realTimeTable:'Sun: 10:00 AM- 1:00 AM'}],
        
        list: [{
            id: 'view',
            name: 'True Balance',
            open: false,
            pages: ['干煸四季豆', '红烧狮子头', '披萨', 'sausage muffin', 'omelette egg']
          }, {
            id: 'content',
            name: 'Black&Gold Grill',
            open: false,
            pages: ['burger', 'bagel', 'Croissant', 'sandwich']
          }, {
            id: 'form',
            name: 'The Table',
            open: false,
            pages: ['真难吃', '真难吃', '真难吃', '真难吃']
          }]
      },

    showContent: function (e) {
        // 用that取代this，防止setTimeout内使用this出错
        var that = this;
        // 创建一个动画实例
        var animation = wx.createAnimation({
            // 动画持续时间
            duration: 500,
            // 定义动画效果，当前是匀速
            timingFunction: 'linear'
        })
        // 将该变量赋值给当前动画
        that.animation = animation
        //用step()完成一个动画， 高度为0，透明度为不可见
        animation.height("0").opacity(0).step()
        // 用setData改变当前动画
        that.setData({
            // 通过export()方法导出数据
            animationData: animation.export(),
            // 改变显示条件
            choose: true
        })
        // 设置setTimeout来改变高度以及透明度，实现有感觉的展开
        setTimeout(function () {
            animation.height("60rpx").opacity(1).step({ duration: 500 })
            that.setData({
                animationData: animation.export(),
            })
        }, 50)
        //在动画时间禁用按钮
        setTimeout(function () {
            that.setData({
                stopBtn: false
            })
        }, 500)
    },
    choose: false,
    animationData: {},
    stopBtn: true, //动画未执行完之前禁用按钮
    navTab: ['Breakfast', 'Lunch', 'Dinner'],
    currentTab: 0,
    id: 'timetable',
    sendList: [],

    // 隐藏
    hideContent: function (e) {
        var that = this;
        var animation = wx.createAnimation({
            duration: 400,
            timingFunction: 'sinusoidalln'
        })
        that.animation = animation
        animation.height(0).opacity(0).step({ duration: 500 })
        that.setData({
            animationData: animation.export()
        })
        setTimeout(function () {
            animation.height("60rpx").step();
            that.setData({
                animationData: animation.export(),
                choose: false,
            })
        }, 500)
        //收回动画开始禁用按钮
        that.setData({
            stopBtn: true,
        })
    },

    /**上面是时间表核心代码
   * 下面是菜单收缩核心代码*/

  kindToggle(e) {
    var id = e.currentTarget.id;
    id = parseInt(id);
    var list =  this.data.dinnerL;// this.data.list;
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      dinnerL:list
    })
  },
      select: {
        page: 1,
        size: 6,
        isEnd: false
      },
    
      /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    //   wx.cloud.database().collection('ForsythData')
    // .doc('8937eaa9615a601a0f766e4201bf62d2').get()
    // .then(res=>{
    //   console.log("成功",res)
    //   this.setData({
    //     num1:res.data.newCases,
    //     num2:res.data.casesLast14Days,
    //     num3:res.data.totalCases,
    //     num4:res.data.totalDeaths,
    //     date:res.data.date,
    //   })
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
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
  getMenu: function (sj) {
    var that = this;
    wx.showLoading({
      title: '',
    })
    const db = wx.cloud.database({});
    const cont = db.collection('NorthPitMenu');
    cont.where({
      _id: sj,
    }).get({
      success: res => {
        // this.setData({
        //   list: res.data
        // })
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
          if (i == 'DINNER (4:30pm-9pm)') {
            that.setData({
              dinnerL: obj
            });
            console.log(obj);
          } else if (i == 'LUNCH (11am-2pm)') {
            that.setData({
              lunchL: obj
            });
          } else if (i == 'BRUNCH (10am-2pm)') {
            that.setData({
              brunchL: obj
            });
          }
        }
        wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

    //Popular Time图表
    onShareAppMessage: function (res) {
      return {
        title: 'ECharts 可以在微信小程序中使用啦！',
        path: '/pages/index/index',
        success: function () { },
        fail: function () { }
      }
    },
    // data: {
    //   ec: {
    //     onInit: initChart
    //   }
    // },
  
    onReady() {
      setTimeout(function () {
        // 获取 chart 实例的方式
        // console.log(chart)
      }, 2000);
    }
  })