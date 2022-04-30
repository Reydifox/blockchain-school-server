const getEntityLocation = require('../javascript/getEntityLocation')
const couch = require('../config/couchDbConnection')

async function getAllFromDb(entity_name){
    const view_url = `_design/${entity_name}/_view/${entity_name}_all`
    const db_name = 'testing_db'
    return couch.get(db_name, view_url)
}


async function getAllEntities(entity_name){
    let result_arr = []
    const entity_location = getEntityLocation(entity_name)
    if (entity_location === 'db'){
        const response = await getAllFromDb(entity_name)
        response.data.rows.forEach(element => {
            result_arr.push(element.value)
        });
        return result_arr
    }
    else if(entity_location === 'ledger'){
        //TODO: retrieve from ledger
        console.log("Will be implemented in the future.")
        return undefined
    }
}


async function main(){
    const entity_name = 'user'
    const results = await getAllEntities(entity_name)
    console.log(results)
}

main()