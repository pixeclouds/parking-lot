const { verifyToken } = require("../utils/token")

//check if user is signed in
exports.authenticate = async (req, res, next) => {
    let { authorization } = req.headers
    let token = authorization.split(" ")[1]
    try {
        if(!token){
            throw Error
        }
        let user = await verifyToken(token)
        req.user = user._id
        next()
    } catch (err) {
        res.status(403).send("Access Denied. Login instead")
    }
}