const express = require('express')
const router = express.Router()
const student = require('../Models/student')
const auth = require('../Auth/auth')
const student_placeholder = {
    id : 1,
    first_name : "Meno",
    last_name : "Priezvisko",
    study_programme : "API",
    study_form : "denna",
    study_type : "B",
    study_field : "MSUS"
}

router.route('/')
    .get( async (req, res) => {
        //let result = await student.getAllStudents(req)
        //res.send(result.toString())
        res.json([student_placeholder, student_placeholder])
    })
    // TODO - pridanie studenta
    .post( async (req, res) => {
        res.send(req.body)
    })

router.route('/:id')
    .get( async (req, res) => {
        //let result = await student.getStudentById(req)
        //res.send(result.toString())
        res.json(student_placeholder)
    })
    // TODO - edit studenta
    .put( async (req, res) => {
        res.send(req.body)
    })
    // TODO - delete studenta
    .delete( async (req, res) => {
        res.send("deleted")
    })

router.get('/programme/:program_id', async (req, res) => {
    //let result = await student.getStudentByProgramId(req) 
    //res.send(result)
    res.json([student_placeholder, student_placeholder])
})

router.post('/:id/course/:course_id', async (req, res) => {
    res.send("1")
})
module.exports = router