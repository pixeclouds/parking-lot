const { Garage, Space } = require("./schema")


exports.getAllGarages = async() => {
    return await Garage.find({})
}