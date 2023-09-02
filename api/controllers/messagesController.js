const Message = require("../models/messageModel");

module.exports.addMessage  = async (req, res, next)=>{
    try {
        const {from,to,message}= req.body;
        const data = await Message.create({
            message:{
                text:message,
            },
            users:[from,to],
            sender:from,
        })


        if(data){
            return res.json({msg:"message added success"})
        }else{
            return res.json({msg:"message added failed"})
        }
    }
     catch (error) {
        next(error)
    }
}

module.exports.getAllMessages  = async (req, res, next)=>{
    try {
        const {from,to} = req.body;
        const messages = await Message.find({
            users:{
                $all:[from ,to]
            }
        }).sort({updatedAt:1});

        const projectedMsgs = messages.map((msg)=>{
            return {
                fromSelf:msg.sender.toString() === from,
                message:msg.message.text
            }
            
        })
        res.json(projectedMsgs)
    } catch (error) {
        next(error)
    }
}