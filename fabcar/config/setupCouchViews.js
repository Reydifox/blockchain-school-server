const couch = require('./couchDbConnection')
const fs = require('fs')
const raw_config_file = fs.readFileSync('entityConfig.json')
const config = JSON.parse(raw_config_file)


// only used for testing purposes
const entities = [
    {
        _id: "user_1",
        first_name: "ferko",
        last_name: "mrkvicka", 
        email: "ferkomrkvicka@gmail.com"
    },
    {
        _id: "user_2",
        first_name: "janko",
        last_name: "hrasko", 
        email: "jankohrasko@gmail.com"
    },
    {
        _id: "course_1",
        garant_id: 1, 
        name: "Algoritmy a datove struktury", 
        acronym: "ADS", 
        description: "Algo a DS",
        trimester: 4,
        prerequisite_course_id: 0
    }
]


function insert_doc(doc){
    couch.insert("testing_db", doc).then(({data, headers, status}) => {
        console.log(data)
    }, err => {
        console.log(err)
    });
}

function main(){
    // uncomment below line to insert a few simple entities into DB
    // useful for testing purposes
    //entities.forEach(element => insert_doc(element))

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

main()

