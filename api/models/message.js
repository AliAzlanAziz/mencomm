import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    text: String
})

export default mongoose.model('Message', messageSchema)