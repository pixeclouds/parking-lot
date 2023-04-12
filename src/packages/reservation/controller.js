const { reserveSpace, getReservation, checkIntoSpace, checkOutFromSpace, updateSpaceStatus }= require("./repository")
const { isVehicleClose } = require("../../utils/distance")
const { locks } = require("../../services/locks/index")
const { initializePay } = require("../payment/repository")

exports.reserve = async (req, res) => {
    try {
        let { userId, spaceId } = req.query
        let reserved = await reserveSpace(userId, spaceId) 
        // update space availabilty status
        await updateSpaceStatus(spaceId, false)
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
                "message": "Check in success",
                "check-in time": checkedin.startTime      
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
        // calculate amount to be paid by user
        let duration = Math.floor((checkout.endTime - checkout.startTime)/60000)  // duration in minutes
        let unitAmount = process.env.UNIT_SPACE_BILL
        let amount = duration * unitAmount

        
        console.log("duration", duration, "amount", amount)

        // initialize and write record to payment
        let payment = await initializePay(reservationId, amount, duration)
        console.log(payment)

        res.json({
            "message": "make payments",
            data: payment
        })
    } catch (err) {
        res.json({ Error: err.Message})
    }
}

exports.exit = async (req, res) => {
    try {
        let { payId } = req.query

        let { reservationId } = await getPay(payId)
        let exit = getParking(reservationId)
         // update space availabilty status
        await updateSpaceStatus(exit.parkingSpaceId, true)
        // run command to open space locks
        await locks(exit.parkingSpaceId)

        res.json({
            "Message": "Opening locks... Bye"
        })

    } catch (err) {
        res.json({ Error: err.Message})
        
    }
}

// exports.checkOut = async (req, res) => {
//     try {
//         let { reservationId } = req.query
//         let checkout = await get(reservationId)
//         // update space availabilty status
//         let spaceId =  checkout.parkingSpaceId
//         await updateSpaceStatus(spaceId, true)
//         // redirect to make payment
//         console.log("redirecting to payments", checkout)
//         res.json({
//             "message": "check out success. "
//         })
//     } catch (err) {
//         res.json({ Error: err.Message})
//     }
// }