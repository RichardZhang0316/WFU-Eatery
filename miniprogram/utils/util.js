const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatDate = date => {
  const day = date.getDate()

  return `${[day].map(formatNumber)}`
}

const BLD = dates=>{
  let date = new Date(dates);
  let hour=date.getHours();
  let oneDay=new Array(0,1,2);
  console.log(hour);
  if(hour<11){
    return oneDay[0];
  }
  else if(hour>=11&&hour<6){
    return oneDay[1];
  }
  else{
    return oneDay[2];
  }
}


const getWeekByDate1 = dates => {
  let show_day = new Array('sun','Mon','Tue','Wed','Thur','Fri','Sat');
  let date = new Date(dates);
  date.setDate(date.getDate());
  let day = date.getDay();
  return show_day[(day+1)%7];
}
const getWeekByDate2 = dates => {
  let show_day = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat');
  let date = new Date(dates);
  date.setDate(date.getDate());
  let day = date.getDay();
  return show_day[(day+2)%7];
}
const getWeekByDate3 = dates => {
  let show_day = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat');
  let date = new Date(dates);
  date.setDate(date.getDate());
  let day = date.getDay();
  return show_day[(day+3)%7];
}
const getWeekByDate4 = dates => {
  let show_day = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat');
  let date = new Date(dates);
  date.setDate(date.getDate());
  let day = date.getDay();
  return show_day[(day+4)%7];
}
const getWeekByDate5 = dates => {
  let show_day = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat');
  let date = new Date(dates);
  date.setDate(date.getDate());
  let day = date.getDay();
  return show_day[(day+5)%7];
}
const getWeekByDate6 = dates => {
  let show_day = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat');
  let date = new Date(dates);
  date.setDate(date.getDate());
  let day = date.getDay();
  return show_day[(day+6)%7];
}

const getTimeLastWeek1 = last => {
  const year = last.getFullYear()
  const day = last.getDate()
  const ti = day + 1
  // const dayOfWeek = last.getDay() //今天本周的第几天  
  // 判断是否月初
  if (ti <= 0) {
    const month = last.getMonth() + 1 - 1
    const d = new Date(year, month, 0)
    const dayBig = d.getDate() //获取当月的所有天数
    const ti1 = dayBig + ti
    return [ti1].map(formatNumber)
  } else {
    const month = last.getMonth() + 1
    return [ti].map(formatNumber)
  }
  // return [year, month, day].map(formatNumber).join('-')

}
const getTimeLastWeek2 = last => {
  const year = last.getFullYear()
  const day = last.getDate()
  const ti = day + 2
  // const dayOfWeek = last.getDay() //今天本周的第几天  
  // 判断是否月初
  if (ti <= 0) {
    const month = last.getMonth() + 1 - 1
    const d = new Date(year, month, 0)
    const dayBig = d.getDate() //获取当月的所有天数
    const ti1 = dayBig + ti
    return [ti1].map(formatNumber)
  } else {
    const month = last.getMonth() + 1
    return [ti].map(formatNumber)
  }
  // return [year, month, day].map(formatNumber).join('-')

}

const getTimeLastWeek3 = last => {
  const year = last.getFullYear()
  const day = last.getDate()
  const ti = day + 3
  // const dayOfWeek = last.getDay() //今天本周的第几天  
  // 判断是否月初
  if (ti <= 0) {
    const month = last.getMonth() + 1 - 1
    const d = new Date(year, month, 0)
    const dayBig = d.getDate() //获取当月的所有天数
    const ti1 = dayBig + ti
    return [ti1].map(formatNumber)
  } else {
    const month = last.getMonth() + 1
    return [ti].map(formatNumber)
  }
  // return [year, month, day].map(formatNumber).join('-')

}

const getTimeLastWeek4 = last => {
  const year = last.getFullYear()
  const day = last.getDate()
  const ti = day + 4
  // const dayOfWeek = last.getDay() //今天本周的第几天  
  // 判断是否月初
  if (ti <= 0) {
    const month = last.getMonth() + 1 - 1
    const d = new Date(year, month, 0)
    const dayBig = d.getDate() //获取当月的所有天数
    const ti1 = dayBig + ti
    return [ti1].map(formatNumber)
  } else {
    const month = last.getMonth() + 1
    return [ti].map(formatNumber)
  }
  // return [year, month, day].map(formatNumber).join('-')

}

const getTimeLastWeek5 = last => {
  const year = last.getFullYear()
  const day = last.getDate()
  const ti = day + 5
  // const dayOfWeek = last.getDay() //今天本周的第几天  
  // 判断是否月初
  if (ti <= 0) {
    const month = last.getMonth() + 1 - 1
    const d = new Date(year, month, 0)
    const dayBig = d.getDate() //获取当月的所有天数
    const ti1 = dayBig + ti
    return [ti1].map(formatNumber)
  } else {
    const month = last.getMonth() + 1
    return [ti].map(formatNumber)
  }
  // return [year, month, day].map(formatNumber).join('-')

}

const getTimeLastWeek6 = last => {
  const year = last.getFullYear()
  const day = last.getDate()
  const ti = day + 6
  // const dayOfWeek = last.getDay() //今天本周的第几天  
  // 判断是否月初
  if (ti <= 0) {
    const month = last.getMonth() + 1 - 1
    const d = new Date(year, month, 0)
    const dayBig = d.getDate() //获取当月的所有天数
    const ti1 = dayBig + ti
    return [ti1].map(formatNumber)
  } else {
    const month = last.getMonth() + 1
    return [ti].map(formatNumber)
  }
  // return [year, month, day].map(formatNumber).join('-')

}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

module.exports = {
  formatTime
}

// util.js
const formatTimeNEW = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
 
 return [year, month, day].map(formatNumberNEW).join('/') + ' ' + [hour, minute].map(formatNumberNEW).join(':')   //返回年月日，时分秒
}

const formatNumberNEW = n => {
 n = n.toString()
 return n[1] ? n : '0' + n
}

module.exports = {
 formatTimeNEW: formatTimeNEW,
 formatDate:formatDate,
 getTimeLastWeek1: getTimeLastWeek1,
 getTimeLastWeek2: getTimeLastWeek2,
 getTimeLastWeek3: getTimeLastWeek3,
 getTimeLastWeek4: getTimeLastWeek4,
 getTimeLastWeek5: getTimeLastWeek5,
 getTimeLastWeek6: getTimeLastWeek6,
 getWeekByDate1:getWeekByDate1,
 getWeekByDate2:getWeekByDate2,
 getWeekByDate3:getWeekByDate3,
 getWeekByDate4:getWeekByDate4,
 getWeekByDate5:getWeekByDate5,
 getWeekByDate6:getWeekByDate6,
 BLD:BLD,
}
// module.exports.formatTimeNEW = formatTimeNEW
// exports.formatTimeNEW = formatTimeNEW

