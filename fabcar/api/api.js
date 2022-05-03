const getEntityLocation = require('../javascript/getEntityLocation')
const couch = require('../config/couchDbConnection')
const dbConfig = require('../config/dbConfig')
const registerUser = require('../javascript/registerUser')
const enrollAdmin = require('../javascript/enrollAdmin')
const ledger_query = require('../javascript/query')
const ledger_invoke = require('../javascript/invoke')
const dbname = dbConfig.dbname


async function getAllFromDb(entity_name){
    const view_url = `_design/${entity_name}/_view/${entity_name}_all`
    return couch.get(dbname, view_url)
}

// retrieve all entities of a given type defined by entity_name,
// calling getAllEntities('id_example', 'course') will retrieve all courses etc.
async function getAllEntities(user_id, entity_name){
    let result = {}
    let result_arr = []
    const entity_location = getEntityLocation(entity_name)
    if (entity_location === 'db'){
        const response = await getAllFromDb(entity_name)
        response.data.rows.forEach(element => {
            result_arr.push(element.value)
        });
    }
    else if(entity_location === 'ledger'){
        const response = await ledger_query(user_id, 'getAllEntities', entity_name)
        const response_str = response.toString()
        const response_json = JSON.parse(response_str)
        response_json.result.forEach(element => {
            let temp_obj = element.Record
            temp_obj._id = element.Key
            result_arr.push(temp_obj)
        })
    }
    result.result = result_arr
    return result
}


// retrieves a single entity based on its id
// id example: 'entityname_123456'
async function getEntity(user_id, entity_id){
    const entity_name = entity_id.split("_")[0]
    const entity_location = getEntityLocation(entity_name)
    if (entity_location === 'db'){
            const result = await couch.get(dbname, entity_id)
            if(result.data){
                return result.data
            }
    }
    else if(entity_location === 'ledger'){
        const response = await ledger_query(user_id, 'getEntity', entity_id)
        const respone_str = response.toString()
        const response_json_str = Buffer.from(respone_str).toString()
        const response_json = JSON.parse(response_json_str)
        response_json._id = entity_id
        return response_json
    }
}


async function updateEntity(user_id, entity){
    const entity_name = entity._id.split("_")[0]
    const entity_location = getEntityLocation(entity_name)
    if (entity_location === 'db'){
        const response = await couch.update(dbname, entity)
        // console.log(response)
        return response
    }
    else if(entity_location === 'ledger'){
        const entity_id = entity._id
        delete entity._id
        const response = await ledger_invoke(user_id, 'putEntity', entity_id, JSON.stringify(entity))
        return response
    }
}


// 'entity' object must contain attribute 'entity_name'
async function putEntity(user_id, entity){
    const entity_name = entity.entity_name
    // entity.entity_name is not needed
    delete entity.entity_name
    const entity_location = getEntityLocation(entity_name)
    couch.uniqid().then(async ids => {
        const generated_id = ids[0]
        const full_id = entity_name + '_' + generated_id
        let response = {}
        if(entity_location === 'db'){
            entity._id = full_id
            response = await couch.insert(dbname, entity)
        }
        else if(entity_location === 'ledger'){
            response = await ledger_invoke(user_id, 'putEntity', full_id, JSON.stringify(entity))
        }
        return response
    })
}


async function deleteEntity(user_id, entity_id){
    const entity_name = entity_id.split("_")[0]
    const entity_location = getEntityLocation(entity_name)
    if (entity_location === 'db'){
        const result = await getEntity(user_id, entity_id)
        if (result){
            const response = await couch.del(dbname, result._id, result._rev)
            //console.log(response)
            return response
        }
    }
    else if(entity_location === 'ledger'){
        const response = await ledger_invoke(user_id, 'deleteEntity', entity_id)
        // The response in not very useful when using ledger_invoke(),
        // because the ledger always returns an empty buffer,
        // regardless if the operation is successful or not.
        // Might be better to return a manually created response,
        // created after some kind of check, e.g. if the entity to be deleted exists.
        const stuff = response.toString()
        return stuff
    }
}


async function createUser(user){
    // user_type is either student or faculty_member
    const user_type = user.user_type
    delete user.user_type
    if (user_type === 'student' || user_type === 'faculty_member'){
        couch.uniqid().then(async ids => {
            const generated_id = ids[0]
            const user_id = 'user_' + generated_id
            user._id = user_id
            let db_user_data = {}
            let ledger_user_data = {}
            if (user_type === 'student'){
                ledger_user_data = {
                    _id: user_id,
                    study_info_id: user.study_info_id,
                    absolvent_status_id: user.absolvent_status_id,
                    bank_account: user.bank_account
                }
                const {study_info_id, absolvent_status_id, bank_account, ...temp_data} = user
                db_user_data = temp_data
            }
            else {
                ledger_user_data = {
                    _id: user_id,
                    secondary_auth_id: user.study_info_id,
                    user_role_id: user.user_role_id
                }
                const {secondary_auth_id, user_role_id, ...temp_data} = user
                db_user_data = temp_data
            }
            const db_response = await couch.insert(dbname, db_user_data)
            console.log(db_response)
            if(db_response.status == 201){
                // request accepted
                // TODO: insert user data into ledger
                if (user_type === 'faculty_member'){
                    // register user and create a wallet,
                    // if the user is a faculty member
                    // students do not have separate wallets
                    await registerUser(user._id)
                }
            }
        })
    }
}


async function deleteUser(user_id){
    const user = await getEntity(user_id)
    const response = await couch.del(dbname, user._id, user._rev)
    if(response.status == 200){
        // accepted
        // TODO: remove user from ledger and delete wallet
    }
}


// used for testing purposes
async function main(){
    
}

main()

module.exports.getEntity = getEntity
module.exports.putEntity = putEntity
module.exports.updateEntity = updateEntity
module.exports.deleteEntity = deleteEntity
module.exports.createUser = createUser
module.exports.deleteUser = deleteUser
