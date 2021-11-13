var util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      //获取当前日期
      var time = util.formatDate(new Date());
      
      var day1 = util.getTimeLastWeek1(new Date());//1天后时间
      var day2 = util.getTimeLastWeek2(new Date());
      var day3 = util.getTimeLastWeek3(new Date());
      var day4 = util.getTimeLastWeek4(new Date());
      var day5 = util.getTimeLastWeek5(new Date());
      var day6 = util.getTimeLastWeek6(new Date());
      var week1=util.getWeekByDate1(new Date());
      var week2=util.getWeekByDate2(new Date());
      var week3=util.getWeekByDate3(new Date());
      var week4=util.getWeekByDate4(new Date());
      var week5=util.getWeekByDate5(new Date());
      var week6=util.getWeekByDate6(new Date());
      this.setData({
        time1:'Today\n',
        time2:time,
        day11:week1+'\n',
        day12:day1,
        day21:week2+'\n',
        day22:day2,
        day31:week3+' \n',
        day32:day3,
        day41:week4+' \n',
        day42:day4,
        day51:week5+'\n',
        day52:day5,
        day61:week6+'\n',
        day62:day6,
        
      });
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
    checkCurrent:function(e){
        const that = this;
    
        if (that.data.currentData === e.target.dataset.current){
            return false;
        }else{
    
          that.setData({
            currentData: e.target.dataset.current
           
          })
        }
    },

    currentCheck:function(e){
      const that = this;
  
      if (that.data.dataCurrent === e.target.dataset.current){
          return false;
      }else{
  
        that.setData({
          dataCurrent: e.target.dataset.current
         
        })
      }
  },

  set:function(e){
    const that = this;

      that.setData({
        num: [0,1,2,3,4,5,6,7,8,9]
       
      })
    
},

})
// function getDay(num) {
//     var today = new Date();
//     var nowTime = today.getTime();
//     var ms = 24 * 3600 * 1000 * num;
//     today.setTime(parseInt(nowTime + ms));
  
//     // var oMoth = (today.getMonth() + 1).toString();
//     var oDay = today.getDate().toString();
//     return oDay ;
//   }