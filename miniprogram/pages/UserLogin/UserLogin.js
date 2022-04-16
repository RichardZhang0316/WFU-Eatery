//获取应用实例
const app = getApp()

Page({
    data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        isHide: false,
        nickName: '',
        profilePic: ''
    },

    onLoad: function() {
        var that = this;
        // 查看用户是否授权
        wx.getSetting({
            success: function(res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function(res) {
                            // 获取用户信息
                            console.log('用户名称：' + res.userInfo.nickName)
                            console.log('用户头像链接：' + res.userInfo.avatarUrl)
                            //var userInfo = res.userInfo
                            that.setData({
                              nickName: res.userInfo.nickName,
                              profilePic: res.userInfo.avatarUrl
                          }); console.log(that.data) // 本页面全部data 
                            // 用户授权成功后，调用微信的 wx.login 接口，从而获取code
                            wx.login({ // wx.login的return obj属性只有code
                                success: res => {
                                    // 获取到用户的 code 之后：res.code
                                    console.log("成功获取用户的code:" + res.code);
                                    
                                    // 获取 openid ，如下：
                                    // wx.request({
                                    //     // 自行补上自己的 APPID 和 SECRET
                                    //     url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx2a68ba548488d188&secret=自己的SECRET&js_code=' + res.code + '&grant_type=authorization_code',
                                    //     success: res => {
                                    //         // 获取到用户的 openid
                                    //         console.log("用户的openid:" + res.data.openid);
                                    //     }
                                    // });
                                }
                            });
                        }
                    });
                            
                } else {
                    // 用户没有授权
                    // 改变 isHide 的值，显示授权页面
                    that.setData({
                        isHide: true
                    });
                }
            }
        });
    },

    bindGetUserInfo: function(e) {
        if (e.detail.userInfo) {
            //用户按了允许授权按钮
            var that = this;
            // 获取到用户的信息了，打印到控制台上看下
            console.log("用户的信息如下：");
            console.log(e.detail.userInfo);
            //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
            that.setData({
                isHide: false,
            });
        } else {
            //用户按了拒绝按钮
            wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                showCancel: false,
                confirmText: '返回授权',
                success: function(res) {
                    // 用户没有授权成功，不需要改变 isHide 的值
                    if (res.confirm) {
                        console.log('用户点击了“返回授权”');
                    }
                }
            });
        }
    },
    
    // onShow: function () {
                
    //   setTimeout(function() {
    //     wx.switchTab({
    //       url: '/pages/Launch/Launch',
    //     })
    //   }, 0)
    // },

})
