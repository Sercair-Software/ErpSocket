const mongoose = require('mongoose');
const departmentSchema = new mongoose.Schema({
    DepartmentId:{
        type:Number,
        require:true
    },
    DepartmentName:{
        type:String,
        require:true
    }
})
module.exports = mongoose.model('Department', departmentSchema);
