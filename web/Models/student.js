const auth = require('../Auth/auth')
const infrastructure = require('../../fabcar/api/api.js');
const user = require('./user');
const helpers = require('../Helpers/helpers');

module.exports = {
  getAllStudents: async function (req) {
    let users  = await user.getAllUsers(req)
    let output = []
    users.forEach(user => { 
      if (user.user_type == 'student') {
        output.push(user)
      }
    });
    return output
  },
  getStudentByProgramId: function (req) {
    return 0
  },
  addStudent: async function (req) {
    let address_id = undefined
    if ('address' in req.body) {
      let address = req.body.address
      console.log(address)
      //let result_address = await helpers.putAddress(address)
      //console.log(result_address)
      //address_id = result_address._id
    }
    student = {
      user_type: "student",
      first_name : req.body.first_name,
      last_name : req.body.last_name,
      email : req.body.email,
      academic_degree : req.body.academic_degree,
      private_email : req.body.private_email,
      address_id: address_id,
  }
    let result = await infrastructure.createUser(student)
    return student
  }
}