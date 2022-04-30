const query_func = require('../../fabcar/javascript/query.js');
const auth = require('../Auth/auth')

module.exports = {
  getLecturers: function (req) {
    return query_func(auth.get_bearer(req), 'getAllLecturers');
  }
};