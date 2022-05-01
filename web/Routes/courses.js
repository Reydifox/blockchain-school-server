const express = require('express')
const router = express.Router()
const person = {
  id : 1,
  first_name : "Meno",
  last_name : "Priezvisko",
}
const course = {
  id : 1,
  name : "Programovanie 1",
  acronym : "PROG-1",
  trimester : 1,
}
const course_detail = {
  id : 2,
  name : "Programovanie 2",
  acronym : "PROG-2",
  trimester : 2,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  garant_id : 25,
  garant_name : "Meno Priezvisko",
  lecturers: [person, person],
  prerequisites : [{
    id : 1,
    name : "Programovanie 1",
    acronym : "PROG-1",
  }]
}


router.route('/')
  .get(async (req, res) => {
    res.json([course, course])
  })
  .post(async (req, res) => {
    res.json(req.body)
  })
router.route('/:id')
  .get(async (req, res) => {
    res.json(course_detail)
  })
  .put(async (req, res) => {
    res.json(req.body)
  })
  .delete(async (req, res) => {
    res.sendStatus(204)
  })

router.get('/results/:student_id', async (req, res) => {
  res.json([course, course])
})

router.get('/results/:student_id/detail', async (req, res) => {
  res.json([course_detail, course_detail])
})

router.get('/:id/students', async (req, res) => {
  res.json([person, person])
})

router.get('/:id/file', async (req, res) => {
  res.send('1')
  //res.sendFile() //export do csv?
})

router.post('/:id/lecturer', async (req, res) => {
  res.json(req.body)
})

router.post(':id/file', async (req, res) => {
  res.send('1')
})

router.delete('/:course_id/lecturer/:lecturer_id', async (req, res) => {
  res.sendStatus(204)
})
module.exports = router