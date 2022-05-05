const couch = require('./couchDbConnection')
const fs = require('fs')
const raw_config_file = fs.readFileSync('entityConfig.json')
const config = JSON.parse(raw_config_file)
const dbConfig = require('./dbConfig')
const dbname = dbConfig.dbname


function insert_doc(doc){
    couch.insert(dbname, doc).then(({data, headers, status}) => {
        console.log(data)
    }, err => {
        console.log(err)
    });
}

function main(){

    config.db.forEach(element => {
        const view_name = `${element}_all`
        const doc_id = `_design/${element}`
        const function_string = `function (doc){if(doc._id.startsWith(\"${element}\")) emit(doc._id, doc);}`
        const view = {
            _id : doc_id,
            "language":"javascript",
            "views":{
                [view_name] :{
                    "map": function_string
                }
            }
        }
        insert_doc(view)
    })
}

module.exports = main

