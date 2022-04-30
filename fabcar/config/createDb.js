const couch = require('./couchDbConnection')
const dbConfig = require('./dbConfig')


async function main(){
    await couch.createDatabase(dbConfig.dbname)    
}

module.exports = main