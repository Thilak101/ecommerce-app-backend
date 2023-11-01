const router = require("express").Router()
const userRoute = require("./user")
const checkoutRoute = require("./checkout")

router.use("/user", userRoute)

router.use("/checkout", checkoutRoute)

module.exports = router