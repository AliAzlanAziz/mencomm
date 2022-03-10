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
    postCreateContract,
    getUpdateInfo,
    postUpdateInfo,
    postSearch,
    getOthersProfile
} = require('../controllers/std')
const { isAuthenticated } = require('../middleware/authenticate')

router.get('/profile', isAuthenticated, getProfile)

router.post('/createpost', isAuthenticated, postCreatePost)

router.get('/allcontracts', isAuthenticated, getAllContracts)

router.get('/contract/:id', isAuthenticated, getContract)

router.post('/createcontract', isAuthenticated, postCreateContract)

router.get('/allposts', isAuthenticated, getAllPosts)

router.get('/post/:id', isAuthenticated, getPost)

router.get('/feedbacks', isAuthenticated, getFeedbacks)

router.post('/createfeedback', isAuthenticated, postCreateFeedback)

router.get('/announcements/:id', isAuthenticated, getAnnouncements)

router.get('/updateinfo', isAuthenticated, getUpdateInfo)

router.post('/updateinfo', isAuthenticated, postUpdateInfo)

router.post('/search', isAuthenticated, postSearch)

router.get('/othersprofile/:id',isAuthenticated,getOthersProfile)
module.exports = router