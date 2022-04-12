const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        alias: 'id'
    },
    user_type: { 
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fee: {
        type: Number,
        required: true
    }, 
    grade: {
        type: String,
        required: true
    }, //feature
    course: {
        type: String,
        required: true
    }, //feature
    tuition_type: String, //feature
    location: { //feature for nearbies
        address: String,
        longitude: Number,
        latitude: Number
    },
    start_date: { 
        type: Date
    },
    schedule: [
        {
            day: String,
            start_time: Date,
            end_time: Date,
        }
    ],
    description: String,
    created_on: Date, //could be a feature
    requests: [ //could be a feature
        {
            user: { 
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            isAccepted: {
                type: Boolean,
                default: false
            },
            time_requested: {
                type: Date
            },
            time_accepted: {
                type: Date
            }
        }
    ],
    announcements: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            description: String,
            time: Date
        }
    ],
    content: String
})

module.exports = mongoose.model('Post', postSchema)