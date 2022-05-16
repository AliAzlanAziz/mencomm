const express = require('express')
const router = express.Router()
const { 
    postPaymentReceipt,
    getPaymentReceipt,
    postStripePay,
    getStripe
} = require('../controllers/payment')
const { isAuthenticated } = require('../middleware/authenticate')

router.post("/paymentreceipt", isAuthenticated, postPaymentReceipt);

router.get("/paymentreceipt", isAuthenticated, getPaymentReceipt);

router.post("/payment", isAuthenticated, postStripePay);
  
router.post("/stripe", isAuthenticated, getStripe);

module.exports = router