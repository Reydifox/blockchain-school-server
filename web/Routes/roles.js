const express = require('express')
const router = express.Router()
const role = require('../Models/role')


router.route('/')
  .get(async (req, res) => {
    let result = await role.getAllRoles(req)
    res.json(result)
  })
  .post(async (req, res) => {
    let result = await role.addUserRole(req)
    res.json(result)
  })
router.route('/:id')
  .get(async (req, res) => {
    try {
      if (req.params.id == 'credibilities') {
        let result = await role.getAllCreditibilities(req)
        res.json(result)
      } else { 
        let result = await role.getUserRoleById(req)
        res.json(result)
      }
    } catch (e) {
      res.json(e)
    }
  })
  .put(async (req, res) => {
    try {
      let result = await role.updateUserRole(req)
      res.json(result)
    } catch (e) {
      res.json(e)
    }
  })
  .delete(async (req, res) => {
    try {
      let result = await role.deleteUserRole(req)
      res.sendStatus(204)
    } catch (e) {
      res.json(e)
    }  
  })
module.exports = router