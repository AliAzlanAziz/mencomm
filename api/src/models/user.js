const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        alias: 'id'
    },
    name: {
        type: String,
        required: true,
        min: 1,
        max: 256
    },
    email: { 
        type: String, 
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { 
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
    },
    location: {
        address: String,
        longitude: Number,
        latitude: Number
    },
    verified: {
        type: Boolean,
        default: false
    },
    last_login: {
        type: Date,
    },
    user_type: {
        type: String
    },
    avatar_url: {
        type: String
    },
    content: String
})

module.exports = mongoose.model('User', userSchema)