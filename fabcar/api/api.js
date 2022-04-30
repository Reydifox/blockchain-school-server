const getEntityLocation = require('../javascript/getEntityLocation')
const couch = require('../config/couchDbConnection')
const dbConfig = require('../config/dbConfig')
const dbname = dbConfig.dbname

async function getAllFromDb(entity_name){
    const view_url = `_design/${entity_name}/_view/${entity_name}_all`
    return couch.get(dbname, view_url)
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

async function getEntity(id){
    const entity_name = id.split("_")[0]
    const entity_location = getEntityLocation(entity_name)
    if (entity_location === 'db'){
            const result = await couch.get(dbname, id)
            if(result.data){
                return result.data
            }
    }
    else if(entity_location === 'ledger'){
        //TODO: retrieve from ledger
        console.log("Will be implemented in the future.")
        return undefined
    }
}

// used for testing purposes
async function main(){
    const entity_name = 'user'
    const results = await getAllEntities(entity_name)

    console.log(results)

    const entity_id = 'course_1'
    try{
        const result = await(getEntity(entity_id))
        console.log(result)
    }
    catch(e){
        console.log(e)
    }
    
}

main()