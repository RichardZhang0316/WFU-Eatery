//Popular_Time 表格: 目前分为“周中”和“周末”进行数据切换，数据源为Google，方法为比例缩放
const db = wx.cloud.database()
const _ = db.command
let content = '';
import * as echarts from '../../ec-canvas/echarts';
var util = require('../../utils/util.js');
let chart = null;  

//Initial Chart的function
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

  var weekdays= {    
    backgroundColor: '#fff',         
    tooltip: {trigger:'axis',axisPointer: {type: 'shadow'},confine: true,formatter:'{b0}: {c0}%', padding:[5,10,5,10,],show: true},//提示框前端
    grid: {left: 20,right: 20,bottom: 15,top: 40,containLabel: true},  // 整体表格所在的grid的大小设置
    yAxis: [{type: 'value',axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}, show: false}], //表格y轴设置
    xAxis: [{type: 'category',axisTick: { show: false },data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],axisLine: {lineStyle: {color: '#999'}},axisLabel: {color: '#666'}}], //表格x轴设置
    series: [{name: 'Pit', type: 'bar', label: {normal: {show: false, position: 'inside', color: 'white'}},itemStyle: {borderRadius: [4, 4, 0, 0], color: '#d6b160', shadowColor: 'rgba(0, 0, 0, 0.5)', shadowBlur: 2},  //Series设置
        // 👇 数据录入处 ！！暂定以10为scale进行模拟, 数据源: Google
        data: [5, 10, 12, 13, 20, 13, 8, 5, 5, 7, 11, 10, 5, 0, 0], },]}

  var weekend= {              
    tooltip: {trigger:'axis',axisPointer: {type: 'shadow'},confine: true,formatter:'{b0}: {c0}%', padding:[5,10,5,10,],show: true},//提示框前端
    grid: {left: 20,right: 20,bottom: 15,top: 40,containLabel: true},  // 整体表格所在的grid的大小设置
    yAxis: [{type: 'value',axisLine: {lineStyle: {color: '#9E7E38'}},axisLabel: {color: '#9E7E38'}, show: false}], //表格y轴设置
    xAxis: [{type: 'category',axisTick: { show: false },data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],axisLine: {lineStyle: {color: '#9E7E38'}},axisLabel: {color: '#9E7E38'}}], //表格x轴设置
    series: [{name: 'Pit', type: 'bar', label: {normal: {show: false, position: 'inside', color: 'white'}},itemStyle: {borderRadius: [4, 4, 0, 0], color: '#9E7E38', shadowColor: 'rgba(0, 0, 0, 0.5)', shadowBlur: 2},  //Series设置
        // 👇 数据录入处 ！！暂定以10为scale进行模拟, 数据源: Google
        data: [0, 3, 9, 8, 6, 4, 2, 2, 2, 5, 6, 6, 3, 0, 0], },]}
  
    if (D<=5 && D>=1) {var option = weekdays}
    if (D==0 || D==6) {var option = weekend}

  chart.setOption(option);
  return chart;
}


var app = getApp();
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

        //Popular Time_图表Data
        ec: {
            onInit: initChart
          },
        //前端滑动切换bar_Data input
        active: 0,
        //下拉动画
        choose: false,
        animationData: {},
        stopBtn: true,  //动画未执行完之前禁用按钮
        navTab: ['Breakfast','Lunch','Dinner'],        
        currentTab: 0,
        id:'timetable',
        sendList:[],

        timeTable:[{realTimeTable:'Mon: 8:00 - 20:00'},{realTimeTable:'Tue: 8:00 - 20:00'},{realTimeTable:'Wed: 8:00 - 20:00'},{realTimeTable:'Thu: 8:00 - 20:00'},{realTimeTable:'Fri: 8:00 - 20:00'},{realTimeTable:'Sat: 9:00 - 20:00'},{realTimeTable:'Sun: 9:00 - 20:00'}],
      },


    showContent: function (e) {
        // 用that取代this，防止setTimeout内使用this出错
        var that = this;
        // 创建一个动画实例
        var animation = wx.createAnimation({
            // 动画持续时间
            duration: 500,
            // 定义动画效果
            timingFunction: 'sinusoidalln'
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

    hideContent: function (e) {
        var that = this;
        var animation = wx.createAnimation({
            duration: 1,
            timingFunction: 'linear'
        })
        that.animation = animation
        animation.height(0).opacity(0).step({ duration: 10 })
        that.setData({
            animationData: animation.export()
        })
        setTimeout(function () {
            animation.height("60rpx").step();
            that.setData({
                animationData: animation.export(),
                choose: false,
            })
        }, 10)
        //收回动画开始禁用按钮
        that.setData({
            stopBtn: true,
        })
    },
    /**上面是时间表核心代码
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
      wx.cloud.database().collection("comments").doc('PODMarket').get()
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
    wx.cloud.database().collection('comments').doc('PODMarket')
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
    db.collection('comments').doc('PODMarket').update({
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
    wx.cloud.database().collection('comments').doc('PODMarket').get().then(res=>{
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
    onReady() {
      setTimeout(function () {
        // 获取 chart 实例的方式
        // console.log(chart)
      }, 2000);
    }
  })