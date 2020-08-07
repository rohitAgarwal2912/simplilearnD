const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const userSchema = Schema({
    name: {
        type: String
    },
    phoneNumber: {
        type: String,
        unique:true
    },
    password: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String,
        unique:true
    },
    otp: {
        type: String
    },
    createdBy: {
        type: Schema.ObjectId,
        ref: 'user'
    },
    updatedBy: {
        type: Schema.ObjectId,
        ref: 'user'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    },
    enabled: {
        type: Number,
        default: 1
    }
    
})
module.exports = mongoose.model('user', userSchema);