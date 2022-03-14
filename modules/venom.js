const config = require("../configChatbot");
const f=(req,res)=>{
    res.status(200).send({
      message:'Hello whastapp api with dialogflow',
    })
  }
  
  module.exports={f}