const stripe = require('stripe')
const Stripe = stripe(process.env.STRIPE_SECRET_KEY)
const mongoose = require('mongoose')
const Payment = require('../models/payment')

module.exports = {
    postPaymentReceipt:  async (req, res, next) => {
        const { to, amount, post } = req.body
        const payment = new Payment({
            _id: new mongoose.Types.ObjectId(),
            from: req.id,
            to: to,
            amount: amount,
            post: post,
            date: new Date.now()
        })

        payment.save()
        .then(result => {
            if(!result._id){
                return res.status(500).json({
                    message: err
                });
            }else{
                return res.status(200).json({
                    message: "Payment Receipt Added Successfully"
                });
            }
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                message: err
            })
        })
    },

    getPaymentReceipt:  async (req, res, next) => {
        Payment.find({from: req.id})
        .populate('to')
        .then(receipts => {
            let result = []
            receipts.forEach(item => {
                result.push({
                    id: item?._id,
                    name: item?.to?.name,
                    avatar_url: item?.to?.avatar_url,
                    date: item?.date,
                    amount: item?.amount,
                    post: item?.post
                })
            })

            return res.status(200).json({
                message: result.length + ' payment receipts retreived',
                data: result
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                message: err
            })
        })
    },

    postStripePay: async (req, res, next) => {
        try {
            const { name, fee } = req.body;
            if (!name) return res.status(400).json({ message: "Please enter a name" });
            const paymentIntent = await Stripe.paymentIntents.create({
                amount: fee * 100 , //cents * 100 = $
                currency: "USD",
                payment_method_types: ["card"],
                metadata: { name: name, id: req.id },
            });
            const clientSecret = paymentIntent.client_secret;
            res.status(200).json({ message: "Payment initiated", clientSecret });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    getStripe: async (req, res, next) => {
        const sig = req.headers["stripe-signature"];
        let event;
        try {
            event = await Stripe.webhooks.constructEvent(
                    req.body,
                    sig,
                    process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
      
        // Event when a payment is initiated
        if (event.type === "payment_intent.created") {
            console.log(`${event.data.object.metadata.name} initated payment!`);
        }
        // Event when a payment is succeeded
        if (event.type === "payment_intent.succeeded") {
            console.log(`${event.data.object.metadata.name} succeeded payment!`);
            // fulfilment
        }
        res.json({ ok: true });
    }
}