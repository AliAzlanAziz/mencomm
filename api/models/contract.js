import mongoose from 'mongoose'

const contractSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tutor: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    student: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Post,
        required: true,
    },
    created_on: Date,
    feedback: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Feedback
    },
})

export default mongoose.model('Contract', contractSchema)