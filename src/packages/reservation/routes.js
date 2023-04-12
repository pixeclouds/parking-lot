const reservationRouter = require("express").Router()
const { dumpPayData } = require("../analytics/payment/controller")
const { dumpResvData } = require("../analytics/reservation/controller")
const { reserve, checkIn, checkOut, exit } = require("./controller")

reservationRouter.post("/reservation/reserve", reserve)
reservationRouter.post("/reservation/check-in", checkIn)
reservationRouter.post("/reservation/check-out", checkOut)
reservationRouter.post("/reservation/exit", exit)
reservationRouter.post("/reservation/elasticR", dumpResvData)
reservationRouter.post("/reservation/elasticP", dumpPayData)





module.exports = reservationRouter