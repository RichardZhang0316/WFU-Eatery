// import cfg from '../../utils/config.js';
// import util from '../../utils/util.js';
var app = getApp();
Page({
    data: {
        choose: false,
        animationData: {},
        stopBtn: true,//动画未执行完之前禁用按钮
        navTab: ['Breakfast','Lunch','Dinner'],        
        currentTab: 0,
        id:'timetable',
        sendList:[],

        timeTable:[{realTimeTable:'Mon: 10:00 AM- 1:00 AM'},{realTimeTable:'Tue: 10:00 AM- 1:00 AM'},{realTimeTable:'Wed: 10:00 AM- 1:00 AM'},{realTimeTable:'Thu: 10:00 AM- 1:00 AM'},{realTimeTable:'Fri: 10:00 AM- 1:00 AM'},{realTimeTable:'Sat: 10:00 AM- 1:00 AM'},{realTimeTable:'Sun: 10:00 AM- 1:00 AM'}],
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

    // 隐藏
    hideContent: function (e) {
        var that = this;
        var animation = wx.createAnimation({
            duration: 500,
            timingFunction: 'linear'
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
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

})