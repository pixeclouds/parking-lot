const geolib = require("geolib")

const calculateDistance = (garageCoordinates, userCoordinates) => {
    let distance = geolib.getDistance(
        {latitude: userCoordinates[0], longitude: userCoordinates[[1]]},
        {latitude: garageCoordinates[0], longitude: garageCoordinates[[1]]}
    )
    return distance
}


// fucntion to determine which garage is closest to the users current location
exports.getNearbyGarage = (garages, currentCoordinates) => {
    // calculate the distances between the user location and all the garages
    let distances = garages.map(garage => calculateDistance(garage.coordinates, currentCoordinates))

    // find the index of the shortest distance
    let index = distances.indexOf(Math.min(...distances))
    let distanceAway = Math.min(...distances) / 1000
     
    // get the nearest garage to the user 
    let nearbyGarage = Object(garages[index])

    nearbyGarage = {
        _id: nearbyGarage._id,
        coordinates: nearbyGarage.coordinates,
        distanceAway: `${distanceAway} km`
    }
    return nearbyGarage

}

// function to determine if the vehicle is close enough (100m) to a reserved space
exports.isVehicleClose = (vehicleCoordinates, garageCoordinates) => {
    let distance = calculateDistance(vehicleCoordinates, garageCoordinates)
    if ( distance <= 50 ){
        return true
    }else {
        return false
    }
}