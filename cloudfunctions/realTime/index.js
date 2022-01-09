//引入request-promise用于做网络请求
var request = require('request-promise'),
  select = require('xpath.js'),
  dom = require('xmldom').DOMParser,
  cloud = require('wx-server-sdk')

/**
/*对Date的扩展，将 Date 转化为指定格式的String
/* 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
/* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
/* 例子：
/* (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2019-01-02 10:19:04.423
/* (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2019-1-2 10:19:4.18
*/
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

function getDiningOccupancy() {
  return new Promise((resolve, reject) => {
    request({
        url: 'https://services.is.wfu.edu/dining-occupancy/',
        method: "GET"
      })
      .then(res => {
        var pattern = /Occupancy (\d+) \/ Max (\d+)/
        var doc = new dom().parseFromString(res)
        var nodes = select(doc, '//div[@class="cell"]')
        var result = {}
        for (var i = 0; i < nodes.length; i++) {
          var node = nodes[i]
          var dining_name = select(node, './h2/text()')[0].data.trim()
          var enter_count = select(node, './p[1]/span/text()')[0].data.trim()
          var occupancy = select(node, './p[2]/text()')[0].data.trim()
          var compile_result = pattern.exec(occupancy)
          // var occupancy_percent = Math.round(compile_result[1] / compile_result[2] * 100)
          var occupancy_percent = (compile_result[1] / compile_result[2] * 100).toFixed(2)
          result[dining_name.replace(/\s*/g, "")] = {
            dining_name: dining_name,
            enter_count: enter_count,
            occupancy: occupancy,
            occupancy_percent: occupancy_percent
          }
        }
        resolve(result)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function runFuncAndWhenErrorRetry(func, retry_times, retry_delay) {
  var current_retry_count = 1
  return new Promise((resolve, reject) => {
    function attempt() {
      func()
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          console.log(`请求失败，正在重试，第 ${current_retry_count} 次，共 ${retry_times} 次`)
          current_retry_count++
          if (current_retry_count > retry_times) {
            reject(err)
          } else {
            setTimeout(attempt(), retry_delay)
          }
        })
    }
    attempt()
  })

}

// 云函数入口函数
exports.main = async (event, context) => {
  // return await getDiningOccupancy(0)
  var diningOccupancy = await runFuncAndWhenErrorRetry(
    func = getDiningOccupancy,
    retry_times = 10,
    retry_delay = 2000
  )
  var now_time = new Date()
  diningOccupancy['updated_time'] = now_time.Format('yyyy-MM-dd HH:mm:ss')
  return await db.collection('diningOccupancy').doc('lastDiningOccupancy').set({
    data: diningOccupancy
  })
}