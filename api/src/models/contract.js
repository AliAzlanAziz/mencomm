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
    ttr_feedback: { //given by ttr
        review: String,
        rating: {
            type: Number,
            required: true,
            mix: 0,
            max: 5
        }
    },
    std_feedback: { //given by std
        review: String,
        rating: {
            type: Number,
            required: true,
            mix: 0,
            max: 5
        }
    },
    created_on: Date,
})

module.exports = mongoose.model('Contract', contractSchema)