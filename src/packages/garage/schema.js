const mongoose = require("mongoose")

const Schema = mongoose.Schema
const spaceSchema = new Schema({
    _id: {
        type: String
    },
    garage_id: {
        type: Schema.Types.String,
        ref : "garage"
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

const Space = mongoose.model("space", spaceSchema)
const Garage = mongoose.model("garage", garageSchema)

module.exports = { Space, Garage }