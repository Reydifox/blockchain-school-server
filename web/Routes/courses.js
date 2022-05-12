const express = require('express')
const course = require('../Models/course')
const router = express.Router()


router.route('/')
  .get( async (req, res) => {
    let result  = await course.getAllCourses(req)
    res.json(result)
  })
  .post(async (req, res) => {
    let result  = await course.addCourse(req)
    res.json(result)
  })
router.route('/:id')
  .get(async (req, res) => {
    try {
      let result  = await course.getCourseById(req)
      res.json(result)
    } catch (e) {
      res.json(e)
    }  

  })
  .put(async (req, res) => {
    res.json(req.body)
  })
  .delete(async (req, res) => {
    try {
      let result = await course.deleteCourse(req)
      res.statusCode(204)
    } catch (e) {
        res.json(e)
    }
  })

router.get('/results/:student_id', async (req, res) => {
  res.json([course1, course1])
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

router.get('/:id/garant_courses', async (req, res) => {
  try {
    let result  = await course.getGarantCourses(req)
    res.json(result)
  } catch (e) {
    res.json(e)
  }  
})

router.get('/:id/lecturer_courses', async (req, res) => {
  try {
    let result  = await course.getLecturerCourses(req)
    res.json(result)
  } catch (e) {
    res.json(e)
  }  
})

router.get('/:id/student_courses', async (req, res) => {
  try {
    let result  = await course.getStudentCourses(req)
    res.json(result)
  } catch (e) {
    res.json(e)
  }  
})


router.post('/:id/garant', async (req, res) => {
  try {
    let result  = await course.setGarant(req)
    res.json(result)
  } catch (e) {
    res.json(e)
  }  
})

router.post('/:id/prerequisite', async (req, res) => {
  try {
    let result  = await course.addPrerequisite(req)
    res.json(result)
  } catch (e) {
    res.json(e)
  }  
})

router.delete('/:course_id/lecturer/:lecturer_id', async (req, res) => {
  res.sendStatus(204)
})
module.exports = router