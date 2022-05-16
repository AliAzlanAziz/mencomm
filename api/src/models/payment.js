const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    from: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    to: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Payment', paymentSchema)