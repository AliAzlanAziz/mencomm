import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
        max: new Date.now()
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
    }
})

export default mongoose.model('User', userSchema)