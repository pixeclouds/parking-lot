const mongoose = require("mongoose")

const Schema = mongoose.Schema
const paymentSchema = new Schema({
    _id: {
        type: String,
    },
    reservationId: {
        type: String
    },
    duration: {
        type: Number
    },
    amount: {
        type: Number
    },
    paymentSuccess: {
        type: Boolean,
        default: false
    } 
},
 {
    timestamps: true
  }
)

const Payment = mongoose.model("Payment", paymentSchema)

module.exports = { Payment }