const mongoose = require('mongoose')

const reportSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    banned_on: {
        type: Date
    },
    text: {
        type: String
    }
})

module.exports = mongoose.model('Report', reportSchema)