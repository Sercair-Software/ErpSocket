const mongoose = require('mongoose');
const branchSchema = new mongoose.Schema({
    BranchId:{
        type:Number,
        require:true
    },
    BranchName:{
        type:String,
        require:true
    },
    Capacity:{
        type:Number,
        require:true
    },
    Address:{
        type:String,
        require:true
    },
    City:{
        type:String,
        require:true
    },
    Country:{
        type:String,
        require:true
    },
})
module.exports = mongoose.model('Branch', branchSchema);
