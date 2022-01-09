// 云函数入口文件
const cloud = require('wx-server-sdk')
const JSONPath = require('JSONPath');
var lodash = require('lodash');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database();

function filter_search(dinningHallName, search_key, data_list) {
    var result_list = []
    var pattern = new RegExp(`.*${search_key}.*`, "i");
    for (var i = 0; i < data_list.length; i++) {
        if (pattern.test(data_list[i])) {
            result_list.push({
                text: data_list[i],
                value: dinningHallName
            })
        }
    }
    return lodash.unionBy(result_list, 'text')
}

// 云函数入口函数
exports.main = async (event, context) => {
    // 获取当前日期
    var date = new Date()
    var today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    today = "2021-11-01"
    // 异步任务列表
    var task_list = []
    // 搜索结果列表
    var searchResultList = []

    // 在固定餐厅的菜单中查询
    task_list.push(db.collection('dinningHall')
        .get()
        .then(res => {
            res.data.forEach(function (currentValue) {
                searchResultList.push(...filter_search(currentValue['_id'], event.searchKey, currentValue['foodList']))
                // 如果餐厅名称也符合，则将餐厅名称加入搜索结果中
                var pattern = new RegExp(`.*${event.searchKey}.*`, "i");
                if (pattern.test(currentValue['_id'])) {
                    searchResultList.push({
                        text: currentValue['_id'],
                        value: currentValue['_id']
                    })
                }
            })
        })
    )

    // 在当天菜单中查询
    var dinningHallList = ['NorthPitMenu','Pit']
    dinningHallList.forEach(function (currentValue) {
        task_list.push(db.collection(currentValue)
            .where({
                _id: today
            })
            .get()
            .then(res => {
                var food_list = JSONPath({
                    json: res.data,
                    path: '$.*.*.*.*'
                });
                searchResultList.push(...filter_search(currentValue, event.searchKey, food_list))
            })
        )
    })
    // 等待每一项异步任务结束
    for (var i = 0; i < task_list.length; i++) {
        await task_list[i]
    }
    return searchResultList
}

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