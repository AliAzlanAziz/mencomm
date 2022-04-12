const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Admin = require('../models/admin')
const Banned = require('../models/banned')

module.exports = {
    isAuthenticated: (req, res, next) => {
        jwt.verify(req.headers.token, process.env.SECRET_KEY, (error, decode) => {
            if(error){
                return res.status(401).json({
                    message: 'Unauthorized Access'
                })
            }

            Banned.findOne({user: decode.id})
            .exec()
            .then(ban => {
                if(ban?._id){
                    return res.status(401).json({
                        message: 'Unauthorized Access'
                    })
                }

                User.findById(decode.id)
                .exec()
                .then(user => {
                    if(user && user._id != null){
                        req.id = decode.id
                        return next()
                    }else{
                        return res.status(401).json({
                            message: 'Unauthorized Access'
                        })
                    }
                })
            })
        })
    },

    isAdminAuth: (req, res, next) => {
        jwt.verify(req.headers.token, process.env.SECRET_KEY, (error, decode) => {
            if(error){
                return res.status(401).json({
                    message: 'Unauthorized Access'
                })
            }
            
            Admin.findById(decode.id)
            .exec()
            .then(user => {
                if(user && user._id != null){
                    req.id = decode.id
                    return next()
                }else{
                    return res.status(401).json({
                        message: 'Unauthorized Access'
                    })
                }
            })
        })
    }
}