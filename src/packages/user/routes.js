const userRouter = require('express').Router()
const { signup, signin, verifyAccount } = require("./controller.js")

userRouter.post('/user/signin', signin)
userRouter.post('/user/signup', signup)
userRouter.get('/user/verify-mail/:link', verifyAccount)

module.exports = userRouter