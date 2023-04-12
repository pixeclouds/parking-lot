const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reservationSchema = new Schema({
    _id : {
        type: String
    },
    userId: {
        type: Schema.Types.String,
        ref: "User"
    },
    parkingSpaceId: {
        type: Schema.Types.String,
        ref : "parkingSpace"
    },
    startTime: {
        type: Date,
        default: null
    },
    endTime: {
        type: Date,
        default: null
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const Reservation = mongoose.model("Reservation", reservationSchema)
module.exports = { Reservation }