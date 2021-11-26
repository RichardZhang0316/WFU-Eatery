// pages/Search/Search.js
var value = '';
var hosList = [];
Page({

  /**
   * Page initial data
   */
  data: {
    inputShowed: false,
    inputVal: "",
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad() {
    this.setData({
      search: this.search.bind(this),
    })
  },
  search: function (value) {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'search1',
        // 传递给云函数的event参数
        data: {
          searchKey: value
        }
      }).then(res => {
        resolve(res.result)
      })
    })
  },

  selectResult: function (e) {
    console.log('select result', e.detail)
    var name=e.detail.item.value;
    console.log(`pages/${name}/${name}`);
    wx.navigateTo({
      url: `/pages/${name}/${name}`
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})