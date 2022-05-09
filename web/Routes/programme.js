const express = require('express')
const router = express.Router()
const programme = require('../Models/programme')

router.route('/')
  .get(async (req, res) => {
    let result = await programme.getAllProgramme(req)
    res.json(result)
  })
  .post(async (req, res) => {
    let result = await programme.addProgramme(req)
    res.json(result)
  })

router.route('/:id')
  .get(async (req, res) => {
    try {
      let result = await programme.getProgrammeById(req)
      res.json(result)
    } catch (e) {
      res.json(e)
    }
  })
  .put(async (req, res) => {
    try {
      let result = await programme.updateProgramme(req)
      res.json(result)
    } catch (e) {
      res.json(e)
    }
  })
  .delete(async (req, res) => {
    try {
      let result = await programme.deleteProgramme(req)
      res.json(result)
    } catch (e) {
      res.json(e)
    }
  })
module.exports = router