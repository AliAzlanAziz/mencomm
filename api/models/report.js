import mongoose from 'mongoose'

const reportSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    reported: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    text: {
        type: String
    },
    time: {
        type: Date,
        default: new Date.now()
    }
})

export default mongoose.model('Report', reportSchema)