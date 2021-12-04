import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tag: { //consider field name
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    fee: Number,
    grade: String,
    course: String,
    tuition_type: String,
    location: {
        address: String,
        longitude: Number,
        latitude: Number
    },
    start_date:{
        type: Date
    },
    schedule: [
        {
            day: String,
            start_time: Date,
            end_time: Date,
        }
    ],
    capacity: Number,
    description: String,
    requests: [
        {
            user: { 
                type: mongoose.Schema.Types.ObjectId,
                ref: User
            },
            isAccepted: {
                type: Boolean,
                default: false
            },
            time_accepted: {
                type: Date
            }
        }
    ],
    announcements: [
        {
            message: String,
            time: Date
        }
    ]
})

export default mongoose.model('Post', postSchema)