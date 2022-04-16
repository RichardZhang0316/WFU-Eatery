// CommentList
const db = wx.cloud.database()
const _ = db.command
let content = '';

// Popular Time 表格
import * as echarts from '../../ec-canvas/echarts';
let chart = null;  
var util = require('../../utils/util.js');

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

Page({
    data: {
      //CommentList Data
      comments:[],
      userName: "Anonymous user",
      isAuth: false,
      openid: "",
      thiscommentAuthorid: "",
      thiscommentID: 0,
      isYourComment: false,

      occupancy_chart_loading: true,
      ec1:{
        // onInit: initChart1
        lazyLoad: true,
      },
        choose: false,
        animationData: {},
        stopBtn: true,  //动画未执行完之前禁用按钮
        navTab: ['Breakfast','Lunch','Dinner'],        
        currentTab: 0,
        id:'timetable',
        sendList:[],

        timeTable:[{realTimeTable:'Mon: 11:00 - 13:30'},{realTimeTable:'Tue: 11:00 - 13:30'},{realTimeTable:'Wed: 11:00 - 13:30'},{realTimeTable:'Thu: 11:00 - 13:30'},{realTimeTable:'Fri: 11:00 - 13:30'},{realTimeTable:'Sat: closed'},{realTimeTable:'Sun: closed'}],
        
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
        let that = this
// **************** 评论功能所需onLoad **************//
        // 获取用户openid
        wx.cloud.callFunction({
          name:'getOpenid',
          complete: res => {
           console.log('云函数获取到的openid: ', res.result.openid)
           that.setData({
             openid: res.result.openid,
           })
          }
        })
      
        // 获取用户name
        var userName = wx.getStorageSync('userName') || 'N/A';
        if (userName === 'N/A') {
          that.setData({
            'name' : "Anonymous user",
            isAuth: false,
          })
        } else {
          that.setData({
            'name' : userName,
            isAuth: true,
          })
        }
        // For Debug
        // var userName = that.data.name
        // var isAutho = that.data.isAuth
        // console.log("用户授权状态: " + isAutho)
        // console.log("用户昵称: " + userName)

        // 初始页面加载CommentList
        wx.cloud.database().collection("comments").doc('MagnoliaRoom').get()
        .then(res=>{
        console.log("CommentList查询成功",res);
        this.setData({
          // initialize本页已存在的data
          comments:res.data.commentList 
        })
      }).catch(err=>{
        console.log("CommentList查询失败",err);
      })
// ************** 评论功能所需onLoad结束*************//
    this.initOccupancyChart()
    // const that = this;
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
        var PecentageM = res.data.MagnoliaRoom.occupancy_percent;
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


    // 评论框：展示输入内容
    getContent(e){
      content = e.detail.value
      //动态绑定数据，实现评论结束后清空content的内容
      this.setData({
        content :e.detail.value,
      })
      // 内容框里的输入字符：content
      // console.log(content)
    },

    // 发表评论
    remark(e){
      //如果评论长度小于4给予提示
      if(content.length<4){
        wx.showToast({
          title: 'Your comment is too short',
          icon:"none"
        })
        return
      }
      //定义remarksItem变量来存储插入的对象
      let remarksItem = {}
      remarksItem.content = content
      remarksItem.userName = this.data.name
      remarksItem.openid = this.data.openid
      //remarks存储更新后的数组，
      let localCommentList = this.data.comments
      localCommentList.unshift(remarksItem)  //将对象插入到数组中。unshift插入到数组最前面，push插入到数组最后面
      console.log("添加评论后的数组",localCommentList);
  
      //调用云函数之前显示加载中
      wx.showLoading({
        title: '发表中',
      })
      wx.cloud.database().collection('comments').doc('MagnoliaRoom')
      .update({
      data:{
        commentList:localCommentList
      }
    }).then(res=>{
      console.log("your comment is successfully published",res);
      //提示成功
      wx.showToast({
        title: 'your comment is successfully published',
        icon:"success",
        duration:2000
      }),
      //实现动态刷新页面
      this.setData({
        comments:localCommentList, //发表后，动态刷新评论列表
        content:""  //发表成功后，清空input内容
      })
      wx.hideLoading()  //隐藏加载提示
    })
    .catch(err=>{
      console.log("Fail to publish your comment",err);
      //隐藏加载提示
      wx.hideLoading()
    })},
    
    // ToDo: 删除评论函数
    delete: function(e) {
      var that = this
      let indexDelete = e
      console.log("执行删除评论：" + indexDelete)
      // 从页面的data层面删除指定评论
      var list = this.data.comments
      list.splice(indexDelete, 1)
      this.setData({
        comments: list
      })
      // 同步云端删除
      db.collection('comments').doc('MagnoliaRoom').update({
        data: {
          commentList: list
        }
      })
    },

    // 判断是否为该用户所发表的评论
    isYourComments: function (e) {
      var that = this
      let thiscommentID = e
      this.setData({ thiscommentID: thiscommentID })
      console.log("该条评论为第 " + thiscommentID + " 条评论")
      let userOpenid = this.data.openid
      // 调取点击评论的作者的openid，并与此用户openid比对
      wx.cloud.database().collection('comments').doc('MagnoliaRoom').get().then(res=>{
        this.setData({
          thiscommentAuthorid: res.data.commentList[thiscommentID].openid
        })
        if (userOpenid === "o5mu85K0nx0_0EI04sDauLfKB3K8" || userOpenid === "o5mu85IFmuL7ahBT6RMWIBy9wkIg" || userOpenid === "o5mu85Nn0je-QJXlPZzGJWd2hGg8") { 
          console.log("你是管理员")
          this.setData({ isYourComment: true })
        } else if (this.data.thiscommentAuthorid === userOpenid) {
          // console.log(this.data.thiscommentAuthorid + " <-> " + userOpenid)
          console.log("你是该条评论发布者")
          this.setData({ isYourComment: true })
        } else {
          // console.log(this.data.thiscommentAuthorid + " <-> " + userOpenid)
          console.log("你不是该条评论发布者")
          this.setData({ isYourComment: false })
        }
        // 如果是同一个人，则给予删除权限
        if (this.data.isYourComment) {
          wx.showModal({
            title: '删除评论',
            content: "",
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                that.delete(that.data.thiscommentID)
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      })
    },

    // 删除评论问讯提示框
    getNotice: function (e) {
      // 重要: 获取对应点击评论的index
      let thisCommentIndex = e.currentTarget.dataset.indexOfItem
        // console.log(e.currentTarget.dataset.indexOfItem)
      // 如果是该用户发表的评论，则弹出删除提示框
      this.isYourComments(thisCommentIndex) 
    },


    // 获取用户Profile授权函数
    getUserProfile: function (e) {
      wx.getUserProfile({
        desc: '获取用户昵称',
        success: res => {
          console.log(res.userInfo)
          this.setData({
              'name': res.userInfo.nickName,
              'isAuth' : true
          })
          try {
            wx.setStorageSync('userPic', res.userInfo.avatarUrl)
            console.log('写入userPic_Key成功')
          } catch (e) { console.log('写入userPic_Key失败')}
          try {
            wx.setStorageSync('userName', res.userInfo.nickName)
            console.log('写入userName_Key成功')
          } catch (e) { console.log('写入userName_Key失败')}
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
  
    onReady() {
      setTimeout(function () {
        // 获取 chart 实例的方式
        //console.log(chart)
      }, 2000);
    }
  })