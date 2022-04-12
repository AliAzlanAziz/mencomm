const express = require('express')
const router = express.Router()
const { 
    postPay,
    getStripe
} = require('../controllers/payment')
const { isAuthenticated } = require('../middleware/authenticate')

router.post("/payment", isAuthenticated, postPay);
  
router.post("/stripe", isAuthenticated, getStripe);

module.exports = router