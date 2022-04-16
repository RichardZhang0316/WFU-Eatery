//获取应用实例
const app = getApp()
// import util from '../../utils/util.js';
var util = require('../../utils/util.js');
var myDate = new Date();

Page({
    data: { 
        userName: "",
        chosenPayment:"",
        eateries: [{
                name: "Zick's",
                address: "Poteat Residence Hall",
                url: "https://i.loli.net/2021/11/12/JDPvo2uyTXbBcSp.jpg",
                page: "/pages/Zicks/Zicks",
                payment: {
                    mealSwipes: false,
                    oldGoldMeal: true,
                    foodDollar: true,
                    cash: true,
                },
                time: [
                    // 第一个是星期日
                    ["11:00", "23:00"],
                    ["11:00", "23:00"],
                    ["11:00", "23:00"],
                    ["11:00", "23:00"],
                    ["11:00", "2:00"],
                    ["11:00", "2:00"],
                    ["11:00", "2:00"],
                ],
                status: false,
                showStatus:true,
            },
            {
                name: "Subway",
                address: "Davis Residence Hall",
                url: "https://i.loli.net/2021/11/29/cRsg3Jq7TOr8xj5.png",
                page: "/pages/Subway/Subway",
                payment: {
                    mealSwipes: false,
                    oldGoldMeal: true,
                    foodDollar: true,
                    cash: true,
                },
                time: [
                    // 第一个是星期日
                    ["0:00", "23:59"],
                    ["0:00", "23:59"],
                    ["0:00", "23:59"],
                    ["0:00", "23:59"],
                    ["0:00", "23:59"],
                    ["0:00", "23:59"],
                    ["0:00", "23:59"],
                ],
                status: false,
                showStatus:true,
            },
            {
                name: "Chick-fil-A",
                address: "Benson University Center",
                url: "https://i.loli.net/2021/11/12/cndshbOz4MVoDU2.jpg",
                page: "/pages/chickFilA/chickFilA",
                payment: {
                    mealSwipes: false,
                    oldGoldMeal: true,
                    foodDollar: true,
                    cash: true,
                },
                time: [
                    // 第一个是星期日
                    ["7:30", "22:00"],
                    ["7:30", "22:00"],
                    ["7:30", "22:00"],
                    ["7:30", "22:00"],
                    ["7:30", "22:00"],
                    ["11:00", "22:00"],
                    false,
                ],
                status: false,
                showStatus:true,
            },
            {
                name: "Starbucks",
                address: "North Dining Hall",
                url: "https://s3.amazonaws.com/secretsaucefiles/photos/images/000/112/260/large/IMG_4506-copy.jpg?1485385027",
                page: "/pages/starbucks/starbucks",
                payment: {
                    mealSwipes: false,
                    oldGoldMeal: true,
                    foodDollar: true,
                    cash: true,
                },
                time: [
                    // 第一个是星期日
                    ["9:00", "20:00"],
                    ["7:00", "20:00"],
                    ["7:00", "20:00"],
                    ["7:00", "20:00"],
                    ["7:00", "20:00"],
                    ["7:00", "20:00"],
                    ["9:00", "20:00"],
                ],
                status: false,
                showStatus:true,
            },
            {
                name: "North Pit",
                address: "North Dining Hall",
                url: "https://dining.wfu.edu/wp-content/uploads/2019/10/111-Philip-Gabriel-Photography-Aramark-HT-WakeForest-2.27.18-2100x900-c-default.jpg",
                page: "/pages/NorthPit/NorthPit",
                payment: {
                    mealSwipes: true,
                    oldGoldMeal: false,
                    foodDollar: true,
                    cash: true,
                },
                time: [
                    // 第一个是星期日
                    ["10:00", "21:00"],
                    ["7:00", "21:00"],
                    ["7:00", "21:00"],
                    ["7:00", "21:00"],
                    ["7:00", "20:00"],
                    ["7:00", "20:00"],
                    ["10:00", "21:00"],
                ],
                status: false,
                showStatus:true,
            },
            {
                name: "Pit",
                address: "Reynolda Hall Ground Floor",
                url: "https://dining.wfu.edu/wp-content/uploads/2021/02/Breakfast-Chef-400x0-c-default.jpg",
                page: "/pages/Pit/Pit",
                payment: {
                    mealSwipes: true,
                    oldGoldMeal: false,
                    foodDollar: true,
                    cash: true,
                },
                time: [
                    // 第一个是星期日
                    ["9:00", "21:00"],
                    ["7:00", "21:00"],
                    ["7:00", "21:00"],
                    ["7:00", "21:00"],
                    ["7:00", "20:00"],
                    ["7:00", "20:00"],
                    ["9:00", "21:00"],
                ],
                status: false,
                showStatus:true,
            },
            {
                name: "Magnolia Room",
                address: "Reynolda Hall Second Floor",
                url: "https://images.squarespace-cdn.com/content/v1/602c9aa15ca0a203f2d91a73/1623899120481-Y4L7IAJ51W6DTDPEH9NB/image-asset-2.jpg?format=1000w",
                page: "/pages/MagnoliaRoom/MagnoliaRoom",
                payment: {
                    mealSwipes: true,
                    oldGoldMeal: false,
                    foodDollar: true,
                    cash: true,
                },
                time: [
                    // 第一个是星期日
                    false,
                    ["11:00", "13:30"],
                    ["11:00", "13:30"],
                    ["11:00", "13:30"],
                    ["11:00", "13:30"],
                    ["11:00", "13:30"],
                    false,
                ],
                status: false,
                showStatus:true,
            },
            {
                name: "Einstein Bros Bagels",
                address: "Farrell Hall Ground Floor",
                url: "https://i.loli.net/2021/11/12/MhLG32sdubAKQgt.jpg",
                page: "/pages/EinsteinBrosBagels/EinsteinBrosBagels",
                payment: {
                    mealSwipes: false,
                    oldGoldMeal: true,
                    foodDollar: true,
                    cash: true,
                },
                time: [
                    // 第一个是星期日
                    ["11:00", "17:00"],
                    ["7:00", "18:00"],
                    ["7:00", "18:00"],
                    ["7:00", "18:00"],
                    ["7:00", "18:00"],
                    ["7:00", "16:00"],
                    false,
                ],
                status: false,
                showStatus:true,
            },
            {
                name: "Camino Bakery",
                address: "ZSR Library Ground Floor",
                url: "https://wfuogb.com/wp-content/uploads/2020/09/Camino1-1-scaled-1-900x675.jpeg",
                page: "/pages/CaminoBakery/CaminoBakery",
                payment: {
                    mealSwipes: false,
                    oldGoldMeal: true,
                    foodDollar: true,
                    cash: true,
                },
                time: [
                    // 第一个是星期日
                    ["11:00", "12:00"],
                    ["7:30", "23:59"],
                    ["7:30", "23:59"],
                    ["7:30", "23:59"],
                    ["7:30", "23:59"],
                    ["7:30", "17:00"],
                    ["12:00", "17:00"],
                ],
                status: false,
                showStatus: true,
            },
            {
                name: "Legal Grounds Café",
                address: "Worrell Professional Center",
                url: "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1024-512,f_auto,q_auto:best/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p.jpg",
                page: "/pages/LegalGroundsCafé/LegalGroundsCafé",
                payment: {
                    mealSwipes: false,
                    oldGoldMeal: true,
                    foodDollar: true,
                    cash: true,
                },
                time: [
                    // 第一个是星期日
                    false,
                    ["8:00", "15:00"],
                    ["8:00", "15:00"],
                    ["8:00", "15:00"],
                    ["8:00", "15:00"],
                    ["8:00", "15:00"],
                    false,
                ],
                status: false,
                showStatus:true,
            },
            {
                name: "Shorty's",
                address: "Benson University Center",
                url: "https://pbs.twimg.com/media/D3UedXiWwAc2PmQ.jpg",
                page: "/pages/Shorty/Shorty",
                payment: {
                    mealSwipes: false,
                    oldGoldMeal: true,
                    foodDollar: true,
                    cash: true,
                },
                time: [
                    // 第一个是星期日
                    ["16:00", "21:00"],
                    ["11:00", "21:00"],
                    ["11:00", "21:00"],
                    ["11:00", "21:00"],
                    ["11:00", "21:00"],
                    ["11:00", "21:00"],
                    ["16:00", "21:00"],
                ],
                status: false,
                showStatus:true,
            },
            {
                name: "Bento Sushi",
                address: "Benson University Center",
                url: "https://thegatewayonline.ca/wp-content/uploads/2018/09/BENTO-1.jpg",
                page: "/pages/Bento/Bento",
                payment: {
                    mealSwipes: false,
                    oldGoldMeal: false,
                    foodDollar: true,
                    cash: true,
                },
                time: [
                    // 第一个是星期日
                    ["11:00", "22:00"],
                    ["11:00", "22:00"],
                    ["11:00", "22:00"],
                    ["11:00", "22:00"],
                    ["11:00", "22:00"],
                    ["11:00", "22:00"],
                    false,
                ],
                status: false,
                showStatus:true,
            },
            {
                name: "Forest Greens",
                address: "Benson University Center",
                url: "https://jojorecipes.com/assets/img/recipes/acai-bowl.jpg",
                page: "/pages/ForestGreens/ForestGreens",
                payment: {
                    mealSwipes: false,
                    oldGoldMeal: true,
                    foodDollar: true,
                    cash: true,
                },
                time: [
                    // 第一个是星期日
                    ["11:00", "22:00"],
                    ["11:00", "22:00"],
                    ["11:00", "22:00"],
                    ["11:00", "22:00"],
                    ["11:00", "22:00"],
                    ["11:00", "22:00"],
                    ["11:00", "22:00"],
                ],
                status: false,
                showStatus:true,
            },
            {
                name: "Yamas Mediterranean Street Food",
                address: "Benson University Center",
                url: "https://i.loli.net/2021/11/12/gd8HcXSaIk3ZCOy.png",
                page: "/pages/Yamas/Yamas",
                payment: {
                    mealSwipes: false,
                    oldGoldMeal: true,
                    foodDollar: true,
                    cash: true,
                },
                time: [
                    // 第一个是星期日
                    ["11:00", "22:00"],
                    ["11:00", "22:00"],
                    ["11:00", "22:00"],
                    ["11:00", "22:00"],
                    ["11:00", "22:00"],
                    ["11:00", "22:00"],
                    ["11:00", "22:00"],
                ],
                status: false,
                showStatus:true,
            },
            {
                name: "336 Market",
                address: "Benson University Center",
                url: "https://i.loli.net/2021/11/12/54dNItHcq9V2D1f.jpg",
                page: "/pages/336Market/336Market",
                payment: {
                    mealSwipes: false,
                    oldGoldMeal: false,
                    foodDollar: true,
                    cash: true,
                },
                time: [
                    // 第一个是星期日
                    ["11:00", "22:00"],
                    ["8:00", "22:00"],
                    ["8:00", "22:00"],
                    ["8:00", "22:00"],
                    ["8:00", "22:00"],
                    ["8:00", "22:00"],
                    ["11:00", "22:00"],
                ],
                status: false,
                showStatus:true,
            },
            {
                name: "Village Juice",
                address: "North Dining Hall",
                url: "https://i.loli.net/2021/11/12/EucK3lRjtqaxmW1.jpg",
                page: "/pages/VillageJuice/VillageJuice",
                payment: {
                    mealSwipes: false,
                    oldGoldMeal: true,
                    foodDollar: true,
                    cash: true,
                },
                time: [
                    // 第一个是星期日
                    ["11:00", "20:00"],
                    ["11:00", "20:00"],
                    ["11:00", "20:00"],
                    ["11:00", "20:00"],
                    ["11:00", "20:00"],
                    ["11:00", "20:00"],
                    ["11:00", "20:00"],
                ],
                status: false,
                showStatus:true,
            },
            {
                name: "P.O.D. Market",
                address: "North Dining Hall",
                url: "https://i.loli.net/2021/11/12/1aSfEJUxBmhsjg7.jpg",
                page: "/pages/P.O.D.Market/P.O.D.Market",
                payment: {
                    mealSwipes: false,
                    oldGoldMeal: false,
                    foodDollar: true,
                    cash: true,
                },
                time: [
                    // 第一个是星期日
                    ["9:00", "20:00"],
                    ["8:00", "20:00"],
                    ["8:00", "20:00"],
                    ["8:00", "20:00"],
                    ["8:00", "20:00"],
                    ["8:00", "20:00"],
                    ["9:00", "20:00"],
                ],
                status: false,
                showStatus:true,
            },
        ],

        navHeight: '',
        menuButtonInfo: {},
        searchMarginTop: 0, // 搜索框上边距
        searchWidth: 0, // 搜索框宽度
        searchHeight: 0, // 搜索框高度
        //设定时间
        //相关参考资料：https://developers.weixin.qq.com/community/develop/doc/0000a4390c4f706f79fa0e6755bc00
        todHours: myDate.getHours(),
        todMinutes: myDate.getMinutes(),
        todSeconds: myDate.getSeconds(),
        todWeekD: myDate.getDay(),
    },
    
    filterPayment:function(e){
        var payment=e.currentTarget.dataset.payment;
        console.log(payment);
        var eateries=this.data.eateries;
        for(var i=0;i<eateries.length;i++){
            if(payment!=this.data.chosenPayment){
                eateries[i].showStatus=true;
            }
            if(!eateries[i].payment[payment]){
                eateries[i].showStatus=!eateries[i].showStatus;
            }
        }
        if(payment!=this.data.chosenPayment){
            var chosenPayment=payment;
        }
        else{
            var chosenPayment="";
        }
        console.log(this.data.chosenPayment);
        this.setData({
            eateries,
            chosenPayment
        })
    },

    // 生命周期函数--监听页面加载
    onLoad: function (options) {
        // 以下是获取用户名称code
        let userName = wx.getStorageSync('userName') || 'N/A';
        console.log("用户名称: " + userName)
        if (userName === 'N/A') {
          this.setData({ userName : "" })
        } else {
          this.setData({ userName : userName + ", " })
        }
        // 以下是用户授权登录的code
        var openid = wx.getStorageInfo('openId');

        // 以下是HomePage主要内容js
        var currentTime = new Date().getHours();
        var sentences = "";
        if(currentTime>=0&&currentTime<=5){
            this.setData({ userName : "" })
            sentences="赶due的苦，夜宵来补";
        }
        else if(currentTime>=6&&currentTime<=11){
            sentences="早饭要吃好喔";
        }
        else if(currentTime>=18&&currentTime<=23){
            sentences="早休息啦~";
        } else {
            this.setData({ userName : "" })
            sentences="美食与温暖，我们都有";
        }
        this.setData({
            menuButtonInfo: wx.getMenuButtonBoundingClientRect(),
            sentences:sentences
        })
        console.log(this.data.menuButtonInfo)
        const {
            top,
            width,
            height,
            right
        } = this.data.menuButtonInfo
        wx.getSystemInfo({
            success: (res) => {
                const {
                    statusBarHeight
                } = res
                const margin = top - statusBarHeight
                this.setData({
                    navHeight: (height + statusBarHeight + (margin * 2)),
                    searchMarginTop: statusBarHeight + margin, // 状态栏 + 胶囊按钮边距
                    searchHeight: height, // 与胶囊按钮同高
                    searchWidth: right - width // 胶囊按钮右边坐标 - 胶囊按钮宽度 = 按钮左边可使用宽度
                })
            },
        })
        var eateries = this.data.eateries;
        for (var i = 0; i < eateries.length; i++) {
            var time = eateries[i].time[myDate.getDay()];
            if(time!=false){
                var startTime = new Date(),
                endTime = new Date();
            startTime.setHours(time[0].split(":")[0]);
            startTime.setMinutes(time[0].split(":")[1]);
            startTime.setSeconds(0);
            endTime.setSeconds(0);
            endTime.setHours(time[1].split(":")[0]);
            endTime.setMinutes(time[1].split(":")[1]);
            //    console.log(startTime+" "+endTime);
            if (myDate >= startTime && myDate <= endTime) {
                eateries[i].status = true;
            }
            eateries[i].endTime = `${endTime.getHours().toString().padStart(2,'0')}:${endTime.getMinutes().toString().padStart(2,'0')}`;
            eateries[i].startTime = `${startTime.getHours().toString().padStart(2,'0')}:${startTime.getMinutes().toString().padStart(2,'0')}`;
            }
            else{
                eateries[i].status=false;
            }
           
            var tomorrowTime=eateries[i].time[myDate.getDay()%7];
            if(tomorrowTime==false){
                eateries[i].tomorrowStartTime="明日不营业";
            }
            else{
            var tomorrowStartTime = new Date()
            tomorrowStartTime.setHours(tomorrowTime[0].split(":")[0]);
            tomorrowStartTime.setMinutes(tomorrowTime[0].split(":")[1]);
            tomorrowStartTime.setSeconds(0);
            eateries[i].tomorrowStartTime = `到${tomorrowStartTime.getHours().toString().padStart(2,'0')}:${tomorrowStartTime.getMinutes().toString().padStart(2,'0')}开门`;
            }
            
        }
        this.setData({
            eateries: eateries
        })

    },

})