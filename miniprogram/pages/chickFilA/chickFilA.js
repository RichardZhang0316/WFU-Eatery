// Popular_Time 表格: 目前分为“周中”和“周末”进行数据切换，数据源为Google，方法为“等比例缩放”
import * as echarts from '../../ec-canvas/echarts';
let chart = null;  
let content = '';

const db = wx.cloud.database()
const _ = db.command // 获取数据库操作符，通过 db.command 获取
//const CF = db.collection('ChickFilAUpDown')
const CFA = db.collection('UpDown').doc('ChickFillA')



let likeCollection = wx.getStorageSync('likeCollection') // 从本地缓存中同步获取指定 key 的内容
    if(!likeCollection){
      wx.setStorageSync('likeCollection', {})
    }
let caiCollection = wx.getStorageSync('caiCollection');
  if(!caiCollection){
    wx.setStorageSync('caiCollection', {})
  }

// Initial Chart的function
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
      // 点赞点踩
      newList:[], // 全量Result
      isLike:[],
      isCai:[],
      like_people:[],
      cai_people:[],
      openid:'',
      comments:[],
      RC:[],
      

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

    // onLoad:页面加载时触发,一个页面只会调用一次
    onLoad: function (options) { 
       let that = this; 

       // 云函数获取openid
       wx.cloud.callFunction({
         // 云函数获取openid
         name:'getOpenid',
         complete:res=>{
          console.log('云函数获取到的openid: ', res.result.openid)
          that.setData({
            openid: res.result.openid,
          })
          //发送请求获取Up_and_Down列表数据
          CFA.get({
            success: res => {
            console.log("ChickUpDown数据：", res)
            that.setData({
              newList: res.data.ItemList
              //nList: res.data.ItemList,
            })
            
            let iszan = that.data.isLike; // 已点赞合集
            let iscai = that.data.isCai; // 已点踩合集
            // 数据获取成功后，进行遍历，拿到所有已经点过赞的id
            for (var i = 0; i < res.data.ItemList.length; i++) { 
              for (let j = 0; j < res.data.ItemList[i].like_people.length; j++) {
                if (res.data.ItemList[i].like_people[j] == that.data.openid) { 
                  iszan.push(res.data.ItemList[i].item) //根据改用户的数据找到已经点赞的，把id放入新建数组中
                }
              }
              for (let j = 0; j < res.data.ItemList[i].cai_people.length; j++) {
                if (res.data.ItemList[i].cai_people[j] == that.data.openid) { 
                  iscai.push(res.data.ItemList[i].item) //根据改用户的数据找到已经踩过的，把商品id放入新建数组中
                }
              }
            }
            
            for (let i = 0; i < res.data.ItemList.length; i++) {
              res.data.ItemList[i].like = false
              res.data.ItemList[i].cai = false
              for (let j = 0; j < iszan.length; j++) { //利用新建的iszan数组与list数组的id查找相同的item_id
                if (res.data.ItemList[i].item == iszan[j]) { //双重循环遍历，有相同的id则点亮红心
                  res.data.ItemList[i].like = true
                }
              }
              for (let j = 0; j < iscai.length; j++) { //利用新建的iszan数组与list数组的id查找相同的书籍id
                if (res.data.ItemList[i].item == iscai[j]) { //双重循环遍历，有相同的id则点亮红心
                  res.data.ItemList[i].cai = true
                }
              }
            }
            that.setData({
              isLike: this.data.iszan,
              //newList: res.data.ItemList,
              isCai:this.data.iscai,
              //nList: res.data.ItemList,
            })
            wx.setStorageSync('zan', iszan);
            wx.setStorageSync('cai', iscai);
         }
       })

      }})

      wx.cloud.database().collection('UpDown').doc('ChickFillA').get().then(res=>{
        console.log("RC查询成功",res);
        this.setData({
          RC: res.data.ItemList
        })
      }).catch(err=>{
        console.log("查询失败",err);
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
    }, // 🙌 onLoad 结束

    // 点踩函数
    downFunction(e){
      var shareid = e.currentTarget.dataset.id
      console.log("Food_id: "+shareid)
      this.cai(shareid);
    },

    cai: function (item_id) {
      let that = this;
      let cookie_id = wx.getStorageSync('cai') || []; 
      let zan_id = wx.getStorageSync('zan') || [];  
      let openid = that.data.openid

      for (var i = 0; i < that.data.newList.length; i++) { // 历变当前页面所有fooditems
        if (that.data.newList[i].item == item_id) { //找到对应的id的food item
          let numD = that.data.newList[i].Down; //当前踩数量
          let numU = that.data.newList[i].Up; //当前踩数量
          // 若此用户已经踩过了，取消踩
          if (cookie_id.includes(item_id) ) { 
            console.log("cooooookie_ID: ", cookie_id)
            for (var j in cookie_id) {
              if (cookie_id[j] == item_id) {
                cookie_id.splice(j, 1); //删除取消点赞的id
              }
            }
            --numD; //踩数减1
            if (numD < 0) { numD = 0}
            that.setData({
              [`newList[${i}].Down`]: numD, //es6模板语法，常规写法报错
              [`newList[${i}].cai`]: false //我的数据中cai为'false'是未踩
            })
            wx.setStorageSync('cai', cookie_id);
            wx.showToast({
              title: "取消点踩",
              icon: 'none'
            })
            this.data.newList[i].cai_people.pop(openid)
            // 若此用户尚未点踩，踩操作
          } else { 
            // 若此用户点赞了该item，则点踩+取消赞
            if(zan_id.includes(item_id)){
              for (var j in zan_id) {
                if (zan_id[j] == item_id) {
                  zan_id.splice(j, 1); //删除取消点赞的id
                }
              }
              --numU; //点赞数减1
              if (numU < 0) { numU = 0}
              that.setData({
                [`newList[${i}].Up`]: numU, //es6模板语法，常规写法报错
                [`newList[${i}.].like`]: false //我的数据中like为'false'是未点赞
              })
              wx.setStorageSync('zan', cookie_id);
              this.data.newList[i].like_people.pop(openid)
            }
            // 进行点踩
            ++numD; //踩数加1
            that.setData({
              [`newList[${i}].Down`]: numD,
              [`newList[${i}].cai`]: true
            })
           
            cookie_id.unshift(item_id); //新增踩的id
            wx.setStorageSync('cai', cookie_id);
            wx.showToast({
              title: "踩一下",
              icon: 'none'
            })
            if(this.data.newList[i].cai_people == undefined){
              this.data.newList[i].cai_people = []
            }
            this.data.newList[i].cai_people.push(openid)
          }
          //和后台交互，后台数据库要同步
          CFA.update({
            data: {
             ItemList:this.data.newList
            },
            success: res => {
              console.log("踩数据后台已同步",res)
            }
          })
          that.setData({
            [`RC[${i}].Up`]: numU,
            [`RC[${i}].Down`]: numD,
          })
        }
        
      }
      
    },

    upFunction(e){
      var shareid = e.currentTarget.dataset.id
      console.log("shareid: "+shareid)
      this.zan(shareid);
    },

    // 点赞函数
    zan: function (item_id) {
      var that = this;
      var cookie_id = wx.getStorageSync('zan') || []; //获取全部点赞的id
      var cai_id = wx.getStorageSync('cai') || [];
      var openid = that.data.openid
      console.log(that.data.newList)

      for (var i = 0; i < that.data.newList.length; i++) {
        if (that.data.newList[i].item == item_id) { //数据列表中找到对应的id
          var numU = that.data.newList[i].Up; //当前点赞数
          var numD = that.data.newList[i].Down;
          //console.log("here!")
          if (cookie_id.includes(item_id) ) { //已经点过赞了，取消点赞
            for (var j in cookie_id) {
              if (cookie_id[j] == item_id) {
                cookie_id.splice(j, 1); //删除取消点赞的id
              }
            }
            --numU; //点赞数减1
            if (numU < 0) { numU = 0}
            that.setData({
              [`newList[${i}].Up`]: numU, //es6模板语法，常规写法报错
              [`newList[${i}.].like`]: false //我的数据中like为'false'是未点赞
            })
            wx.setStorageSync('zan', cookie_id);
            wx.showToast({
              title: "取消点赞",
              icon: 'none'
            })
            this.data.newList[i].like_people.pop(openid)
          } else{
            // 若用户已点踩，取消点踩，再点赞
            if(cai_id.includes(item_id)){
              for (var j in cai_id) {
                if (cai_id[j] == item_id) {
                  cai_id.splice(j, 1); //删除取消点赞的id
                }
              }
              --numD; //点踩数减1
              if (numD < 0) { numD = 0}
              that.setData({
                [`newList[${i}].Down`]: numD, //es6模板语法，常规写法报错
                [`newList[${i}.].cai`]: false //我的数据中like为'false'是未点赞
              })
              wx.setStorageSync('cai', cookie_id);
              this.data.newList[i].cai_people.pop(openid)
            }
             //点赞操作
            ++numU; //点赞数加1
            //console.log(num)
            that.setData({
              [`newList[${i}].Up`]: numU,
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
          CFA.update({
            data: {
             ItemList:this.data.newList
            },
            success: res => {
              console.log("点赞数据后台已同步",res)
            }
          })
          //更新点赞后的点赞数
          that.setData({
            [`RC[${i}].Up`]: numU,
            [`RC[${i}].Down`]: numD,
            
          })
        }
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

      }
    }
  )
