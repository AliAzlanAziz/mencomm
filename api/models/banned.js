import mongoose from 'mongoose'

const reportSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    start: {
        type: Date
    },
    end: {
        type: Date,
    },
    text: {
        type: String
    }
})

export default mongoose.model('Report', reportSchema)