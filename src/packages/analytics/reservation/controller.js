const { getInactiveReservations, 
    checkIfDocExistonElasticSearch,
    saveToElasticSearch
  } = require("./repository")

const { formatReservationData } = require("./utils")


// function to dump inactive reservtaion records into elastic search
exports.dumpReservationData = async () => {
let reservations = await getInactiveReservations()
// check if returned reservation array is empty
if(reservations.length > 0){

  for (reservation of reservations){
    let formated = await formatReservationData(reservation)
    let exists = await checkIfDocExistonElasticSearch(formated)

    if(exists == false) {
      await saveToElasticSearch(formated)
    }
  }
  }else{
  console.log("No reservation records to dump")
  }
}