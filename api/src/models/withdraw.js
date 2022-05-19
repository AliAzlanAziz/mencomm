const mongoose = require('mongoose')

const withdrawSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    pending: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Withdraw', withdrawSchema)