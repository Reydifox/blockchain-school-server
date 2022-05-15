const express = require('express')
const course_result = require('../Models/result')
const router = express.Router()

router.route('/')
  .get( async (req, res) => {
    let result  = await course_result.getResults(req)
    res.json(result)
  })
  .post(async (req, res) => {
    try {
      let result  = await course_result.addResult(req)
      res.json(result)
    } catch (e) {
      res.json(e)
    }  
  })

  router.put('/:id', async (req, res) => {
    try {
      let result  = await course_result.editResult(req)
      res.json(result)
    } catch (e) {
      res.json(e)
    } 
  })

  router.delete('/:id', async (req, res) => {
    try {
      let result  = await course_result.deleteResult(req)
      res.json(result)
    } catch (e) {
      res.json(e)
    } 
  })

router.get('/:course_id', async (req, res) => {
  res.json([course_result, course_result])
})

router.route('/courses/:course_id/students/:student_id')
    .get(async (req, res) => {
      try {
        let result  = await course_result.getResult(req)
        res.json(result)
      } catch (e) {
        res.json(e)
      }  
    })
    .post(async (req, res) => {
      res.json(res)
    })
    .put(async (req, res) => {
      res.json(req.body)
    })

router.route('/final/:course_id/:student_id')
    .post(async (req, res) => {
      res.json(req.body)
    })
    .put(async (req, res) => {
      res.json(req.body)
    })
    
module.exports = router