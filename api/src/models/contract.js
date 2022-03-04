const mongoose = require('mongoose')

const contractSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tutor: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    student: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    feedback: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feedback"
    },
    created_on: Date,
    confirmed: {
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model('Contract', contractSchema)