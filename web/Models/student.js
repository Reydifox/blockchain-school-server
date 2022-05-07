const auth = require('../Auth/auth')
const infrastructure = require('../../fabcar/api/api.js');

module.exports = {
  getAllStudents: async function (req) {
    let users  = await infrastructure.getAllEntities(auth.get_bearer(req),'user')
    let output = []
    users.result.forEach(user => { 
      if (user.entity_type == 'student') {
        output.push(user)
      }
    });
    return output
  },
  getStudentById: async function (req) {
    let student = await infrastructure.getEntity(auth.get_bearer(req), req.params.id)
    console.log(student)
    return student
  },
  getStudentByProgramId: function (req) {
    return 0
  },
  addStudent: async function (req) {
    student = {
      entity_name: "user",
      entity_type: "student",
      first_name : req.body.first_name,
      last_name : req.body.last_name,
      email : req.body.email,
      academic_degree : req.body.academic_degree,
      private_email : req.body.private_email,
  }
    let result = await infrastructure.putEntity(auth.get_bearer(req),student)
    console.log(result)
    student.id = result.data._id
    return student
  }
};