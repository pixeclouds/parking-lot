const cron = require("node-cron")
const { dumpReservationData } = require("./reservation/controller")
const { dumpPayData } = require("./payment/controller")



// run a cron job every 12 hours to dump resevation data into Elastic Search
const reservationJob = cron.schedule('', async () => {
    try {
        dumpReservationData()
    } catch (err) {
        console.log("Cron job error: ", err.message)
    }
})


// run a cron job every 24 hours to dump payment data into Elastic Search
const paymentJob = cron.schedule('', async () => {
    try {
        dumpPayData
    } catch (err) {
        console.log("Cron job error: ", err.message)
    }
})


exports.startJOb = async () => {
    reservationJob.start()
    paymentJob.start()
}