// 云函数入口函数
exports.main = async (event, context) => {
    if(event.action =="collect"){ //如果是评论
    return cloud.database().collection("comments")
    .doc('chickFillA')
    .update({
      data:{
        collect:event.collect
      }
    })
  }
}