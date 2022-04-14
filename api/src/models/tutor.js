const mongoose = require('mongoose')

const tutorSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    info: {
        grade: [ String ],
        course: [ String ]
    },
    rating: {
        type: Number,
        mix: 0,
        max: 5
    }
})

module.exports = mongoose.model('Tutor', tutorSchema)