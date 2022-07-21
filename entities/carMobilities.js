const mongoose = require('mongoose');
const Car = require('./car')
const Date = require('./date')

const CarMobilitiy = new mongoose.Schema({
    CarId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Car,
        required: true
    },
    DatesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Date,
        required: true
    },
    uniqueId:{
        type:String,
        required: true
    },
    imei:{
        type:String,
        required: true
    },
    plate:{
        type:String,
        required: true
    },
    displayName:{
        type:String,
        required: true
    },
    status:{
        type:Number,
        required: true
    },
    eventTimeStr:{
        type:String,
        required: true
    },
    speed:{
        type:Number,
        required: true
    },
    speed_distance_type:{
        type:Number,
        required: true
    },
    distance:{
        type:Number,
        required: true
    },
    distanceMultiplier:{
        type:Number,
        required: true
    },
    dailyDistance:{
        type:Number,
        required: true
    },
    latitude:{
        type:Number,
        required: true
    },
    longitude:{
        type:Number,
        required: true
    },
    ignition:{
        type:Number,
        required: true
    },
    ignitionTimeStr:{
        type:String,
        required: true
    },
    course:{
        type:Number,
        required: true
    },
    address:{
        type:String,
        required: true
    },
    statusExplain:{
        type:String,
        required: true
    },
    visible:{
        type:Boolean,
        required: true
    },
 })

 module.exports = mongoose.model("CarMobility", CarMobilitiy)