const { getAllGarages, getSpaces } = require("./repository")
const {getNearbyGarage} = require("../../utils/distance")

// get all garages on the parking lots system
exports.getGarages = async (req, res) => {
    try {
        let garages = await getAllGarages()

        res.status(200).json(garages)
    } catch (err) {
        console.log(err.message)
    }
}

// get nearby garages 
exports.getNearby = async (req, res) => {

    try {
        let { lat, long } = req.body // user current coordinates
        let coordinates = [lat, long]
        let garages = await getAllGarages()
        
        // find the garage nearest to the user current location
        let nearbyGarage = getNearbyGarage(garages, coordinates)

        res.status(200).json(nearbyGarage)

    } catch (err) {
        console.log(err)
        res.json({ error: err.message})
    }
}