const mongoose = require('mongoose');
const Car = require('./car')
const Date = require('./date')

const carKM = new mongoose.Schema({
    CarKmId: {
        type: Number,
        require: false,
        default:0
    },
    CarId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Car,
        require: true
    },
    DatesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Date,
        require: true
    },
    KM: {
        type: Number,
        require: true
    }
 })

 module.exports = mongoose.model("CarKM", carKM)