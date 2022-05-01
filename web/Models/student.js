const query_func = require('../../fabcar/javascript/query.js');
const auth = require('../Auth/auth')

module.exports = {
  getAllStudents: function (req) {
    return query_func(auth.get_bearer(req), 'getAllStudents');
  },
  getStudentById: function (req) {
    return query_func(auth.get_bearer(req), 'queryStudentsById', req.params.id);

  },
  getStudentByProgramId: function (req) {
    return 0
  }
};