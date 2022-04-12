const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    text: String,
    time: Date
})

module.exports = mongoose.model('Message', messageSchema)