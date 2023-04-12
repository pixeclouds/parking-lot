const { User}  = require('./schema.js')
const { v4 } = require('uuid')

exports.getUser = async (email) => {
    return await User.findOne({ email })
}

exports.checkIfUserExists = async (email) => {
    return User.findOne({ email })
}

exports.createNewUser = async (firstname, email, password) => {
    let _id = v4()
    let newUser = new User({_id, firstname, email, password})
    // let newUser = new User({ username, password })
    await newUser.save()
    
    //filter result
    newUser = {
        _id: newUser._id,
        firstname: newUser.firstname,
        email: newUser.email
    }
    return newUser
}
exports.activateAccount = async (id) => {
    await User.updateOne({_id: id}, {status: "active"})
}