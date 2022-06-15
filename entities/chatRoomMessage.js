const mongoose = require('mongoose');
const User = require('./user')
const ChatRoom = require('./chatRoom')
const chatRoomMessage = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ChatRoom,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    clock: {
        type: String,
        required: true
    },
    seen: {
        type: Boolean,
        required: true
    },
    seenDT: {
        type: Date,
        required: false
    },
    seenClock: {
        type: String,
        required: false
    },
    isImageMsg: {
        type: Boolean,
        required: true
    },
    isSoundMsg: {
        type: Boolean,
        required: true
    },
    isFileMsg: {
        type: Boolean,
        required: true
    }
})
module.exports = mongoose.model('chatRoomMessages', chatRoomMessage);