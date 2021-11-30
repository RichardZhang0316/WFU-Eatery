// pages/ChangeMealPlan/ChangeMealPlan.js
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

  data: {
      List: [
      {url: 'https://i.loli.net/2021/11/29/fA2eHXwuPgGqsNS.png',
        text:"Base Plan",
      },
        {url: 'https://i.loli.net/2021/11/29/wuX9pQx5WHhFiNc.png',
        text:"Gold Plan",
      },
        {url: 'https://i.loli.net/2021/11/29/IiW3NDnjVfloRkc.png',
        text:"Screamin' Plan",
      },
        {url: 'https://i.loli.net/2021/11/29/hyH8lBLFMJcU514.png',
        text:"Freedom Plan",
      },
        {url: 'https://i.loli.net/2021/11/29/Riw5nSQPjkxXU1Y.png',
        text:"Forestry Plan",
      },
        {url: 'https://i.loli.net/2021/11/29/b2I8VOKqwf3UJFl.png',
        text:"Black Plan",
      },
        {url: 'https://i.loli.net/2021/11/29/FisIkDn9Uy1bpdc.png',
        text:"Apartment Style Plan",
      },
        {url: 'https://i.loli.net/2021/11/29/HUdVBziMJN16lKG.png',
        text:"Commuter Plan",
      }
      ],
      banner_data: {},
  
    steps: [
      {
      
        desc: ' 学生需登录Housing Portal以更改Meal Plan',
      },
      {
        desc: '登录Housing Portal，点击2021-2022 Housing按钮，选择当前Academic Year，即可进入Meal Plan Selection页面',
      
      },
      {
        desc: '点击按钮复制网址，在浏览器打开网页',
      
      },
    ],
    contents:'https://wfu.starrezhousing.com/StarRezPortalX/41699BD7/3/3/Home-Home?UrlToken=8B456663',

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})