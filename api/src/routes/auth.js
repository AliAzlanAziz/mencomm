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
    getEditProfile,
    getProfile,
    postReport,
    getNotifications,
    postNotification,
    postReadNotification,
    postAnnouncementNotification
} = require('../controllers/auth')
const { isAuthenticated } = require('../middleware/authenticate')

router.post('/register', postRegister)

router.post('/login', postLogin)

router.post('/resetlink', postResetLink)

router.post('/resetpassword/:resettoken', postResetPassword)

router.post('/updatepassword', postUpdatePassword)

router.get('/verify/:token', getVerifyToken)

router.post('/switchrole', isAuthenticated, postSwitchRole)

router.post('/uploadimage', isAuthenticated, postUploadImage)

router.get('/editprofile', isAuthenticated, getEditProfile)

router.post('/editprofile', isAuthenticated, postEditProfile)

router.get('/profile', isAuthenticated, getProfile)

router.post('/postreport', isAuthenticated, postReport)

router.get('/getnotifications', isAuthenticated, getNotifications)

router.post('/postnotifications', isAuthenticated, postNotification)

router.post('/postannouncementnotifications', isAuthenticated, postAnnouncementNotification)

router.post('/postreadnotification', isAuthenticated, postReadNotification)

module.exports = router