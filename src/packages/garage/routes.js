const garageRouter = require("express").Router()
const { getGarages, getNearby, getAvailableSpaces } = require("./controller")
const { authenticate } = require("../../middleware/auth")


garageRouter.get("/garages", authenticate, getGarages)
garageRouter.get("/garages/nearby", authenticate, getNearby)
garageRouter.get("/garages/spaces", authenticate, getAvailableSpaces)

module.exports = garageRouter