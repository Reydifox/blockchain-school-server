const auth = require('../Auth/auth')
const infrastructure = require('../../fabcar/api/api.js');
const helpers = require('../Helpers/helpers');

module.exports = {
    getUserById: async function (req) {
        let user = await infrastructure.getEntity(auth.get_bearer(req), req.params.id)
        if ('address_id' in user) {
            let address = await helpers.getAddress(user.address_id)
            user.address = address
        }
        return user
    },
    deleteUser: async function (req) {
        let result = await infrastructure.deleteUser(req.params.id)
        return result
    },
    addUser: async function (req) {
        if ('address' in req.body) {
            let address = req.body.address
            let result_address = await helpers.putAddress(address)
            let address_id = result_address._id
        } else { 
            let address_id = undefined
        }
        let user = {
            user_type: req.body.user_type,
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            email : req.body.email,
            academic_degree : req.body.academic_degree,
            private_email : req.body.private_email,
            address_id: address_id._id
        }
        let result = await infrastructure.createUser(user)
        user._id = result.user_id
        return user
    },
    getAllUsers: async function (req) {
        let users  = await infrastructure.getAllEntities(auth.get_bearer(req),'user')
        return users.result
    },
    updateUser: async function (req) {
        let user = await infrastructure.getEntity(auth.get_bearer(req),req.params.id)
        let user_request = req.body
        user_request._id = user._id
        user_request._rev = user._rev
        let result = await infrastructure.updateUser(user_request)
        return result
      },
}