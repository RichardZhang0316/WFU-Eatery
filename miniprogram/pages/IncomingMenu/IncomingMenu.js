var util = require('../../utils/util.js');

Page({
  data: {
    currentData:0,
    dataCurrent2:null,
    dataCurrent:null,

    /*changeStatus(){
      if (7<util.hour<11) {
        that.setData({
         dataCurrent2:0
        })
        console.log(this.data.dataCurrent2)
       }
   
       else if(11<=util.hour<=14){
         that.setData({
         dataCurrent2:1
        })
        console.log(this.data.dataCurrent2)
       }
   
       else if(16<=util.hour<21 && 30<=util.minute<=59){
         that.setData({
         dataCurrent2:2
        })
        console.log(this.data.dataCurrent2)
       }
   
       else {
         that.setData({
         dataCurrent2:0
        })
        console.log(this.data.dataCurrent2)
       }
    } */
  
  },

  /*testfun: function() {
    var that = this;
    if (7<util.hour<11) {
     that.setData({
      dataCurrent2:0
     })
     console.log(this.data.dataCurrent2)
    }

    else if(11<=util.hour<=14){
      that.setData({
      dataCurrent2:1
     })
     console.log(this.data.dataCurrent2)
    }

    else if(16<=util.hour<21 && 30<=util.minute<=59){
      that.setData({
      dataCurrent2:2
     })
     console.log(this.data.dataCurrent2)
    }

    else {
      that.setData({
      dataCurrent2:0
     })
     console.log(this.data.dataCurrent2)
    }

   },*/

  onLoad: function (options) {

    //获取当前日期
    var time = util.formatDate(new Date());
    var day1 = util.getTimeLastWeek1(new Date()); //1天后时间
    var day2 = util.getTimeLastWeek2(new Date());
    var day3 = util.getTimeLastWeek3(new Date());
    var day4 = util.getTimeLastWeek4(new Date());
    var day5 = util.getTimeLastWeek5(new Date());
    var day6 = util.getTimeLastWeek6(new Date());
    var week1 = util.getWeekByDate1(new Date());
    var week2 = util.getWeekByDate2(new Date());
    var week3 = util.getWeekByDate3(new Date());
    var week4 = util.getWeekByDate4(new Date());
    var week5 = util.getWeekByDate5(new Date());
    var week6 = util.getWeekByDate6(new Date());
    this.setData({
      time1: 'Today\n',
      time2: time,
      day11: week1 + '\n',
      day12: day1,
      day21: week2 + '\n',
      day22: day2,
      day31: week3 + ' \n',
      day32: day3,
      day41: week4 + ' \n',
      day42: day4,
      day51: week5 + '\n',
      day52: day5,
      day61: week6 + '\n',
      day62: day6,

      currentData2:0

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
  checkCurrent: function (e) {
    const that = this;
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
      console.log(e.target.dataset.current);
      that.getList(e.target.dataset.current);
    }
  },

  getList: function (day) {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年  
    var Y = date.getFullYear();
    //获取月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    var T = date.getHours();
    
    var F = date.getMinutes();


    function getData(){
      var that = this;
      console.log(that.data.message)
      }

    

    if (day == '0') {
      D = this.data.time2;
    } else if (day == '1') {
      D = this.data.day12[0];
    } else if (day == '2') {
      D = this.data.day22[0];
    } else if (day == '3') {
      D = this.data.day32[0];
    } else if (day == '4') {
      D = this.data.day42[0];
    } else if (day == '5') {
      D = this.data.day52[0];
    } else if (day == '6') {
      D = this.data.day62[0];
    }
    var sj = Y + '-' + M + '-' + D;
    console.log(sj);
    var that = this;
    wx.showLoading({
      title: '',
    })
    const db = wx.cloud.database({});
    const cont = db.collection('NorthPitMenu');
    cont.where({
      _id: sj,
    }).get({
      success: res => {
        // this.setData({
        //   list: res.data
        // })
        if(res.data.length < 1){
          wx.hideLoading()
          wx.showToast({
            title: sj+'暂无数据',
            icon: 'none',
            duration: 2000
          });
          that.setData({
            brunchL:[],
            lunchL:[],
            dinnerL:[]
          });
          return;
        }
        console.log(res.data);
        var ary = res.data[0];
        delete ary._id;
        for (var i in ary) {
          var obj = [];
          //console.log(i);
          var a = 0;
          for (var j in ary[i]) {
            obj.push({
              id: a,
              name: j,
              open: false,
              pages: ary[i][j]
            });
            a++;
          }
          if (i == 'DINNER (4:30pm-9pm)') {
            that.setData({
              dinnerL: obj
            });
            console.log(obj);
          } else if (i == 'LUNCH (11am-2pm)') {
            that.setData({
              lunchL: obj
            });
          } else if (i == 'BRUNCH (10am-2pm)') {
            that.setData({
              brunchL: obj
            });
          }
        }
        wx.hideLoading()
      }
    })

    this.getMenu2(sj);

  },

  getMenu2: function (sj) {
    var that = this;
    wx.showLoading({
      title: '',
    })
    const db = wx.cloud.database({});
    const cont = db.collection('diningHallMenu');
    cont.where({
      _id: sj,
    }).get({
      success: res => {
        console.log(res.data);
        var ary = res.data[0];
        delete ary._id;
        for (var i in ary) {
          var obj = [];
          //console.log(i);
          var a = 0;
          for (var j in ary[i]) {
            obj.push({
              id: a,
              name: j,
              open: false,
              pages: ary[i][j]
            });
            a++;
          }
          if (i == 'DINNER (4:30pm-8pm)') {
            that.setData({
              dinnerL2: obj
            });
            console.log(obj);
          } else if (i == 'LATE BRUNCH (11am-2pm)') {
            that.setData({
              labrunchL2: obj
            });
          } else if (i == 'BRUNCH (9am-11am)') {
            that.setData({
              brunchL2: obj
            });
          } else if (i == 'PIT STOP (2pm-4:30pm)') {
            that.setData({
              pitSL2: obj
            });
          }
        }

        wx.hideLoading()
      }
    })

  },

  kindToggle1(e) {
    var id = e.currentTarget.id;
    id = parseInt(id);
    var list =  this.data.brunchL;// this.data.list;
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      brunchL:list
    })
  },
  kindToggle2(e) {
    var id = e.currentTarget.id;
    id = parseInt(id);
    var list =  this.data.lunchL;// this.data.list;
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      lunchL:list
    })
  },
  kindToggle(e) {
    var id = e.currentTarget.id;
    id = parseInt(id);
    var list =  this.data.dinnerL;// this.data.list;
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      dinnerL:list
    })
  },
  kindToggle3(e) {
    var id = e.currentTarget.id;
    id = parseInt(id);
    var list =  this.data.brunchL2;// this.data.list;
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      brunchL2:list
    })
  },
  kindToggle4(e) {
    var id = e.currentTarget.id;
    id = parseInt(id);
    var list =  this.data.labrunchL2;// this.data.list;
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      labrunchL2:list
    })
  },
  kindToggle5(e) {
    var id = e.currentTarget.id;
    id = parseInt(id);
    var list =  this.data.pitSL2;// this.data.list;
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      pitSL2:list
    })
  },
  kindToggle6(e) {
    var id = e.currentTarget.id;
    id = parseInt(id);
    var list =  this.data.dinnerL2;// this.data.list;
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      dinnerL2:list
    })
  },

  currentCheck2: function (e) {
    const that = this;
    if (that.data.dataCurrent2 === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        dataCurrent2: e.target.dataset.current
      })
    }
  },
  currentCheck: function (e) {
    const that = this;
    if (that.data.dataCurrent === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        dataCurrent: e.target.dataset.current
      })
    }
  },

  set: function (e) {
    const that = this;

    that.setData({
      num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

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