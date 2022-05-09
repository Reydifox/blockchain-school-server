const auth = require('../Auth/auth')
const infrastructure = require('../../fabcar/api/api.js');

module.exports = {
  getAllCourses: async function (req) {
    let courses  = await infrastructure.getAllEntities(auth.get_bearer(req),'course')
    return courses.result
  },
};