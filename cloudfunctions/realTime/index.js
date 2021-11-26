//引入request-promise用于做网络请求
var request = require('request-promise'),
  select = require('xpath.js'),
  dom = require('xmldom').DOMParser

function getDiningOccupancy() {
  return new Promise(resolve => {
    request({
        url: 'https://services.is.wfu.edu/dining-occupancy/',
        method: "GET"
      })
      .then(function (res) {
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
          var occupancy_percent = Math.round(compile_result[1] / compile_result[2] * 100)
          result[dining_name.replace(/\s*/g, "")] = {
            dining_name: dining_name,
            enter_count: enter_count,
            occupancy: occupancy,
            occupancy_percent: occupancy_percent
          }
        }
        resolve(result)
      })
  })
}

// 云函数入口函数
exports.main = async (event, context) => {
  return await getDiningOccupancy()
}