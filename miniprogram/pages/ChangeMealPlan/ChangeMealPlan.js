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
      {url: 'https://s2.loli.net/2022/06/19/OkAdgNcwFiSre3m.png',
        text:"Base Plan",
      },
        {url: 'https://s2.loli.net/2022/06/19/OPpzGU72bqQtLgR.png',
        text:"Gold Plan",
      },
        {url: 'https://s2.loli.net/2022/06/19/5QzSkvKwZqRdhmN.png',
        text:"Screamin' Plan",
      },
        {url: 'https://s2.loli.net/2022/06/19/s42FyeAtaf1x7nz.png',
        text:"Freedom Plan",
      },
        {url: 'https://s2.loli.net/2022/06/19/REB5g4WYtDu9yJn.png',
        text:"Forestry Plan",
      },
        {url: 'https://s2.loli.net/2022/06/19/d4C1eBih9v5rnpo.png',
        text:"Black Plus Plan",
      },
        {url: 'https://s2.loli.net/2022/06/19/IUtfTJ37epGPzjD.png',
        text:"Apartment Style Plan",
      },
        {url: 'https://s2.loli.net/2022/06/19/7GyuZsaki35XO68.png',
        text:"Commuter Plan",
      }
      ],
      banner_data: {},
  
    steps: [
      {
      
        desc: ' 登录 Housing Portal 以更改 Meal Plan',
      },
      {
        desc: '登录 Housing Portal，点击 2022-2023 Housing按钮，选择当前 Academic Year，即可进入 Meal Plan Selection 页面',
      
      },
      {
        desc: '👇 点击按钮复制网址，在浏览器打开网页',
      
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