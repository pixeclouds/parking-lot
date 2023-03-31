const garageRouter = require("express").Router()
const { getGarages, getNearby, getAvailableSpaces } = require("./controller")

// spaceRouter.get("/spaces", getSpaces)
garageRouter.get("/garages", getGarages)
garageRouter.get("/garages/nearby", getNearby)
garageRouter.get("/garages/spaces", getAvailableSpaces)

module.exports = garageRouter