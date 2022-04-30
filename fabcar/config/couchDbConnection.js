const NodeCouchDb = require('node-couchdb');

const couch = new NodeCouchDb({
    auth: {
        user: 'admin',
        password: 'adminpw'
    }
});

module.exports = couch;


