const express = require('express')
const router = express.Router()
const student = require('../Models/student')
const user = require('../Models/user')
const auth = require('../Auth/auth')
const infrastructure = require('../../fabcar/api/api.js');
const student_placeholder = {
    entity_name: "user",
    entity_type: "faculty_member",
    first_name : "Marek",
  last_name : "Drab",
  email : "xdrabm@stuba.sk",
  academic_degree : "Bc.",
  private_email : "marek.drab@gmail.com",
}

router.route('/')
    .get( async (req, res) => {
        let result  = await student.getAllStudents(req)
        res.json(result)

    })
    .post( async (req, res) => {
       let result = await student.addStudent(req)
       res.json(result)
    })

router.route('/:id')
    .get( async (req, res) => {
        try {
            let result = await user.getUserById(req)
            res.json(result)
        } catch (e) {
            res.json(e)
        }
    })
    // TODO - edit studenta
    .put( async (req, res) => {
        try {
            let result = await user.updateUser(req)
            res.json(result)
          } catch (e) {
            res.json(e)
          }
    })
    .delete( async (req, res) => {
        try {
            let result = await user.deleteUser(req)
            res.statusCode(204)
        } catch (e) {
            res.json(e)
        }
    })

router.get('/programme/:program_id', async (req, res) => {
    //let result = await student.getStudentByProgramId(req) 
    //res.send(result)
    res.json([student_placeholder, student_placeholder])
})

router.post('/:id/course/:course_id', async (req, res) => {
    res.json(req.body)
})
module.exports = router