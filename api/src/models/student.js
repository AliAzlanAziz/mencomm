const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    info: {
        grade: String,
        course: [ String ]
    },
    rating: {
        type: Number,
        mix: 0,
        max: 5
    },
    tuition_type: String
})

module.exports = mongoose.model('Student', studentSchema)