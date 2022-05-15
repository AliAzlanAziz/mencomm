const stripe = require('stripe')
const Stripe = stripe(process.env.STRIPE_SECRET_KEY)

module.exports = {
    postPay: async (req, res, next) => {
        try {
            const { name, fee } = req.body;
            if (!name) return res.status(400).json({ message: "Please enter a name" });
            const paymentIntent = await Stripe.paymentIntents.create({
                amount: fee, //rs * paisa
                currency: "USD",
                payment_method_types: ["card"],
                metadata: { name: name, id: req.id },
            });
            const clientSecret = paymentIntent.client_secret;
            res.json({ message: "Payment initiated", clientSecret });
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