const ChatRoomMessageEntity = require('../entities/chatRoomMessage')
const UserEntity = require('../entities/user')

exports.createMessage = async (data) => {
    const model = new ChatRoomMessageEntity({
        roomId: data.roomId,
        sender: data.sender,
        receiver: data.receiver,
        time : data.time,
        clock : data.clock,
        seen: data.seen,
        message: data.message,
        isImageMsg: data.isImageMsg,
        isSoundMsg: data.isSoundMsg,
        isFileMsg: data.isFileMsg
    })
    await model.save();
    return model
}