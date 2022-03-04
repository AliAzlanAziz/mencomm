const express = require('express')
const router = express.Router()
const { 
    getProfile,
    postCreatePost,
    getAllContracts,
    getContract,
} = require('../controllers/ttr')
const { isAuthenticated } = require('../middleware/authenticate')

router.get('/profile', isAuthenticated, getProfile)

router.post('/createpost', isAuthenticated, postCreatePost)

router.get('/allcontracts', isAuthenticated, getAllContracts)

router.get('/contract/:id', isAuthenticated, getContract)

module.exports = router