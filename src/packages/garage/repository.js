const { Garage, parkingSpace } = require("./schema")


exports.getAllGarages = async() => {
    return await Garage.find({})
}
 
exports.getSpacesinGarage = async (garageId) => {
    let space = await parkingSpace.find({ garageId: garageId, available: true })
    console.log("repo",space)
    return space
}