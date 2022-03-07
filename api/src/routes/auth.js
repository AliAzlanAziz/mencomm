const express = require('express')
const router = express.Router()
const { 
    postRegister, 
    postLogin, 
    getVerifyToken, 
    postResetLink, 
    postResetPassword,
    postUpdatePassword,
    postSwitchRole,
    postEditProfile,
    postUploadImage,
    getEditProfile
} = require('../controllers/auth')
const { isAuthenticated } = require('../middleware/authenticate')

router.post('/register', postRegister)

router.post('/login', postLogin)

router.post('/resetlink', postResetLink)

router.post('/resetpassword', postResetPassword)

router.post('/resetpassword', postUpdatePassword)

router.get('/verify/:token', getVerifyToken)

router.post('/switchrole', isAuthenticated, postSwitchRole)

router.post('/uploadimage', isAuthenticated, postUploadImage)

router.get('/editprofile', isAuthenticated, getEditProfile)

router.post('/editprofile', isAuthenticated, postEditProfile)

module.exports = router