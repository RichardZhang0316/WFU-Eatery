// pages/AddDeaconDolllar/AddDeaconDollar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  data: {
    steps: [
      {
        text: '方法一',
        desc: 'Deacon Dining Website。',
      
      },
      {
        text: '方法二',
        desc: '拨打336.758.5607 或 800.528.5778。',
      },
      {
        text: '方法三',
        desc: '周一至周五8:30 Am 到 4:30 PM，在Reynolda一楼服务窗口直接充值。',

      
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