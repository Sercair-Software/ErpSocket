const ChatRoomEntity = require('../entities/chatRoom')
const UserEntity = require('../entities/user')

exports.createRoom = async (data) => {
    await data.save();
    return data
}