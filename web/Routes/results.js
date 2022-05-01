const express = require('express')
const router = express.Router()

const grading_record = {
  score : 1,
  created : 1651341121,
}
const result = {
  student_id : 1,
  final_result : "A",
  midterm_result : true,
  grading_records : [grading_record, grading_record]
}


router.get('/:course_id', async (req, res) => {
  res.json([result, result])
})

router.route('/:course_id/:student_id')
    .get(async (req, res) => {
      res.json(result)
    })
    .post(async (req, res) => {
      res.json(req.body)
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