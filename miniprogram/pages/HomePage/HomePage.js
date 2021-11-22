//获取应用实例
const app = getApp()
// import util from '../../utils/util.js';
var util = require('../../utils/util.js');
var myDate = new Date();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navHeight: '',
        menuButtonInfo: {},
        searchMarginTop: 0, // 搜索框上边距
        searchWidth: 0, // 搜索框宽度
        searchHeight: 0 ,// 搜索框高度
        //设定时间
        //相关参考资料：https://developers.weixin.qq.com/community/develop/doc/0000a4390c4f706f79fa0e6755bc00
        todHours:myDate.getHours(),
        todMinutes:myDate.getMinutes(),
        todSeconds:myDate.getSeconds(),
        todWeekD:myDate.getDay(),
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            menuButtonInfo: wx.getMenuButtonBoundingClientRect() 
        })
        console.log(this.data.menuButtonInfo)
        const { top, width, height, right } = this.data.menuButtonInfo
        wx.getSystemInfo({
            success: (res) => {
            const { statusBarHeight } = res
            const margin = top - statusBarHeight
            this.setData({
            navHeight: (height + statusBarHeight + (margin * 2)),
            searchMarginTop: statusBarHeight + margin, // 状态栏 + 胶囊按钮边距
            searchHeight: height,  // 与胶囊按钮同高
            searchWidth: right - width // 胶囊按钮右边坐标 - 胶囊按钮宽度 = 按钮左边可使用宽度
            })
        },
    })
    },
    
     /**
     * 调动时间
     */
    timesetting: function () {
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

    }
})