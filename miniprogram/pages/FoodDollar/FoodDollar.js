// pages/FoodDollar/FoodDollar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [
      {
        text: 'Step 1',
        desc: '登录WFU_Gmail, 在Google Apps中找到Deacon Dining选项',
        // inactiveIcon: 'location-o',
        // activeIcon: 'success',
      },
      {
        text: 'Step 2',
        desc: '点击"My Profile"即可查看账户余额及交易记录',
        // inactiveIcon: 'location-o',
        // activeIcon: 'success',
      },
      {
        text: 'Step 3',
        desc: '具体流程见下方链接，复制后在浏览器中打开',
        // inactiveIcon: 'location-o',
        // activeIcon: 'success',
      },
    ],
    contents:'https://dining.wfu.edu/wp-content/uploads/2017/09/Student-Deacon-Dining-Job-Aid-.pdf',
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