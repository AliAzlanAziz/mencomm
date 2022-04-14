const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    description: String,
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    contract: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    time: Date,
    read: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Notification', notificationSchema)