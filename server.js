const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
const dbcon = process.env.local_mongodb_con
mongoose.connect(dbcon, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const con = mongoose.connection
if (!con) console.log('Mongo DB connection failed')
else console.log('Mongo DB connection succesfully')

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
})

const ChatRoomFunction = require('./functions/chatRoomFunction')
const ChatRoomMessageFunction = require('./functions/chatRoomMessajeFunction')
const ChatRoomEntity = require('./entities/chatRoom')
io.on("connection", (socket) => {
    console.log("User Connected ", socket.id)

    socket.on("create_room", async (data) => {
        const model = new ChatRoomEntity({
            name: 'DM',
            participants: [data.me, data.you]
        })
        await socket.join(model._id)
        socket.emit('create_room_response', model);
        await ChatRoomFunction.createRoom(model)
    })

    socket.on("start_chat", (roomId) => {
        socket.join(roomId)
        console.log("chat started, code : " + roomId)
    })

    socket.on("send_message", (data) => {
        console.log(data)
        socket.to(data.roomId).emit('receive_message', data);
        ChatRoomMessageFunction.createMessage(data)
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected ", socket.id)
    })
})

server.listen(3002, () => {
    console.log('Server running on port : ', 3002)
})