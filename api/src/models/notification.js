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
    action: {
        type: String,
        enum: [ '1', '2', '3', '4' ]
    },
    url: {
        type: String,
    },
    time: {
        type: Date,
        default: new Date.now()
    },
    is_read: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Notification', notificationSchema)