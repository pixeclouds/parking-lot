const spaceRouter = require("express").Router()
const { getSpaces, getGarages, getNearby } = require("./controller")

// spaceRouter.get("/spaces", getSpaces)
spaceRouter.get("/garages", getGarages)
spaceRouter.get("/garages/nearby", getNearby)



module.exports = spaceRouter