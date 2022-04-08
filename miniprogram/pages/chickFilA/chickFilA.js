//Popular_Time 表格: 目前分为“周中”和“周末”进行数据切换，数据源为Google，方法为“等比例缩放”
import * as echarts from '../../ec-canvas/echarts';

const db = wx.cloud.database() 
const _ = db.command // 获取数据库操作符，通过 db.command 获取
const CF = db.collection('ChickFilAUpDown')

var util = require('../../utils/util.js');
var that;
let chart = null;  
let content = '';
let likeCollection = wx.getStorageSync('likeCollection'); // 从本地缓存中同步获取指定 key 的内容
    if(!likeCollection){
      wx.setStorageSync('likeCollection', {})
    }

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
    series: [{name: 'Pit', type: 'bar', label: {normal: {show: false,position: 'inside', color: 'white'}},itemStyle: {borderRadius: [4, 4, 0, 0], color: '#d6b160', shadowColor: 'rgba(0, 0, 0, 0.5)', shadowBlur: 2},  //Series设置
        // 👇 数据录入处 ！！
    data: [3, 5, 6.7, 29, 47, 38, 28, 22, 27, 33, 64, 52, 34, 20, 17], },]}

  
  chart.setOption(weekdays);
  return chart;
}


var app = getApp();
Page({
    data: {
        newList:[],
        isLike:[],
        like_people:[],
        openid:'',
        RateChick:[],
        Name: ["Chick_Fila_A_Sauce", "Polynesian_Sauce"],
        comments:[],

        //前端滑动切换bar_Data input
        active:0,
        //下拉动画
        choose: false,
        animationData: {},
        stopBtn: true,  //动画未执行完之前禁用按钮
        navTab: ['Breakfast','Lunch','Dinner'],        
        currentTab: 0,
        id:'timetable',
        sendList:[],
        
        //Popular Time_图表Data
        timeTable:[{realTimeTable:'Mon: 7:30 - 22:00'},{realTimeTable:'Tue: 7:30 - 22:00'},{realTimeTable:'Wed: 7:30 - 22:00'},{realTimeTable:'Thu: 7:30 - 22:00'},{realTimeTable:'Fri: 11:00 - 22:00'},{realTimeTable:'Sat: closed'},{realTimeTable:'Sun: 7:30 - 22:00'}],

        ec: {
          onInit: initChart
        },
      },
      

    //前端滑动切换bar-展示信息（目前都注释掉了）
    onChange(event) {
        // wx.showToast({
        //   //title: `切换到标签 ${event.detail.name}`,
        //   //icon: 'none',
        // });
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
     * 生命周期函数--监听页面加载*/

    // onLoad:页面加载时触发,一个页面只会调用一次
    onLoad: function (options) { 
       let that = this; // this指的是本页面的所有data
       wx.cloud.callFunction({
         name:'getOpenid',
         complete:res=>{
          console.log('云函数获取到的openid: ', res.result.openid)
          that.setData({
            openid: res.result.openid,
          })
          
          CF.field({ //发送请求获取Up_and_Down列表数据
            _id: true,
            like: true,
            Up: true,
            like_people: true
          }).get({
            success: res => {
              that.setData({
                newList: res.data
              })
            var iszan = that.data.isLike;
            for (var i = 0; i < res.data.length; i++) { //数据获取成功后，进行遍历，拿到所有已经点过赞的书籍id
              for (let j = 0; j < res.data[i].like_people.length; j++) {
                if (res.data[i].like_people[j] == that.data.openid) { 
                  iszan.push(res.data[i]._id) //根据改用户的数据找到已经点赞的，把书籍id放入新建数组中
                }
              }
            }
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].like = false
              for (let j = 0; j < iszan.length; j++) { //利用新建的iszan数组与list数组的id查找相同的书籍id
                if (res.data[i]._id == iszan[j]) { //双重循环遍历，有相同的id则点亮红心
                  res.data[i].like = true
                }
              }
            }
            console.log('在这里',res.data)
            that.setData({
              isLike: this.data.iszan,
              newList: res.data
            })
            wx.setStorageSync('zan', iszan);
         }
       })

        // 以下是CommentList函数
        wx.cloud.database().collection("comments").doc('chickFillA').get()
        .then(res=>{
        console.log("CommentList查询成功",res);
        this.setData({
          comments:res.data.commentList
        })
      }).catch(err=>{
        console.log("查询失败",err);
      })

        wx.cloud.database().collection('ChickFilAUpDown').get().then(res=>{
          console.log("Success",res);
          this.setData({
            RateChick: res.data
            //ChickFilA:res.data
          })
        })
        .catch(err=>{
          console.log("查询失败",err);
        })

        wx.cloud.database().collection('ChickFilAUpDown').doc('Chick_Fila_A_Sauce').get().then(res=>{
          console.log("Success",res);
          this.setData({
            CFAup:res.data.Up
          })
        })
        .catch(err=>{
          console.log("查询失败",err);
        })
      }
      })},

    upFunction(e){
      var shareid = e.currentTarget.dataset.id
      console.log("shareid: "+shareid)
      this.zan(shareid);
    },

    // 点赞函数
    zan: function (item_id) {
      var that = this;
      var cookie_id = wx.getStorageSync('zan') || []; //获取全部点赞的id
      var openid = that.data.openid
      console.log(openid)

      for (var i = 0; i < that.data.newList.length; i++) {
        if (that.data.newList[i]._id == item_id) { //数据列表中找到对应的id
          var num = that.data.newList[i].Up; //当前点赞数
          //console.log("here!")
          if (cookie_id.includes(item_id) ) { //已经点过赞了，取消点赞
            for (var j in cookie_id) {
              if (cookie_id[j] == item_id) {
                cookie_id.splice(j, 1); //删除取消点赞的id
              }
            }
            --num; //点赞数减1
            that.setData({
              [`newList[${i}].Up`]: num, //es6模板语法，常规写法报错
              [`newList[${i}.].like`]: false //我的数据中like为'false'是未点赞
            })
            wx.setStorageSync('zan', cookie_id);
            wx.showToast({
              title: "取消点赞",
              icon: 'none'
            })
            this.data.newList[i].like_people.pop(openid)
          } else { //点赞操作
            ++num; //点赞数加1
            //console.log(num)
            that.setData({
              [`newList[${i}].Up`]: num,
              [`newList[${i}.].like`]: true
            })
           
            cookie_id.unshift(item_id); //新增赞的id
            wx.setStorageSync('zan', cookie_id);
            wx.showToast({
              title: "点赞成功",
              icon: 'none'
            })
            if(this.data.newList[i].like_people == undefined){
              this.data.newList[i].like_people = []
            }
            this.data.newList[i].like_people.push(openid)
          }
          //和后台交互，后台数据要同步
          CF.doc(item_id).update({
            data: {
              like: this.data.newList[i].like,
              Up: num,
              like_people: this.data.newList[i].like_people
            },
            success: res => {
              console.log("点赞数据后台已同步",res)
            }
          })
          //更新点赞后的点赞数
          this.onLoad()
        }
      }
    },
 
    updateUP1() {
      const _ = wx.cloud.database().command
      wx.cloud.database().collection('ChickFilAUpDown').doc('Chick_Fila_A_Sauce')
      .update({
        data: {
          Up:_.inc(1)
        }
      }) .then(res=>{
        console.log('success',res)
        //let index = e.currentTarget.dataset.index;
        this.setData({ 
           RateChick: res.data
         })
        this.onLoad()
      })
    },
    updateDOWN1() {
      const _ = wx.cloud.database().command
      wx.cloud.database().collection('ChickFilAUpDown').doc('Chick_Fila_A_Sauce')
      .update({
        data: {
          Down:_.inc(1)
        }
      }) .then(res=>{
        console.log('success',res)
        //let index = e.currentTarget.dataset.index;
        this.setData({ 
           RateChick: res.data
         })
        this.onLoad()
      })
    },
    updateUP2() {
      const _ = wx.cloud.database().command
      wx.cloud.database().collection('ChickFilAUpDown').doc('Polynesian_Sauce')
      .update({
        data: {
          Up:_.inc(1)
        }
      }) .then(res=>{
        console.log('success',res)
        //let index = e.currentTarget.dataset.index;
        this.setData({ 
           RateChick: res.data
         })
        this.onLoad()
      })
    },
    updateDOWN2() {
      const _ = wx.cloud.database().command
      wx.cloud.database().collection('ChickFilAUpDown').doc('Polynesian_Sauce')
      .update({
        data: {
          Down:_.inc(1)
        }
      }) .then(res=>{
        console.log('success',res)
        //let index = e.currentTarget.dataset.index;
        this.setData({ 
           RateChick: res.data
         })
        this.onLoad()
      })
    },
    updateUP3() {
      const _ = wx.cloud.database().command
      wx.cloud.database().collection('ChickFilAUpDown').doc('Barbeque_Sauce')
      .update({
        data: {
          Up:_.inc(1)
        }
      }) .then(res=>{
        console.log('success',res)
        //let index = e.currentTarget.dataset.index;
        this.setData({ 
           RateChick: res.data
         })
        this.onLoad()
      })
    },
    updateDOWN3() {
      const _ = wx.cloud.database().command
      wx.cloud.database().collection('ChickFilAUpDown').doc('Barbeque_Sauce')
      .update({
        data: {
          Down:_.inc(1)
        }
      }) .then(res=>{
        console.log('success',res)
        //let index = e.currentTarget.dataset.index;
        this.setData({ 
           RateChick: res.data
         })
        this.onLoad()
      })
    },
    updateUP4() {
      const _ = wx.cloud.database().command
      wx.cloud.database().collection('ChickFilAUpDown').doc('Honey_Mustard')
      .update({
        data: {
          Up:_.inc(1)
        }
      }) .then(res=>{
        console.log('success',res)
        //let index = e.currentTarget.dataset.index;
        this.setData({ 
           RateChick: res.data
         })
        this.onLoad()
      })
    },
    updateDOWN4() {
      const _ = wx.cloud.database().command
      wx.cloud.database().collection('ChickFilAUpDown').doc('Honey_Mustard')
      .update({
        data: {
          Down:_.inc(1)
        }
      }) .then(res=>{
        console.log('success',res)
        //let index = e.currentTarget.dataset.index;
        this.setData({ 
           RateChick: res.data
         })
        this.onLoad()
      })
    },
    updateUP5() {
      const _ = wx.cloud.database().command
      wx.cloud.database().collection('ChickFilAUpDown').doc('Garden_Herb_Ranch')
      .update({
        data: {
          Up:_.inc(1)
        }
      }) .then(res=>{
        console.log('success',res)
        //let index = e.currentTarget.dataset.index;
        this.setData({ 
           RateChick: res.data
         })
        this.onLoad()
      })
    },
    updateDOWN5() {
      const _ = wx.cloud.database().command
      wx.cloud.database().collection('ChickFilAUpDown').doc('Garden_Herb_Ranch')
      .update({
        data: {
          Down:_.inc(1)
        }
      }) .then(res=>{
        console.log('success',res)
        //let index = e.currentTarget.dataset.index;
        this.setData({ 
           RateChick: res.data
         })
        this.onLoad()
      })
    },
    updateUP6() {
      const _ = wx.cloud.database().command
      wx.cloud.database().collection('ChickFilAUpDown').doc('Zesty Buffalo Sauce')
      .update({
        data: {
          Up:_.inc(1)
        }
      }) .then(res=>{
        console.log('success',res)
        //let index = e.currentTarget.dataset.index;
        this.setData({ 
           RateChick: res.data
         })
        this.onLoad()
      })
    },
    updateDOWN6() {
      const _ = wx.cloud.database().command
      wx.cloud.database().collection('ChickFilAUpDown').doc('Zesty Buffalo Sauce')
      .update({
        data: {
          Down:_.inc(1)
        }
      }) .then(res=>{
        console.log('success',res)
        //let index = e.currentTarget.dataset.index;
        this.setData({ 
           RateChick: res.data
         })
        this.onLoad()
      })
    },
    updateUP7() {
      const _ = wx.cloud.database().command
      wx.cloud.database().collection('ChickFilAUpDown').doc('SweetSpicy')
      .update({
        data: {
          Up:_.inc(1)
        }
      }) .then(res=>{
        console.log('success',res)
        //let index = e.currentTarget.dataset.index;
        this.setData({ 
           RateChick: res.data
         })
        this.onLoad()
      })
    },
    updateDOWN7() {
      const _ = wx.cloud.database().command
      wx.cloud.database().collection('ChickFilAUpDown').doc('SweetSpicy')
      .update({
        data: {
          Down:_.inc(1)
        }
      }) .then(res=>{
        console.log('success',res)
        //let index = e.currentTarget.dataset.index;
        this.setData({ 
           RateChick: res.data
         })
        this.onLoad()
      })
    
    },
    /**
     * 生命周期函数--监听页面初次渲染完成*/
     
    onReady: function () {

    },
    

    /**
     * 生命周期函数--监听页面显示
     */
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
          title: 'ECharts 可以在微信小程序中使用啦！',
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
      },    

      //New comment method
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

        wx.cloud.database().collection('comments').doc('chickFillA')
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
          comments:localCommentList,  //发表成功后，动态刷新评论列表
          content:""        //发表成功后，清空input内容
        })
        //隐藏加载提示
        wx.hideLoading()
      })
      .catch(err=>{
        console.log("Fail to publish your comment",err);
        //隐藏加载提示
        wx.hideLoading()
      })

        //调用云函数来更新评论数据到数据库
        /*
        wx.cloud.callFunction({
          name:"updateState",
          data:{
            id:"chickFillA",
            commentList:commentList,
          }
        })
        .then(res=>{
          console.log("your comment is successfully published",res);
          //提示成功
          wx.showToast({
            title: 'your comment is successfully published',
            icon:"success",
            duration:2000
          }),
          //实现动态刷新页面
          this.setData({
            comments:commentList,  //发表成功后，动态刷新评论列表
            content:""        //发表成功后，清空input内容
          })
          //隐藏加载提示
          wx.hideLoading()
        })
        .catch(err=>{
          console.log("Fail to publish your comment",err);
          //隐藏加载提示
          wx.hideLoading()
        })
        */
      
      }
    }
  )
