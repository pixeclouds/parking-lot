const { getAllGarages, getSpacesinGarage} = require("./repository")
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
        let { lat, long } = req.query // user current coordinates
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


// retrieve all the unoccupied and available spaces in a particular garage
exports.getAvailableSpaces = async (req, res) => {
    try {
       let { garageId } = req.query
    //    console.log(garageId)
       let spaces = await getSpacesinGarage(garageId)
    //    console.log(spaces)
       if (spaces.length == 0){
        throw Error("No available space in the garage. Check other nearby garages")
       }
       res.json(spaces)
    } catch (err) {
        res.json({ "message": err.message})
    }
}