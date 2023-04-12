require("dotenv").config()
const express = require("express")
const app = express()

const userRouter = require("./src/packages/user/routes")
const garageRouter = require("./src/packages/garage/routes")
const paymentRouter = require("./src/packages/payment/routes")
const reservationRouter = require("./src/packages/reservation/routes")

const {connectToDB} = require("./src/config/database")
const { startJOb } = require("./src/packages/analytics")

app.use(express.json())
app.use(userRouter)
app.use(garageRouter)
app.use(reservationRouter)
app.use(paymentRouter)

// connect to database
connectToDB()

// run cron job for the analytics service
startJOb()

const PORT = process.env.PORT 
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})