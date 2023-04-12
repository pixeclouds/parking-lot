const { Reservation } = require("./schema")
const { v4 } = require("uuid")
const { parkingSpace } = require("../garage/schema")

exports.getReservation = async (id) => {
    return Reservation.findById(id)
                      .populate("parkingSpaceId")
}

exports.getAllReservation = async () => {
    return Reservation.find()
                      
}

exports.getParking = async (id) => {
    return Reservation.findById(id)
}

exports.reserveSpace = async (userId, spaceId) => {
    let _id = v4()
    let newReservation = new Reservation({_id, userId: userId, parkingSpaceId: spaceId})
    newReservation.save()
    return newReservation
}

// update the availability status of a parking space
exports.updateSpaceStatus = async (id, status) => {
    await parkingSpace.updateOne({_id: id}, {available : status})
}

exports.checkIntoSpace = async (id) => {
    // document check in time
    let startTime = Date.now()
    let checkin = await Reservation.findById(id)
    checkin.startTime = startTime
    checkin.save()
    return checkin
}

exports.checkOutFromSpace = async (id) => {
    // document check out time
    let endTime = Date.now()
    let checkout = await Reservation.findById(id)
    checkout.endTime = endTime
    checkout.active = false
    checkout.save()
    return checkout
}