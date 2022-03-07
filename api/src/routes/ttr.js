const express = require('express')
const router = express.Router()
const { 
    getProfile,
    postCreatePost,
    getAllContracts,
    getContract,
    getAllPosts,
    getPost,
    getFeedbacks,
    postCreateFeedback,
    getAnnouncements,
    postAnnouncement,
    postCreateContract,
    getUpdateInfo,
    postUpdateInfo,
    postSearch
} = require('../controllers/ttr')
const { isAuthenticated } = require('../middleware/authenticate')

router.get('/profile', isAuthenticated, getProfile)

router.post('/createpost', isAuthenticated, postCreatePost)

router.get('/allcontracts', isAuthenticated, getAllContracts)

router.get('/contract/:id', isAuthenticated, getContract)

router.get('/allposts', isAuthenticated, getAllPosts)

router.get('/post/:id', isAuthenticated, getPost)

router.get('/feedbacks', isAuthenticated, getFeedbacks)

router.post('/createfeedback', isAuthenticated, postCreateFeedback)

router.get('/announcements/:id', isAuthenticated, getAnnouncements)

router.post('/createannouncement/:id', isAuthenticated, postAnnouncement)

router.post('/createcontract', isAuthenticated, postCreateContract)

router.get('/updateinfo', isAuthenticated, getUpdateInfo)

router.post('/updateinfo', isAuthenticated, postUpdateInfo)

router.post('/search', isAuthenticated, postSearch)

module.exports = router