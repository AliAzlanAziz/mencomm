const mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tutor: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    student: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    tutor_feedback: {
        review: String,
        rating: {
            type: Number,
            mix: 0,
            max: 5
        }
    },
    student_feedback: {
        review: String,
        rating: {
            type: Number,
            mix: 0,
            max: 5
        }
    }
})

module.exports = mongoose.model('Feedback', feedbackSchema)