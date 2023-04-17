const garageRouter = require("express").Router()
const { getGarages, getNearby, getAvailableSpaces } = require("./controller")
const { authenticate } = require("../../middleware/auth")


garageRouter.get("/garage", authenticate, getGarages)
garageRouter.get("/garage/nearby", authenticate, getNearby)
garageRouter.get("/garage/spaces", authenticate, getAvailableSpaces)

module.exports = garageRouter