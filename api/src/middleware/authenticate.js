const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = {
    isAuthenticated: (req, res, next) => {
        jwt.verify(req.headers.token, process.env.SECRET_KEY, (error, decode) => {
            if(error){
                return res.status(401).json({
                    message: 'Unauthorized Access'
                })
            }
            
            User.findById(decode.id)
            .exec()
            .then(user => {
                if(user._id != null){
                    req.id = decode.id
                    next()
                }else{
                    return res.status(401).json({
                        message: 'Unauthorized Access'
                    })
                }
            })
        })
    }
}