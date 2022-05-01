const express = require('express')
const router = express.Router()
const lecturer = require('../Models/lecturer')
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
router.route('/')
  .get(async (req, res) => {
    res.json([person, person])
  })
  .post(async (req, res) => {
    res.json(req.body)
  })

router.get('/:id', async (req, res) => {
  res.json(person)
})

router.get('/:id/courses', async (req, res) => {
  res.json([course, course])
})

module.exports = router