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
        var doc = new dom().parseFromString(res)
        var nodes = select(doc, '//div[@class="cell"]')
        var result_list = []
        for (var i = 0; i < nodes.length; i++) {
          var node = nodes[i]
          var dining_name =  select(node, './h2/text()')[0].data.trim()
          var enter_count = select(node, './p[1]/span/text()')[0].data.trim()
          var occupancy = select(node, './p[2]/text()')[0].data.trim()
          result_list.push({
            dining_name: dining_name,
            enter_count: enter_count,
            occupancy: occupancy
          })
        }
        resolve({
          result: result_list
        })
      })
  })
}

// 云函数入口函数
exports.main = async (event, context) => {
  return await getDiningOccupancy()
}