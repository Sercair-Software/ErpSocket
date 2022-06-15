const mongoose = require('mongoose');
const User = require('./user')
const chatRoom = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    participants: {
        type: [],
    }
})
module.exports = mongoose.model('chatRooms', chatRoom);