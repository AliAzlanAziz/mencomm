const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose")
const { sendmail } = require('../utils/sendMail')
const User = require('../models/user')
const Tutor = require('../models/tutor')
const Student = require('../models/student')
const { cloudinary } = require('../utils/uploadCloud')

module.exports = {
    postRegister: (req, res, next) => {
        User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if(user.length >= 1){
                return res.status(409).json({
                    message: 'Email already in use by some other user'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                        });
                    } else {
                        if(req.body.gender === "Male"){
                            let default_image = "https://cdn3.iconfinder.com/data/icons/avatar-set/512/Avatar02-512.png"
                        }else{
                            let default_image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzidRylMo4h_AvwAK5wKMYwuxBvBHK6HtF2g&usqp=CAU"
                        }
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            name: req.body.firstname + ' ' + req.body.lastname,
                            birthday: req.body.birthday,
                            gender: req.body.gender,
                            location: req.body.location,
                            avatar_url: default_image
                        });
                        user
                        .save()
                        .then(result => {
                            // console.log(result);
                            const reciever = req.body.email
                            const subject = 'Verify Account'
                            const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY) 
                            const url = `http://localhost:5000/api/v1/user/verify/${token}`;
                            const message = `Please click this link to verify your account: <a href="${url}">Verify Account</a>`
                            
                            sendmail(reciever, subject, message)
                            return res.status(201).json({
                                message: "User Created Successfully!",
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
                    }
                });
            }
        });
    },

    postLogin: (req, res, next) => {
        User.find({email: req.body.email})
        .exec()
        .then(user => { 
            if(user.length >= 1){
                if(user[0]?.verified != true){
                    return res.status(403).json({
                        message: "Verify Account First!"
                    })
                }

                bcrypt.compare(req.body.password, user[0].password, async function(err, result) {
                    if(err){
                        return res.status(403).json({
                            message: "Incorrect credentials"
                        })
                    }else if (result){
                        await User.findOneAndUpdate({email: req.body.email}, {last_login: new Date()})

                        const token = jwt.sign({ id: user[0]._id }, process.env.SECRET_KEY)
                        return res.status(200).json({
                            message: "logged in successfully",
                            token: token
                        })
                    }
                    else{
                        return res.status(403).json({
                            message: "Incorrect credentials"
                        })
                    }
                })
            }else{
                return res.status(403).json({
                    message: "Incorrect credentials"
                })
            }
        })
    },

    postResetLink: (req, res, next) => {
        User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if(user.length >= 1){
                const reciever = req.body.email
                const subject = 'Reset Password'
                const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY, { expiresIn: '12h' }) 
                const message = `Reset Token is: ${token} (Valid only for limited time)`
                
                sendmail(reciever, subject, message)
                return res.status(200).json({
                    message: "Link Sent!",
                });
            }else{
                return res.status(404).json({
                    message: 'No user exist'
                });
            }
        })
    },

    postResetPassword: (req, res, next) => {
        const hash = bcrypt.hashSync(req.body.password, 10)

        User.findOneAndUpdate({email: req.body.email}, {password: hash})
        .exec()
        .then(user => {
            if(user.email != null){
                return res.status(200).json({
                    message: "Password Reset!",
                });
            }else{
                return res.status(500).json({
                    message: "Internal Server Error",
                });
            }
        })
    },

    postUpdatePassword: (req, res, next) => {
        const hash = bcrypt.hashSync(req.body.password, 10)

        User.findById(req.id)
        .exec()
        .then(user => {
            bcrypt.compare(req.body.oldpassword, user[0].password, async function(err, result) {
                if(err){
                    return res.status(403).json({
                        message: "Incorrect old password"
                    })
                }else{
                    User.findByIdAndUpdate(req.id, {password: hash})
                    .exec()
                    .then(user => {
                        if(user.email != null){
                            return res.status(200).json({
                                message: "Password Reset!",
                            });
                        }else{
                            return res.status(500).json({
                                message: "Internal Server Error",
                            });
                        }
                    })
                }
            })
        })
    },

    getVerifyToken: (req, res, next) => {
        jwt.verify(req.params.token, process.env.SECRET_KEY, function(error, decode){
            if(error){
                return res.status(500).json({
                    message: error.message
                })
            }else{
                User.findOneAndUpdate({email: decode.email}, {verified: true})
                .exec()
                .then(user => {
                    if(user.email != null) {
                        return res.status(200).json({
                            message: 'Account Verified! You can now proceed to login'
                        })
                    }else{
                        return res.status(500).json({
                            message: "Internal Server Error"
                        })
                    }
                })
                
            }
        }) 
    },

    postSwitchRole: (req, res, next) => {
        const ruser_type = req.body.user_type
        if(ruser_type != "std" && ruser_type!= "ttr"){
            return res.status(400).json({
                message: 'Invalid Input'
            })
        }

        User.findByIdAndUpdate(req.id, {user_type: ruser_type})
        .exec()
        .then(user => {
            if(user._id == null){
                return res.status(401).json({
                    message: 'Unauthorized Access'
                })
            }
            if(ruser_type == "std"){
                Student.findOneAndUpdate({user: req.id}, {}, { upsert: true, new: true, setDefaultsOnInsert: true })
                .exec()
                .then(std => {
                    if(std._id == null){
                        return res.status(500).json({
                            message: 'Internal Server Error'
                        })
                    }else{
                        return res.status(200).json({
                            message: 'Roles Switched Successfully'
                        })
                    }
                })
            }
            if(ruser_type == "ttr"){
                Tutor.findOneAndUpdate({user: req.id}, {}, { upsert: true, new: true, setDefaultsOnInsert: true })
                .exec()
                .then(ttr => {
                    if(ttr._id == null){
                        return res.status(500).json({
                            message: 'Internal Server Error'
                        })
                    }else{
                        return res.status(200).json({
                            message: 'Roles Switched Successfully'
                        })
                    }
                })
            }
        })
    },

    postUploadImage: async (req, res, next) => {
        const fileStr = req.body.image_data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, { folder: "mencomm" });
        console.log(uploadResponse);

        User.findByIdAndUpdate(req.id, {avatar_url: uploadResponse.secure_url})
        .exec()
        .then(user => {
            if(user._id){
                return res.status(200).json({ 
                    message: "Image Uploaded Successfully",
                    avatar_url: uploadResponse.secure_url
                })
            }
        })
    },

    getEditProfile: async (req, res, next) => {
        User.findById(req.id)
        .exec()
        .then(user => { 
            if(user._id){
                return res.status(200).json({
                    avatar_url: user.avatar_url,
                    name: user.name,
                    email: user.email,
                    birthday: user.birthday,
                    location: user.location
                })
            }
        })
    },

    postEditProfile: async (req, res, next) => {
        const editProf = {
            name: req.body.name,
            birthday: req.body.birthday,
            location: req.body.location,
            email: req.body.email
        }

        User.findByIdAndUpdate(req.id, editProf)
        .exec()
        .then(user => { 
            if(user._id){
                return res.status(200).json({
                    message: "Profile Updated Successfully"
                })
            }
        })
    },
}