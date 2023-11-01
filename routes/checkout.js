const router = require("express").Router()
const { v4: uuid } = require("uuid")
const stripe = require("stripe")(process.env.STRIPE_KEY)
const { Checkout } = require("../models")
const getUser = require("../middlewares/getUser")

router.get("/", (req, res) => {
    res.json({ msg: "checkout route" })
})

router.post("/create-payment-intent", getUser, async (req, res) => {
    try {
        const { total, items } = req.body

        const orderId = uuid()
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total * 100,
            currency: "inr",
            metadata: {
                order_id: orderId
            }
        })

        await Checkout.create({
            items,
            total,
            order_id: orderId,
            payment_id: paymentIntent.id,
            user: req.userId
        })
        res.json({ clientSecret: paymentIntent.client_secret })
    }
    catch (err) {
        console.log(err.message)
    }
})


router.get("/orders", getUser, async (req, res) => {
    const orders = await Checkout.find({ user: req.userId }).populate("user", "-password")
    res.json({ orders })
})

module.exports = router