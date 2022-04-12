const mongoose = require('mongoose')

const reportSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    reported_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    reported_post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    description: String,
    time: Date,
})

module.exports = mongoose.model('Report', reportSchema)