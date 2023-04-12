const { Client } = require('@elastic/elasticsearch')
const elasticSearchClient = new Client({
  cloud: {
    id: process.env.ELASTIC_CLOUD_ID
  },
  auth: {
    username: process.env.ELASTIC_CLOUD_USERNAME,
    password: process.env.ELASTIC_CLOUD_PASSWORD
  }
})

module.exports = {elasticSearchClient}

