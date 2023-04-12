const reservationRouter = require("express").Router()
const { reserve, checkIn, checkOut, exit } = require("./controller")

reservationRouter.post("/reservation/reserve", reserve)
reservationRouter.post("/reservation/check-in", checkIn)
reservationRouter.post("/reservation/check-out", checkOut)
reservationRouter.post("/reservation/exit", exit)

module.exports = reservationRouter