const reservationRouter = require("express").Router()
const { reserve, checkIn, checkOut } = require("./controller")

reservationRouter.post("/reservation/reserve", reserve)
reservationRouter.post("/reservation/check-in", checkIn)
reservationRouter.post("/reservation/check-out", checkOut)


module.exports = reservationRouter