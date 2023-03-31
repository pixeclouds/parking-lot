const { Reservation } = require("./schema")
const { v4 } = require("uuid")
const { parkingSpace } = require("../garage/schema")

exports.getReservation = async (id) => {
    return Reservation.findById(id)
                      .populate("parkingSpaceId")
}

exports.reserveSpace = async (userId, spaceId) => {
    let _id = v4()
    let newReservation = new Reservation({_id, userId: userId, parkingSpaceId: spaceId})
    newReservation.save()
    // update space availability status
    // let space = await parkingSpace.findById(spaceId)
    // space.available = false
    // space.save()
    return newReservation
}

exports.updateStatus = async (id) => {
    console.log(id)
    let status = await parkingSpace.findById(id)
    console.log(status)
    status.availabity = false
    status.save()
    return status
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
    checkout.save()
    return checkout
}