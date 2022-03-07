const mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    contract: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contract",
        required: true,
    },
    tutor: { //given by ttr
        review: String,
        rating: {
            type: Number,
            mix: 0,
            max: 5
        }
    },
    student: { //given by std
        review: String,
        rating: {
            type: Number,
            mix: 0,
            max: 5
        }
    }
})

module.exports = mongoose.model('Feedback', feedbackSchema)