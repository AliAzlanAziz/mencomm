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
    postEnroll,
    postCancelEnroll,
    getAnnouncements,
    postCreateContract,
    postUpdateInfo,
    postSearchPeople,
    postSearchPost,
    getOthersProfile,
    getNewsfeed,
    getChatList,
    getRequests,
    postAcceptRequest,
    postRejectEnroll,
    getEnrolls,
    postMessage,
} = require('../controllers/std')
const { isAuthenticated } = require('../middleware/authenticate')

router.get('/profile', isAuthenticated, getProfile)

router.get('/othersprofile/:id', isAuthenticated, getOthersProfile)

router.get('/allposts', isAuthenticated, getAllPosts)

router.get('/post/:id', isAuthenticated, getPost)

router.post('/createpost', isAuthenticated, postCreatePost)

router.get('/allcontracts', isAuthenticated, getAllContracts)

router.get('/contract/:id', isAuthenticated, getContract)

router.post('/createcontract', isAuthenticated, postCreateContract)

router.get('/requests/:id', isAuthenticated, getRequests)

router.post('/acceptrequest', isAuthenticated, postAcceptRequest)

router.get('/enrolls/:id', isAuthenticated, getEnrolls)

router.post('/rejectenroll', isAuthenticated, postRejectEnroll)

router.get('/feedbacks', isAuthenticated, getFeedbacks)

router.post('/createfeedback', isAuthenticated, postCreateFeedback)

router.post('/enroll/:id', isAuthenticated, postEnroll)

router.post('/cancelenroll/:id', isAuthenticated, postCancelEnroll)

router.get('/announcements/:id', isAuthenticated, getAnnouncements)

router.post('/updateinfo', isAuthenticated, postUpdateInfo)

router.post('/searchpeople', isAuthenticated, postSearchPeople)

router.post('/searchpost', isAuthenticated, postSearchPost)

router.get('/newsfeed', isAuthenticated, getNewsfeed)

router.get('/chatlist', isAuthenticated, getChatList)

router.post('/sendmessage', isAuthenticated, postMessage)

module.exports = router