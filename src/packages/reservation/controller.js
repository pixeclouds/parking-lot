const { reserveSpace, getReservation, checkIntoSpace, checkOutFromSpace, updateStatus }= require("./repository")
const { isVehicleClose } = require("../../utils/distance")
const { locks } = require("../../services/locks")

exports.reserve = async (req, res) => {
    try {
        let { userId, spaceId } = req.query
        let reserved = await reserveSpace(userId, spaceId) 
        let updated = await updateStatus(spaceId)
        console.log(updated)
        res.json({
            "Message": "parking space reserved",
            "reservationId": reserved._id
        })
    } catch (err) {
        res.json(err.Message)
    }
}




exports.checkIn = async (req, res) => {
    try {
        let { reservationId, lat, long } = req.query
        // get the coordinates of the reserved space
        let { parkingSpaceId }  = await getReservation(reservationId)
        let space = parkingSpaceId.coordinates
        let vehicle = [Number(lat), Number(long)]

        // check if less than 100 meters away from the reserved space
        let proximity = isVehicleClose(vehicle, space)
        if (proximity) {
            // run command to open space locks
            await locks(parkingSpaceId._id)
            let checkedin = await checkIntoSpace(reservationId)
            res.json({
                "Message": "Check in success",
                "Check-in Time": checkedin.startTime      
            })
        }
        else{
            throw Error ("You are still more than a 100m away. Drive closer")
        }
    } catch (err) {
        res.json({
            "Error": err.message
        })
    }
}


exports.checkOut = async (req, res) => {
    try {
        let { reservationId } = req.query
        let checkout = await checkOutFromSpace(reservationId)
        // redirect to make payment
        console.log("redirecting to payments", checkout)
    } catch (err) {
        res.json({ Error: err.Message})
    }
}