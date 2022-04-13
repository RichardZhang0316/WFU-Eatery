
Page({

    data: {
        isAuth: false,
        name: "",
        userPic: ""
    },

    onLoad: function (options) {
      var that = this
      // 获取用户授权的头像和昵称信息，从Key中获取
      var userPic = wx.getStorageSync('userPic') || 'N/A';
      var userName = wx.getStorageSync('userName') || 'N/A';
      console.log(userPic)
      console.log(userName)
      // 如果用户未曾授权，则setData默认名称和头像
      if (userName === 'N/A') {
        that.setData({
          'name' : "请点击登陆",
          'userPic' : "https://s2.loli.net/2022/04/14/kIUBPA6YCOSt7LJ.png",
          isAuth: false
        })
      } else {
        that.setData({
          'name' : userName,
          'userPic' : userPic,
          isAuth: true
        })
      }
      
    
    },

    getUserProfile: function (e) {
        var that = this
        wx.login({
          timeout: 0,
        })
        wx.getUserProfile({
          desc: '获取用户头像和昵称',
          success: res => {
            console.log(res.userInfo)
            this.setData({
                'name': res.userInfo.nickName,
                'userPic' : res.userInfo.avatarUrl,
                'isAuth' : true
            })
            try {
              wx.setStorageSync('userPic', res.userInfo.avatarUrl)
              console.log('写入userPic_Key成功')
            } catch (e) { console.log('写入userPic_Key失败')}
            try {
              wx.setStorageSync('userName', res.userInfo.nickName)
              console.log('写入userName_Key成功')
            } catch (e) { console.log('写入userName_Key失败')}
          }
        })       
      }

})