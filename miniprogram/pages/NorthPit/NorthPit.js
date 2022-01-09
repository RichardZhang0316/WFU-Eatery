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
    backgroundColor: "#fff",           
    tooltip: {trigger:'axis',axisPointer: {type: 'shadow'},confine: true,formatter: '{b0}: {c0}%', padding:[5,10,5,10,]}, //提示框前端
    grid: {left: 20,right: 20,bottom: 15,top: 40,containLabel: true}, // 整体表格所在的grid的大小设置
    yAxis: [{type: 'value',axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格y轴设置
    xAxis: [{type: 'category',axisTick: { show: false },data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格x轴设置
    series: [{name: 'Pit', type: 'bar', label: {normal: {show: true,position: 'inside', color: 'white'}},itemStyle: {borderRadius: [4, 4, 0, 0], color: '#d6b160', shadowColor: 'rgba(0, 0, 0, 0.5)', shadowBlur: 2}, //Series设置
        // 👇 Monday 数据！！！
        data: [3, 5, 6.7, 29, 47, 38, 28, 22, 27, 33, 64, 52, 34, 20, 17], },]}
  
  var Tue = {   
    backgroundColor: "#fff",                      
    tooltip: {trigger:'axis',axisPointer: {type: 'shadow'},confine: true,formatter: '{b0}: {c0}%', padding:[5,10,5,10,]}, //提示框前端
    grid: {left: 20,right: 20,bottom: 15,top: 40,containLabel: true}, // 整体表格所在的grid的大小设置
    yAxis: [{type: 'value',axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格y轴设置
    xAxis: [{type: 'category',axisTick: { show: false },data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格x轴设置
    series: [{name: 'Pit', type: 'bar', label: {normal: {show: true,position: 'inside', color: 'white'}},itemStyle: {borderRadius: [4, 4, 0, 0], color: '#d6b160', shadowColor: 'rgba(0, 0, 0, 0.5)', shadowBlur: 2}, //Series设置
        // 👇 Tuesday 数据！！！
        data: [4.1, 9.4, 17, 38, 47, 29, 19, 16, 19, 35, 66, 53, 33, 19, 15], },]}

  var Wed = {
    backgroundColor: "#fff",                         
    tooltip: {trigger:'axis',axisPointer: {type: 'shadow'},confine: true,formatter: '{b0}: {c0}%', padding:[5,10,5,10,]}, //提示框前端
    grid: {left: 20,right: 20,bottom: 15,top: 40,containLabel: true}, // 整体表格所在的grid的大小设置
    yAxis: [{type: 'value',axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格y轴设置
    xAxis: [{type: 'category',axisTick: { show: false },data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格x轴设置
    series: [{name: 'Pit', type: 'bar', label: {normal: {show: true,position: 'inside', color: 'white'}},itemStyle: {borderRadius: [4, 4, 0, 0], color: '#d6b160', shadowColor: 'rgba(0, 0, 0, 0.5)', shadowBlur: 2}, //Series设置
        // 👇 Wednesday 数据！！！
        data: [3.7, 8.2, 16, 40, 53, 40, 33, 31, 35, 43, 56, 37, 21, 5.3, 5], },]}

  var Thur = {   
    backgroundColor: "#fff",                      
    tooltip: {trigger:'axis',axisPointer: {type: 'shadow'},confine: true,formatter: '{b0}: {c0}%', padding:[5,10,5,10,]}, //提示框前端
    grid: {left: 20,right: 20,bottom: 15,top: 40,containLabel: true}, // 整体表格所在的grid的大小设置
    yAxis: [{type: 'value',axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格y轴设置
    xAxis: [{type: 'category',axisTick: { show: false },data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格x轴设置
    series: [{name: 'Pit', type: 'bar', label: {normal: {show: true,position: 'inside', color: 'white'}},itemStyle: {borderRadius: [4, 4, 0, 0], color: '#d6b160', shadowColor: 'rgba(0, 0, 0, 0.5)', shadowBlur: 2}, //Series设置
        // 👇 Thursday 数据！！！
        data: [4.9, 12, 19, 39, 60, 44, 32, 34, 35, 59, 48, 42, 34, 30, 26], },]}
        
  var Fri = {    
    backgroundColor: "#fff",                     
    tooltip: {trigger:'axis',axisPointer: {type: 'shadow'},confine: true,formatter: '{b0}: {c0}%', padding:[5,10,5,10,]}, //提示框前端
    grid: {left: 20,right: 20,bottom: 15,top: 40,containLabel: true}, // 整体表格所在的grid的大小设置
    yAxis: [{type: 'value',axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格y轴设置
    xAxis: [{type: 'category',axisTick: { show: false },data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格x轴设置
    series: [{name: 'Pit', type: 'bar', label: {normal: {show: true,position: 'inside', color: 'white'}},itemStyle: {borderRadius: [4, 4, 0, 0], color: '#d6b160', shadowColor: 'rgba(0, 0, 0, 0.5)', shadowBlur: 2}, //Series设置
        // 👇 Friday 数据！！！
        data: [2.5, 7.5, 9.8, 23, 42, 38, 21, 17, 21, 29, 43, 35, 31, 26, 25], },]}  

  var Sat = {  
    backgroundColor: "#fff",                       
    tooltip: {trigger:'axis',axisPointer: {type: 'shadow'},confine: true,formatter: '{b0}: {c0}%', padding:[5,10,5,10,]}, //提示框前端
    grid: {left: 20,right: 20,bottom: 15,top: 40,containLabel: true}, // 整体表格所在的grid的大小设置
    yAxis: [{type: 'value',axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格y轴设置
    xAxis: [{type: 'category',axisTick: { show: false },data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格x轴设置
    series: [{name: 'Pit', type: 'bar', label: {normal: {show: true,position: 'inside', color: 'white'}},itemStyle: {borderRadius: [4, 4, 0, 0], color: '#d6b160', shadowColor: 'rgba(0, 0, 0, 0.5)', shadowBlur: 2}, //Series设置
        // 👇 Saturday 数据！！！
        data: [1.4, 2.7, 7.7, 20, 24, 28, 8.3, 7, 7.8, 11, 25, 29, 27, 17, 14], },]}
        
  var Sun = { 
    backgroundColor: "#fff",                        
    tooltip: {trigger:'axis',axisPointer: {type: 'shadow'},confine: true,formatter: '{b0}: {c0}%', padding:[5,10,5,10,]}, //提示框前端
    grid: {left: 20,right: 20,bottom: 15,top: 40,containLabel: true}, // 整体表格所在的grid的大小设置
    yAxis: [{type: 'value',axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格y轴设置
    xAxis: [{type: 'category',axisTick: { show: false },data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格x轴设置
    series: [{name: 'Pit', type: 'bar', label: {normal: {show: true,position: 'inside', color: 'white'}},itemStyle: {borderRadius: [4, 4, 0, 0], color: '#d6b160', shadowColor: 'rgba(0, 0, 0, 0.5)', shadowBlur: 2}, //Series设置
        // 👇 Sunday 数据！！！
        data: [1, 2, 7.9, 15, 34, 36, 23, 18, 13, 18, 22, 22, 2, 1, 1], },]}     

        var option=[Sun,Mon,Tue,Wed,Thur,Fri,Sat][D];

  chart.setOption(option);
  return chart;
}

//实时人流仪表盘
function initChart1(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  //获取实时人流数据，链接Javascript爬虫
  var PecentageM = 80;   

  //实时人流图表的基础参数设置
  var option = {
    // backgroundColor: "#F6F6F6",
    series: [{
      name: 'Real_Time',
      type: 'gauge',
      detail: {
        formatter: '{value}%',
        color: '#9E7E38',
        fontSize: 20,
      },
      axisLine: {
        lineStyle: {
          width: 25,
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
        distance: -25,
        length: 7,
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
          width: 2
        }
      },
      axisLabel: {
        color: 'white',
        distance: 9,
        fontSize: 0,
        fontWeight: 'bold',
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

var app = getApp();
Page({
    data: {
      menu_data: {},
      have_menu_data: false,
      occupancy_chart_loading: true,
      ec: {
        onInit: initChart
      },
      ec1:{
        lazyLoad: true,
        // onInit: initChart1
      },
        choose: false,
        animationData: {},
        stopBtn: true,  //动画未执行完之前禁用按钮
        navTab: ['Breakfast','Lunch','Dinner'],        
        currentTab: 0,
        id:'timetable',
        sendList:[],

        timeTable:[{realTimeTable:'Mon: 7:00 - 21:00'},{realTimeTable:'Tue: 7:00 - 21:00'},{realTimeTable:'Wed: 7:00 - 21:00'},{realTimeTable:'Thu: 7:00 - 20:00'},{realTimeTable:'Fri: 7:00 - 20:00'},{realTimeTable:'Sat: 10:00 - 21:00'},{realTimeTable:'Sun: 10:00 - 21:00'}],
        
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
        }, 0)
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
        }, 0)
        //收回动画开始禁用按钮
        that.setData({
            stopBtn: true,
        })
    },

    /**上面是时间表核心代码
   * 下面是菜单收缩核心代码*/

  /**
   * 监听滚动scrollTop滚动的距离,获取滚动条当前位置
   * 动态改变导航栏背景颜色的透明度
   * */
  onPageScroll: function (e) {
    // console.log(e.scrollTop)
    // 导航栏透明度
    let Alpha = e.scrollTop * 1 / 100;
    // 导航栏背景颜色
    let navigationBackgroundColor = 'rgba(241, 241, 241,' + Alpha + ')';
    this.setData({
      navigationBackgroundColor: navigationBackgroundColor,
    })
  },
      /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.initOccupancyChart()
      const that = this;
      var day = new Date()
        var date_string = `${day.getFullYear()}-${(day.getMonth() + 1).toString().padStart(2,'0')}-${(day.getDate()).toString().padStart(2,'0')}`;
        // date_string="2021-12-01";
        var NorthPitMenuPromise = that.getMenuList(date_string, 'NorthPitMenu')
        NorthPitMenuPromise.then(values => {
          console.log(values);
          if (Object.keys(this.data.menu_data).length == 0) {
            wx.showToast({
              title: date_string + '暂无数据',
              icon: 'none',
              duration: 2000
            });
            that.setData({
              menu_data: {},
              have_menu_data: false
            });
          }
          console.log(that.data.menu_data)
          wx.hideLoading();
        }, reason => {
          console.log(reason)
        });
    },

    initOccupancyChart: function () {
      var that = this;
      const db = wx.cloud.database()
      db.collection('diningOccupancy')
        .doc('lastDiningOccupancy')
        .get()
        .then(res => {
          console.log("***",res)
          that.setData({
            occupancy_chart_loading: false,
            occupancy_percent_updated_time: res.data.updated_time
          })
          console.log(res.data)
          var PecentageM = res.data.Hilltop.occupancy_percent;
          console.log(PecentageM)
          var ecComponent = this.selectComponent('#mychart-dom-gauge');
          console.log(ecComponent)
        ecComponent.init((canvas, width, height, dpr) => {
          // 初始化图表
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr // new
          });
          canvas.setChart(chart); 
        
          //实时人流图表的基础参数设置
          var option = {
            // backgroundColor: "#F6F6F6",
            series: [{
              name: 'Real_Time',
              type: 'gauge',
              detail: {
                formatter: '{value}%',
                color: '#9E7E38',
                fontSize: 20,
              },
              axisLine: {
                lineStyle: {
                  width: 25,
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
                distance: -25,
                length: 7,
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
                  width: 2
                }
              },
              axisLabel: {
                color: 'white',
                distance: 9,
                fontSize: 0,
                fontWeight: 'bold',
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
      });
      
      }).catch( err => {
        wx.showToast({
          title: '客流量加载失败',
          icon: 'error'
        })
      })
    },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    const query = wx.createSelectorQuery()
    query.select('#my-navigation-bar').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (my_navigation_bar_res) {
      const stickyTab = wx.createSelectorQuery()
      stickyTab.select('#stickyTab').boundingClientRect()
      stickyTab.selectViewport().scrollOffset()
      stickyTab.exec(function (stickyTab_res) {
        var stickyTabHeight = stickyTab_res[0].height
        var myBavigationBarHeight = my_navigation_bar_res[0].height
        // 获取系统信息
        wx.getSystemInfo({
          success: function (res) {
            // 获取可使用窗口高度
            let clientHeight = res.windowHeight;
            // 设置高度
            that.setData({
              swiper_height: clientHeight - stickyTabHeight - myBavigationBarHeight
            });
            console.log({
              stickyTabHeight: stickyTabHeight,
              myBavigationBarHeight: myBavigationBarHeight,
              swiper_height: clientHeight - stickyTabHeight - myBavigationBarHeight
            })
          }
        });
      })
    })
  },

  onTabChange: function (e) {
    console.log(this.data.menu_data)
    this.setData({
      currentTimePeriodIndex: e.detail.index
    })
  },

  onSwiperChange: function (e) {
    this.setData({
      currentTimePeriodIndex: e.detail.current
    })
  },

  
    // 获取当天菜单**********************************************************************************
    getMenuList: function (date_string, dinning_name) {
      return new Promise((resolve, reject) => {
        // date_string = '2021-11-09'
        console.log('date_string:', date_string)
        const db = wx.cloud.database();
        const cont = db.collection(dinning_name);
        cont.where({
          _id: date_string,
        }).get({
          success: res => {
            console.log(res)
            if (res.data.length < 1) {
              resolve();
            }
            // 拿到数据
            var dinningHallMenu = res.data[0];
            delete dinningHallMenu._id;
            for (var key in dinningHallMenu) {
              if (key == "Pit Stop") {
                continue;
              }
              if (!this.data.menu_data.hasOwnProperty(key)) {
                this.setData({
                  [`menu_data.${key}`]: {},
                  have_menu_data: true
                })
              }
              var window_data = {}
              for (var window in dinningHallMenu[key]) {
                window_data[window] = {
                  open: false,
                  food_list: dinningHallMenu[key][window]
                }
              }
              if (dinning_name == "NorthPitMenu") {
                dinning_name = "North Pit"
              }
              this.setData({
                [`menu_data.${key}.${dinning_name}`]: {
                  open: false,
                  window: window_data
                },
                have_menu_data: true
              })
            }
            resolve()
          }
        })
      })
    },

  // 选择供餐时段
  selectPeriod: function (e) {
    const that = this;
    var key_list = Object.keys(this.data.menu_data)
    var data_index = 0
    for (var i in key_list) {
      if (e.currentTarget.dataset.current === key_list[i]) {
        data_index = i
      }
    }
    if (that.data.currentTimePeriodIndex === data_index) {
      return false;
    } else {
      that.setData({
        currentTimePeriodName: e.currentTarget.dataset.current,
        currentTimePeriodIndex: data_index
      })
      console.log('currentTimePeriodIndex: ', that.data.currentTimePeriodIndex)
    }
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
    // wx.showLoading({
    //   title: '',
    // })
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
  })