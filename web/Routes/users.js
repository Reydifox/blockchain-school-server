const express = require('express')
const router = express.Router()
const user = require('../Models/user')
const role = {
  id : 1,
  name : "Meno",
  definition: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
}

const user_placeholder = {
  id : 1,
  first_name : "Meno",
  last_name : "Priezvisko",
  email : "user@mail.com",
  unique_id : 1737,
  academic_degree : "doc Ing. | PhD.",
  private_email : "user@mail.com",
  address : {
    id : 1,
    street : "Ulica",
    house_number : "6A",
    city : "Mesto",
    postal_code : "811 01",
    country : "Stat",
  },
  user_roles : [role, role],
  absolvent_status : false,
  is_student : true,
  study_info : {
    faculty : "Fakulta elektrotechniky a informatiky",
    programme : "API",
    form : "denna",
    type : "B",
    field : "MSUS",
    start_date : "1525104014",
    bank_account : "SK2846499121151829718318"
  }
}

router.route('/')
  .get(async (req, res) => {
    let result = await user.getAllUsers(req)
    res.json(result)
  })
  .post(async (req, res) => {
    let result = await user.addUser(req)
    res.json(result)
  })
router.route('/:id')
  .get(async (req, res) => {
    try {
      let result = await user.getUserById(req)
      res.json(result)
    } catch (e) {
      res.json(e)
    }
  })
  //TODO User update
  .put(async (req, res) => {
    res.json(req.body)
  })
  .delete(async (req, res) => {
    try {
      let result = await user.deleteUser(req)
      res.statusCode(204)
    } catch (e) {
        res.json(e)
    }
  })

router.put('/:id/roles', async (req, res) => {
  res.json(req.body)
})
module.exports = router