var mongoose = require('mongoose');

var car = new mongoose.Schema({ 
    CarId: {
        type: Number,
        require: false,
        default:0
    },
    plaka: {
        type: String,
        default: ""
    },
    brand: {
        type: String,
        default: ""
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        require: true
    },
    time: {
        type: Date,
        require: true
    },
    SelledDate: {
        type: Date,
        require: false,
        default:()=>{
            return new Date();
        }
    },
    inspectionRangeKM: {
        type: Number,
        require: true
    },
    inspectionRangeMonth: {
        type: Number,
        require: true
    },
    maintanceRangKM: {
        type: Number,
        require: true
    },
    maintanceRangMonth: {
        type: Number,
        require: true
    },
    isActive: {
        type: Boolean,
        require: true,
        default:true
    },
    isRent: {
        type: Boolean,
        require: true
    },
    RentEnd: {
        type: Date,
        require: false,
        default:()=>{
            return new Date();
        }
    },
    RentHref: {
        type: String,
        default: ""
    },
    RentStart: {
        type: Date,
        require: false,
        default:()=>{
            return new Date();
        }
    },
    RentKm: {
        type: Number,
        require: false,
        default:0
    },
    RentPrice: {
        type: Number,
        require: false,
        default:0
    },
    RentFinishKm: {
        type: Number,
        require: false,
        default:0
    },
    isTrack: {
        type: Boolean,
        require: true
    },
    K2Href: {
        type: String,
        default: ""
    },
    BrandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Firm",
        require: true
    },
    model: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model("Car", car)