const mongoose = require("mongoose")

const Schema = mongoose.Schema
const parkingSpaceSchema = new Schema({
    _id: {
        type: String
    },
    garageId: {
        type: Schema.Types.String,
        ref : "Garage"
    },
    coordinates: {
        type: [Number]
    },
    length: {
        type: Number
    },
    width: {
        type: Number
    },
    available: {
        type: Boolean,
        default: true
    }
})

const garageSchema = new Schema({
    _id: {
        type: String
    },
    coordinates: {
        type: [Number]
    }
})

const parkingSpace = mongoose.model("parkingSpace", parkingSpaceSchema)
const Garage = mongoose.model("Garage", garageSchema)

module.exports = { parkingSpace, Garage }