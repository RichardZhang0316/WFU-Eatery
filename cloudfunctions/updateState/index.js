const cloud = require("wx-server-sdk")
cloud.init(
  //{env:'cloud1-9g617xow636319d2'}
)

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try{
    return await db.collection("comments").doc(event.id)
    .update({
      data:{
        commentList:event.commentList,
       //commentList:{"content":"wowowow","userName":"Anomynous user"},
      }
    })
  }catch(e){
    console.error(e)
  }
}