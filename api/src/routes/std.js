const express = require('express')
const router = express.Router()
const { 
    getProfile,
    postCreatePost,
    getAllContracts,
    getContract,
    getOthersProfile
} = require('../controllers/std')
const { isAuthenticated } = require('../middleware/authenticate')

router.get('/profile', isAuthenticated, getProfile)

router.post('/createpost', isAuthenticated, postCreatePost)

router.get('/allcontracts', isAuthenticated, getAllContracts)

router.get('/contract/:id', isAuthenticated, getContract)

// router.get('/othersprofile/:id', isAuthenticated, getOthersProfile)

module.exports = router