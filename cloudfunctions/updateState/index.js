const cloud = require("wx-server-sdk")
cloud.init(
  //{env:'cloud1-9g617xow636319d2'}
)

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  //取得传过来的参数, 可以使用{vote,id } = event 更简洁
  var vote = event.vote, id = event.id;
  console.log('云函数zan成功', vote, id)

  // console.warn(data)
  try{
    return await db.collection('ChickFillALike').doc(event.id).where({
      id: Number(id)
    }).update({
      data: {
        Up: event.Up,
        Down:event.Down,
      },
      success: res => {
        console.log('云函数成功', vote, id)
        
      },
      fail: e => {
        console.error(e)
      }
    })

    /*
    return await db.collection("comments").doc(event.id)
    .update({
      data:{
        commentList:event.commentList,
       //commentList:{"content":"wowowow","userName":"Anomynous user"},
      }
    })
    
   if(event.action=="Up"){
    return await db.collection(ChickFilAUpDown).doc(event.id).update({
      data:{
        Up:_.inc(1),
      }
    })
  }
  else if(event.action=="Down"){
    return await db.collection(ChickFilAUpDown).doc(event.id).update({
      data:{
        Down:_.inc(1),
      }
    })
  }*/

}catch(e){
    console.error(e)
  }
}