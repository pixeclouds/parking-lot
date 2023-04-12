const jwt = require('jsonwebtoken')

const SECRET = process.env.JWT_SECRET

exports.generateToken = async (user) => {
    token = jwt.sign(user, SECRET, { expiresIn: "5h"})
    return token
}

exports.verifyToken = async(token) => {
    let user
    try {
        jwt.verify(token, SECRET, (err, payload)=> {
            if (err){
                console.log("token error", err.message)
                throw Error(err.message)
            }
            user = payload
        })
    } catch (err) {
        throw Error(err)
    }

    return user
}

exports.generateVerificationLink = async (user) => {
    let token = jwt.sign(user, SECRET, { expiresIn: "24h"})
    let HOST = process.env.HOST
    let link = `${HOST}/user/verify-mail/${token}`
    return link
}