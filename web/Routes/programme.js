const express = require('express')
const router = express.Router()
const programme = {
  id : 1,
  name : "Aplikovana informatika",
  acronym : "API",
}

router.route('/')
  .get(async (req, res) => {
    res.json([programme, programme])
  })
  .post(async (req, res) => {
    res.send('newProgramme')
  })

router.route('/:id')
  .get(async (req, res) => {
    res.json(programme)
  })
  .put(async (req, res) => {
    res.send('programmeUpdated')
  })
  .delete(async (req, res) => {
    res.send('deleted')
  })
module.exports = router