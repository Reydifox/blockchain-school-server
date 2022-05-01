const getEntityLocation = require('../javascript/getEntityLocation')
const couch = require('../config/couchDbConnection')
const dbConfig = require('../config/dbConfig')
const dbname = dbConfig.dbname


async function getAllFromDb(entity_name){
    const view_url = `_design/${entity_name}/_view/${entity_name}_all`
    return couch.get(dbname, view_url)
}

// retrieve all entities of a given type defined by entity_name,
// calling getAllEntities(course) will retrieve all courses etc.
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


// retrieves a single entity based on its id
// id example: 'entityname_123456'
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


async function updateEntity(entity){
    const entity_name = entity._id.split("_")[0]
    const entity_location = getEntityLocation(entity_name)
    if (entity_location === 'db'){
        const response = await couch.update(dbname, entity)
        console.log(response)
        return response
    }
    else if(entity_location === 'ledger'){
        //TODO: update in ledger
        console.log("Will be implemented in the future.")
        return undefined
    }
}


// 'entity' object must contain attribute 'entity_name'
async function putEntity(entity){
    const entity_name = entity.entity_name
    // entity.entity_name is not needed
    delete entity.entity_name
    const entity_location = getEntityLocation(entity_name)
    if (entity_location === 'db'){
        couch.uniqid().then(async ids => {
            const generated_id = ids[0]
            entity._id = entity_name + '_' + generated_id
            const response = await couch.insert(dbname, entity)
            console.log(response)
            return response
        })
        
    }
    else if(entity_location === 'ledger'){
        //TODO: put to ledger
        console.log("Will be implemented in the future.")
        return undefined
    }
}


async function deleteEntity(id){
    const entity_name = id.split("_")[0]
    const entity_location = getEntityLocation(entity_name)
    if (entity_location === 'db'){
        const result = await getEntity(id)
        if (result){
            const response = await couch.del(dbname, result._id, result._rev)
            console.log(response)
            return response
        }
    }
    else if(entity_location === 'ledger'){
        //TODO: delete from ledger
        console.log("Will be implemented in the future.")
        return undefined
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
            if(response.status == 201){
                // request accepted
                // TODO: insert user data into ledger
            }
        })
    }
}


async function deleteUser(user_id){
    const user = await getEntity(user_id)
    const response = await couch.del(dbname, user._id, user._rev)
    if(response.status == 200){
        // accepted
        // TODO: remove user from ledger
    }
}


// used for testing purposes
async function main(){
    // const user = {
    //     user_type: 'student',
    //     study_info_id: 1,
    //     absolvent_status_id: 1,
    //     bank_account: 1,
    //     first_name: 'ferko',
    //     last_name: 'kalerab'
    // }
    // await createUser(user)
    // deleteUser('user_af7e3416ad272b26fafca63790010b04')
}

main()