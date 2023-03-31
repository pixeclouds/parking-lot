require("dotenv").config()
const express = require("express")
const app = express()

const userRouter = require("./src/packages/user/routes")
const garageRouter = require("./src/packages/garage/routes")
const reservationRouter = require("./src/packages/reservation/routes")
const {connectToDB} = require("./src/config/database")

app.use(express.json())
app.use(userRouter)
app.use(garageRouter)
app.use(reservationRouter)



// connect to database
connectToDB()

const PORT = process.env.PORT 
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})