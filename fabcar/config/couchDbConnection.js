const NodeCouchDb = require('node-couchdb');
const dbConfig = require('./dbConfig')

const couch = new NodeCouchDb({
    auth: dbConfig.auth
});

module.exports = couch;


