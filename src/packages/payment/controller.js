const { stripePayment } = require("../../services/stripe/config")
const { updatePaymentStatus } = require("./repository")



exports.makePayment = async (req, res) => {
    try {
        let { payId, amount } = req.query
        let payUrl = await stripePayment(payId, amount)

        // res.redirect(payUrl)
        res.json(payUrl)

    } catch (err) {
        res.json({
            "Error": err.message
        })
    }
}

// update payment status to sucess 
exports.successPayment = async (req, res) => {
    try {
        let { payId } = req.query
        await updatePaymentStatus(payId, true)
        res.redirect(`${HOST}/reservation/exit?payId=${payId}`)

    } catch (err) {
        res.json({
            "Error": err.message
        })
    }
}


// handles failed  payments
exports.failedPayment = async (req, res) => {
    try {
        let { payId } = req.query
        res.json({
            "Message": "Payment failed. Try again",
        })
    } catch (error) {
        
    }
}