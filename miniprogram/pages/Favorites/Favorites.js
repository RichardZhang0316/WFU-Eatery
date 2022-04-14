
Page({

    data: {
        isAuth: false,
        name: "",
        userPic: "",
        welcome: ""
    },

    onLoad: function (options) {
      var that = this
      // 自定义欢迎语
      var currentTime = new Date().getHours();
        var sentences= "你好呀👋" ;
        if(currentTime>=0&&currentTime<=5){
            sentences="早睡哦😴";
        }
        else if(currentTime>=6&&currentTime<=10){
            sentences="早安";
        }
        else if(currentTime>=18&&currentTime<=23){
            sentences="晚上好";
        }
      
      // 用户授权头像+名称信息部分
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
          welcome: sentences,
          isAuth: false
        })
      } else {
        that.setData({
          'name' : userName,
          'userPic' : userPic,
          isAuth: true,
          'welcome' : sentences
        })
      }
    },

    getUserProfile: function (e) {
        var that = this
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
      },
})