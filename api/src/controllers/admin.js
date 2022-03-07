const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose")
const Admin = require('../models/admin')
const Banned = require('../models/banned')

module.exports = {
    postAdminRegister: (req, res, next) => {
        Admin.find({ email: req.body.email })
        .exec()
        .then(admin => {
            if(admin.length >= 1){
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
                        const admin = new Admin({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            name: req.body.firstname + ' ' + req.body.lastname
                        });
                        admin
                        .save()
                        .then(result => {
                            return res.status(201).json({
                                message: "Admin Created Successfully!",
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

    postAdminLogin: (req, res, next) => {
        Admin.find({email: req.body.email})
        .exec()
        .then(admin => { 
            if(admin.length >= 1){
                bcrypt.compare(req.body.password, admin[0].password, async function(err, result) {
                    if(err){
                        return res.status(403).json({
                            message: "Incorrect credentials"
                        })
                    }else{
                        const token = jwt.sign({ id: admin[0]._id }, process.env.SECRET_KEY)
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

    getAllBan: (req, res, next) => {
        Banned.find()
        .exec()
        .then(bans => {
            let result = []

            bans.forEach(item => {
                result.push({
                    _id: item?._id,
                    by: item?.by,
                    user: item?.user,
                    banned_on: item?.banned_on,
                    text: item?.text
                })
            })

            return res.status(200).json({
                message: bans.length + " bans returned",
                data: result
            })
        })
    },

    postBan: (req, res, next) => {
        Banned.findOne({user: req.body.userid})
        .exec()
        .then(ban => {
            if(ban?._id){
                return res.status(200).json({
                    message: "User Already Banned",
                })
            }else{
                const banned = new Banned({
                    _id: new mongoose.Types.ObjectId(),
                    by: req.id,
                    user: req.body.userid,
                    banned_on: new Date(),
                    text: req.body.text
                })

                banned
                .save()
                .then(result => {
                    return res.status(201).json({
                        message: "Banned User Successfully!",
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
            }
        })
    },

    postUnBan: (req, res, next) => {
        Banned.findByIdAndRemove(req.body.banid)
        .exec()
        .then(ban => {
            if(ban?._id){
                return res.status(200).json({
                    message: "Banned Removed",
                })
            }
        })
    },
}