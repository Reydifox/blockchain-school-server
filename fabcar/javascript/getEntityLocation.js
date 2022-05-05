const fs = require('fs')
const path = require('path')
const config_file_path = path.resolve(__dirname, '..', 'config', 'entityConfig') + '.json'
const raw_config_file = fs.readFileSync(config_file_path)
const config = JSON.parse(raw_config_file)

function getEntityLocation(entity_name){
    if(config.ledger.includes(entity_name)){
        return "ledger"
    } 
    else if(config.db.includes(entity_name)){
        return "db";
    }
    else {
        throw `Entity ${entity_name} does not exist in entity_config file.`
    }
}

module.exports = getEntityLocation