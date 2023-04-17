const reservationRouter = require("express").Router()
const { reserve, checkIn, checkOut, exit } = require("./controller")
const { authenticate } = require("../../middleware/auth")


reservationRouter.post("/reservation/reserve", authenticate, reserve)
reservationRouter.post("/reservation/check-in", authenticate, checkIn)
reservationRouter.post("/reservation/check-out", authenticate, checkOut)
reservationRouter.post("/reservation/exit", authenticate, exit)

module.exports = reservationRouter