const { Garage, parkingSpace } = require("./schema")


exports.getAllGarages = async() => {
    return await Garage.find({})
}
 
exports.getSpacesinGarage = async (garageId) => {
    return await parkingSpace.findAll({ garageId: garageId, available: true })
}