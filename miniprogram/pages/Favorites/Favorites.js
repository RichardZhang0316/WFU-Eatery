Page({

    data: {
        name: "Deacon"
    },

    onLoad: function (options) {

    },

    getUserProfile: function (e) {
        var that = this
        wx.getUserProfile({
          desc: '业务需要',
          success: res => {
            console.log(res)
            this.setData({
                'name': res.userInfo.nickName
            })
          }
        })       
      }

})