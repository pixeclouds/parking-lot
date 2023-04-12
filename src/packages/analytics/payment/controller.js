const { getSuccessfulPayments, 
    checkIfDocExistonElasticSearch,
    saveToElasticSearch
  } = require("./repository")

const { formatPaymentData } = require("./utils")


// function to dump successful payments records into elastic search
exports.dumpPayData = async  (req, res) => {
let payments = await getSuccessfulPayments()
// check if returned payments array is empty
if(payments.length > 0){

  for (pay of payments){
    let formated = await formatPaymentData(pay)
    let exists = await checkIfDocExistonElasticSearch(formated)
    
    if(exists == false) {
      await saveToElasticSearch(formated)
    }
  }
}else{
  console.log("No payment records to dump")
}


}