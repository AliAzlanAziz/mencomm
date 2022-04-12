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
                    message: 'Email already in use.'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            message: err,
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            name: req.body.firstname + ' ' + req.body.lastname,
                            birthday: req.body.birthday,
                            gender: req.body.gender,
                            location: req.body.location,
                            user_type: ''
                        });
                        user
                        .save()
                        .then(result => {
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
                                message: err
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
                bcrypt.compare(req.body.password, user[0].password, async function(err, result) {
                    if(err || !result){
                        return res.status(403).json({
                            message: "Incorrect credentials"
                        })
                    }else if(user[0]?.verified != true){
                        return res.status(403).json({
                            message: "Verify Account First!"
                        })
                    }else if (result){
                        await User.findOneAndUpdate({email: req.body.email}, {last_login: new Date()})

                        const token = jwt.sign({ id: user[0]._id }, process.env.SECRET_KEY, )
                        return res.status(200).json({
                            message: "logged in successfully",
                            token: token
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
                const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY, { expiresIn: '1h' }) 
                const url = `http://connec.com/resetpassword/${token}`
                const message = `Reset link: <a href="${url}">Click to reset password</a>`
                
                sendmail(reciever, subject, message)
                return res.status(200).json({
                    message: "Link sent to recover password!",
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

        jwt.verify(req.params.resettoken, process.env.SECRET_KEY, (error, decode) => {
            if(error){
                return res.status(401).json({
                    message: 'Invalid Token'
                })
            }

            User.findOneAndUpdate({email: decode.email}, {password: hash})
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
        try{
            let image_data = req.body.image_data;
            let data = 'data:' + image_data.mime + ';base64,' + image_data.data 

            const uploadResponse = await cloudinary.uploader.upload(data, { 
                folder: "mencomm",
            });
            // console.log(uploadResponse);

            User.findByIdAndUpdate(req.id, {avatar_url: uploadResponse.secure_url})
            .exec()
            .then(user => {
                if(user._id){
                    return res.status(200).json({ 
                        message: "Image Uploaded Successfully",
                    })
                }
            })
        }catch(error){
            // console.log(error)
            return res.status(500).json({ 
                message: error,
            })
        }
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

    getProfile: async (req, res, next) => {
        User.findById(req.id)
        .exec()
        .then(user => { 
            if(user._id){
                if(user?.user_type == 'std'){
                    Student.findOne({user: user._id}).exec()
                    .then(std => {
                        return res.status(200).json({
                            name: user.name,
                            email: user.email,
                            gender: user.gender,
                            birthday: user.birthday,
                            location: user.location,
                            verified: user.verified,
                            last_login: user.last_login,
                            user_type: user.user_type,
                            avatar_url: user.avatar_url,
                            info: {
                                grade: std?.info?.grade || "",
                                course: std?.info?.course || []
                            },
                            rating: std?.rating || 0,
                            tuition_type: std?.tuition_type || ""
                        })
                    })
                }else if(user?.user_type == 'ttr'){
                    Tutor.findOne({user: user._id}).exec()
                    .then(ttr => {
                        return res.status(200).json({
                            name: user.name,
                            email: user.email,
                            gender: user.gender,
                            birthday: user.birthday,
                            location: user.location,
                            verified: user.verified,
                            last_login: user.last_login,
                            user_type: user.user_type,
                            avatar_url: user.avatar_url,
                            info: {
                                grade: ttr?.info?.grade || [],
                                course: ttr?.info?.course || []
                            },
                            rating: ttr?.rating || 0
                        })
                    })
                }else{
                    return res.status(200).json({
                        name: user.name,
                        email: user.email,
                        gender: user.gender,
                        birthday: user.birthday,
                        location: user.location,
                        verified: user.verified,
                        last_login: user.last_login,
                        user_type: user.user_type,
                        avatar_url: user.avatar_url,
                        info: {
                            grade: '',
                            course: ''
                        },
                        rating: 0
                    })
                }
            }
        })
    },
}