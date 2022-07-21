var mongoose = require('mongoose');

var date = new mongoose.Schema({ 
    DatesId: {
        type: Number,
        require: true,
        default:0
    },
    Date: {
        type: Date,
        require: true
    }
})

module.exports = mongoose.model("Date", date)