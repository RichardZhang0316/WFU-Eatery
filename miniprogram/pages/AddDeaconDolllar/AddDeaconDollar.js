// pages/AddDeaconDolllar/AddDeaconDollar.js
Page({

  /**
   * 页面的初始数据
   */


  data: {
    steps: [
      {
        text: 'Method 1',
        desc: 'Deacon Dining网站: 下方复制网页链接，跳转浏览器后登陆充值',
      
      },
      {
        text: 'Method 2',
        desc: '拨打电话: 336.758.5607 或 800.528.5778',
      },
      {
        text: 'Method 3',
        desc: '现场充值: 周一至周五8:30am-4:30 PM，在Reynolda一层服务窗口直接充值',
      },


    ],
    contents:'https://wakeforest.campuscardcenter.com/ch/quick_revalue.html',
  },
  copyText: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },

  /**
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

  }
})