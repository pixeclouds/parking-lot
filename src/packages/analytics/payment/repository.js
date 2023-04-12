const { Payment } = require("../../payment/schema")
const { elasticSearchClient } = require("../config")


exports.getSuccessfulPayments = async () =>{
    return Payment.find({ paymentSuccess: true })
}

exports.saveToElasticSearch = async (data) =>  {
    const insert = await  elasticSearchClient.index({
        index: "payments",
        id: data.payId,
        document: data
      });
    if(insert.result == "created"){
      console.log("pay data dumping successful")
    }
}

exports.checkIfDocExistonElasticSearch = async (data) => {
  const result = await  elasticSearchClient.exists({
      index: "payments",
      id: data.payId,
    });

  if(result){
    console.log(`${data.payId} exists on ES`)
    return true
  }else {
    console.log(`${data.payId} DOES NOT exists on ES`)

    return false
  }
}