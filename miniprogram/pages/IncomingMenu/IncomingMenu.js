var util = require('../../utils/util.js');

Page({
  data: {
    menu_data: {},
    have_menu_data: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取当前日期
    var today = new Date()
    var show_day_list = new Array('sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat');
    var dateList = []
    for (var i = 0; i < 7; i++) {
      var show_day = show_day_list[(today.getDay() + i) % 7]
      if (i === 0) {
        show_day = 'Today'
      }
      var day = new Date()
      day.setDate(today.getDate() + i)
      dateList.push({
        'show_day': show_day + "\n",
        'day': day.getDate()
      })
    }
    this.setData({
      dateList: dateList
    })
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
  // 选择日期
  selectDate: function (e) {
    const that = this;
    var day = new Date()
    day.setDate(day.getDate() + e.currentTarget.dataset.current)
    if (that.data.currentDateIndex === e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        currentDateIndex: e.currentTarget.dataset.current
      })
      var date_string = `${day.getFullYear()}-${(day.getMonth() + 1).toString().padStart(2,'0')}-${(day.getDate()).toString().padStart(2,'0')}`
      that.getMenuList(date_string, 'NorthPitMenu')
      that.getMenuList(date_string, 'Pit')
    }
  },

  // 获取当天菜单
  getMenuList: function (date_string, dinning_name) {
    // date_string = '2021-11-09'
    console.log('date_string:', date_string)
    wx.showLoading({
      title: '',
    })
    const db = wx.cloud.database();
    var that=this;
    const cont = db.collection(dinning_name);
    cont.where({
      _id: date_string,
    }).get({
      success: res => {
        console.log(res)
        if(res.data.length < 1){
          wx.hideLoading();
          wx.showToast({
            title: date_string+'暂无数据',
            icon: 'none',
            duration: 2000
          });
          that.setData({
            menu_data: {},
            have_menu_data: false
          });
          return;
        }
        // 拿到数据
        var dinningHallMenu = res.data[0];
        delete dinningHallMenu._id;
        for (var key in dinningHallMenu) {
          if(key=="Pit Stop"){
            continue;
          }
          if (!this.data.menu_data.hasOwnProperty(key)) {
            this.setData({
              [`menu_data.${key}`]: {},
              have_menu_data: true
            })
          }
          var window_data = {}
          for (var window in dinningHallMenu[key]) {
            window_data[window] = {
              open: false,
              food_list: dinningHallMenu[key][window]
            }
          }
          this.setData({
            [`menu_data.${key}.${dinning_name}`]: {
              open: false,
              window: window_data
            },
            have_menu_data: true
          })
        }
        wx.hideLoading()
      }
    })
  },

  // 选择供餐时段
  selectPeriod: function (e) {
    const that = this;
    var key_list = Object.keys(this.data.menu_data)
    var data_index = 0
    for (var i in key_list) {
      if (e.currentTarget.dataset.current === key_list[i]) {
        data_index = i
      }
    }
    if (that.data.currentTimePeriodIndex === data_index) {
      return false;
    } else {
      that.setData({
        currentTimePeriodName: e.currentTarget.dataset.current,
        currentTimePeriodIndex: data_index
      })
      console.log('currentTimePeriodIndex: ', that.data.currentTimePeriodIndex)
    }
  },

  // 餐厅折叠面板
  dinningHallToggle: function (e) {
    var periodName = e.currentTarget.dataset.periodname
    var dinningHallName = e.currentTarget.dataset.dinninghallname
    this.setData({
      [`menu_data.${periodName}.${dinningHallName}.open`]: !this.data.menu_data[periodName][dinningHallName].open
    })
  },

  // 窗口折叠面板
  windowToggle: function (e) {
    var periodName = e.currentTarget.dataset.periodname
    var dinningHallName = e.currentTarget.dataset.dinninghallname
    var window_name = e.currentTarget.dataset.window_name
    var menu_data = this.data.menu_data
    menu_data[periodName][dinningHallName]['window'][window_name].open = !menu_data[periodName][dinningHallName]['window'][window_name].open
    this.setData({
      menu_data
    })
  },

  // 页面跳转（测试）
  navigateToDinningHall: function (e) {
    var dinninghallname = e.currentTarget.dataset.dinninghallname
    console.log(`/pages/${dinninghallname}/${dinninghallname}`)
    wx.navigateTo({
      url: `/pages/${dinninghallname}/${dinninghallname}`,
      // url: '/pages/Bento/Bento'
    })
  }
})
