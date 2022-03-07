const express = require('express')
const router = express.Router()
const { 
    postAdminRegister,
    postAdminLogin,
    getAllBan,
    postBan,
    postUnBan,
} = require('../controllers/admin')
const { isAdminAuth } = require('../middleware/authenticate')

router.post('/register', postAdminRegister)

router.post('/login', postAdminLogin)

router.get('/allbans', isAdminAuth, getAllBan)

router.post('/ban', isAdminAuth, postBan)

router.post('/unban', isAdminAuth, postUnBan)

module.exports = router