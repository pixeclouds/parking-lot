const userRouter = require('express').Router()
const { signup, signin, verifyAccount, resendVerificationMail } = require("./controller.js")

userRouter.post('/user/signin', signin)
userRouter.post('/user/signup', signup)
userRouter.get('/user/verify-mail/:link', verifyAccount)
userRouter.post('/user/reverify-mail', resendVerificationMail)


module.exports = userRouter