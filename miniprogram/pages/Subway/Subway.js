//Popular_Time 表格: 目前分为“周中”和“周末”进行数据切换，数据源为Google，方法为比例缩放
import * as echarts from '../../ec-canvas/echarts';
let chart = null;  
let content = '';
var util = require('../../utils/util.js');

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
        data: [10, 40, 50, 70, 80, 60, 30, 10, 5, 5, 3, 3, 10, 20, 40], },]}

  var weekend= {              
    tooltip: {trigger:'axis',axisPointer: {type: 'shadow'},confine: true,formatter:'{b0}: {c0}%', padding:[5,10,5,10,],show: true},//提示框前端
    grid: {left: 20,right: 20,bottom: 15,top: 40,containLabel: true},  // 整体表格所在的grid的大小设置
    yAxis: [{type: 'value',axisLine: {lineStyle: {color: '#9E7E38'}},axisLabel: {color: '#9E7E38'}, show: false}], //表格y轴设置
    xAxis: [{type: 'category',axisTick: { show: false },data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],axisLine: {lineStyle: {color: '#9E7E38'}},axisLabel: {color: '#9E7E38'}}], //表格x轴设置
    series: [{name: 'Pit', type: 'bar', label: {normal: {show: false, position: 'inside', color: 'white'}},itemStyle: {borderRadius: [4, 4, 0, 0], color: '#9E7E38', shadowColor: 'rgba(0, 0, 0, 0.5)', shadowBlur: 2},  //Series设置
        // 👇 数据录入处 ！！暂定以10为scale进行模拟, 数据源: Google
        data: [5, 30, 40, 60, 70, 50, 30, 10, 4, 4, 2, 2, 5, 10, 30], },]}
  
    if (D<=5 && D>=1) {var option = weekdays}
    if (D==0 || D==6) {var option = weekend}

  chart.setOption(option);
  return chart;
}

var app = getApp();
Page({
    data: {
        //Comments
        comments:[],

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

        timeTable:[{realTimeTable:'Mon: 0:00 - 24:00'},{realTimeTable:'Tue: 0:00 - 24:00'},{realTimeTable:'Wed: 0:00 - 24:00'},{realTimeTable:'Thu: 0:00 - 24:00'},{realTimeTable:'Fri: 0:00 - 24:00'},{realTimeTable:'Sat: 0:00 - 24:00'},{realTimeTable:'Sun: 0:00 - 24:00'}],
      },
      
      //前端滑动切换bar-展示信息（目前都注释掉了）
      onChange(event) {
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

    onLoad: function (options) {
        // 初始页面加载CommentList
        wx.cloud.database().collection("comments").doc('subway').get()
        .then(res=>{
        console.log("CommentList查询成功",res);
        this.setData({
          comments:res.data.commentList
        })
      }).catch(err=>{
        console.log("CommentList查询失败",err);
      })
    },

    //清空评论框
    getContent(e){
      content = e.detail.value
      //动态绑定数据，实现评论结束后清空content的内容
      this.setData({
        content :e.detail.value
      })
    },

    //发表评论
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
      remarksItem.userName = "Anonymous user"
  
      //remarks存储更新后的数组，
      let localCommentList = this.data.comments
      localCommentList.unshift(remarksItem)  //将对象插入到数组中。unshift插入到数组最前面，push插入到数组最后面
      console.log("添加评论后的数组",localCommentList);
  
      //调用云函数之前显示加载中
      wx.showLoading({
        title: '发表中',
      })

      wx.cloud.database().collection('comments').doc('subway')
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
        comments:localCommentList, //发表成功后，动态刷新评论列表
        content:""  //发表成功后，清空input内容
      })
      wx.hideLoading()  //隐藏加载提示
    })
    .catch(err=>{
      console.log("Fail to publish your comment",err);
      //隐藏加载提示
      wx.hideLoading()
    })},
    


    onShow: function () {

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

    //Echart
    onShareAppMessage: function (res) {
        return {
          //title: 'ECharts 可以在微信小程序中使用啦！',
          path: '/pages/index/index',
          success: function () { },
          fail: function () { }
        }
      },
    
      onReady() {
        setTimeout(function () {
          // 获取 chart 实例的方式
          // console.log(chart)
        }, 2000);
      }
})