const express = require('express')
const router = express.Router()
const role = {
  id : 1,
  name : "Meno",
  definition: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
}


router.route('/')
  .get(async (req, res) => {
    res.json([role, role])
  })
  .post(async (req, res) => {
    res.send('roleAdded')
  })
router.route('/:id')
  .get(async (req, res) => {
    res.json(role)
  })
  .put(async (req, res) => {
    res.send('roleUpdated')
  })
  .delete(async (req, res) => {
    res.send('roleDeleted')
  })

module.exports = router