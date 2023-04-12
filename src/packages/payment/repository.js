const { Reservation } = require("../reservation/schema")
const { Payment } = require("./schema")
const { v4 } = require("uuid")


exports.initializePay = async (reservationId, amount, duration) => {
    let details = {
        _id: v4(),
        reservationId: reservationId,
        duration: duration,
        amount: amount
    }
    let pay = new Payment(details)
    await pay.save()
    console.log(pay)
    return { payId: pay._id, amount: pay.amount}
}

exports.updatePaymentStatus = async (id, status) => {
    await Payment.updateOne({_id: id}, {paymentSuccess : status})
}

exports.getPay = async (id) => {
    return await Payment.findById(id)
}