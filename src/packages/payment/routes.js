const paymentRouter = require("express").Router()
const { makePayment, successPayment, failedPayment } = require("./controller")

paymentRouter.post("/payments/pay", makePayment)
paymentRouter.get("/payments/pay/success", successPayment)
paymentRouter.get("/payments/pay/failed", failedPayment)


module.exports = paymentRouter