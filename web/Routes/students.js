const express = require('express')
const router = express.Router()
const student = require('../Models/student')
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
        console.log(result)
        res.json(result)

    })
    .post( async (req, res) => {
       let result = await student.addStudent(req)
       res.json(result)
    })

router.route('/:id')
    .get( async (req, res) => {
        let result = await student.getStudentById(req)
        res.json(student_placeholder)
    })
    // TODO - edit studenta
    .put( async (req, res) => {
        res.json(req.body)
    })
    // TODO - delete studenta
    .delete( async (req, res) => {
        res.sendStatus(204)
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