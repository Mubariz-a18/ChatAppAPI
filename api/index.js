const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose  = require("mongoose")
const UserRoutes = require('./routes/userRoutes')
const MessageRoutes = require('./routes/messageRoute')
const socket = require('socket.io');


const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())

app.use("/api/auth",UserRoutes);
app.use("/api/messages",MessageRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("mongoose is connected"))
.catch((e)=> console.log(e))

const server = app.listen(process.env.PORT, ()=>{
    console.log(`server is started on port ${process.env.PORT}`)
})

const io = socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true
    }
})

global.onlineUsers = new Map();

io.on("connection",(socket)=>{
    global.chatSocket = socket
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id)
    })

    socket.on('send-msg',(data)=>{
        const sendUserSocket = onlineUsers.get(data.to)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data.message)
        }
    })
})