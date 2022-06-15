var mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const Branch = require("./branch");
const Department = require("./department");

var userSchema = new mongoose.Schema({
    UserId: {
        type: Number,
        require: true
    },
    Name: {
        type: String,
        require: true
    },
    Email: {
        type: String,
        require: true,
        unique: true
    },
    Phone: {
        type: String,
        default: "",
    },
    Password: {
        type: String,
        require: true,
    },
    BranchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Branch,
        require: true
    },
    DepartmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Department,
        require: true
    },
    color: {
        type: String,
        default: ""
    },
    RequestAuth: {
        type: Boolean,
        require: true,
    },
    bloodGroup: {
        type: String,
        default: ""
    },
    officeTel: {
        type: String,
        default: ""
    },
    urgent: {
        type: String,
        default: ""
    },
    urgetName: {
        type: String,
        default: ""
    },
    DateOfSWorking: {
        type: Date,
        default: () => {
            return new Date();
        }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    TC: {
        type: String,
        default: ""
    },
    LeavingDate: {
        type: Date,
        require: false
    },
    Title: {
        type: String,
        default: ""
    },
    Href: {
        type: String,
        default: ""
    },
    childCount: {
        type: Number,
        default: 0
    },
    isMarried: {
        type: Boolean,
        default: false
    },
    marriedDate: {
        type: Date,
        require: false
    },
    isBuyer: {
        type: Boolean,
        default: false
    },
    GroupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserGroup',
        require: true,
        default: mongoose.Types.ObjectId('6244009d1219f442d843ae23')
    }
})
//Pre Hooks
userSchema.pre("save", function (next) {
    //Password değişmediği sürece her save işleminde tekrar tekrar password'ü kriptolama! Update işlemi de bir save() işlemi yapar
    if (!this.isModified("Password")) next();
    // salt raund sayısı 10 verildi ve salt isleminden donen sonuc tekrar hash'leme işleminde kullanıldı
    // yani crypto işlemi iç içe 2 tane callbacks içerisinde 2 kademeli olarak yapılır.
    bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err);
        bcrypt.hash(this.Password, salt, (err, hash) => {
            if (err) next(err);
            this.Password = hash;
            next();
        })
    })
});
module.exports = mongoose.model('User', userSchema);