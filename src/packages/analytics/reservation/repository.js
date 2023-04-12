const { Reservation } = require("../../reservation/schema")
const { elasticSearchClient } = require("../config")


exports.getInactiveReservations = async () =>{
    return Reservation.find()
}

exports.saveToElasticSearch = async (data) =>  {
    const insert = await  elasticSearchClient.index({
        index: "reservations",
        id: data.reservationId,
        document: data
      });
    if(insert.result == "created"){
      console.log("resv data dumping successful")
    }
}

exports.checkIfDocExistonElasticSearch = async (data) => {
  const result = await  elasticSearchClient.exists({
      index: "reservations",
      id: data.reservationId,
    });

  if(result){
    console.log(`${data.reservationId} exists on ES`)
    return true
  }else {
    console.log(`${data.reservationId} DOES NOT exists on ES`)

    return false
  }
}