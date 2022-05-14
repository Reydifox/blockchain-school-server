const auth = require('../Auth/auth')
const infrastructure = require('../../fabcar/api/api.js');
const helpers = require('../Helpers/helpers');

module.exports = {
    getUserById: async function (req) {
        let user = await infrastructure.getEntity('admin', req.params.id)
        if ('address_id' in user) {
            let address = await helpers.getAddress(user.address_id)
            user.address = address
        }
        if ('user_role_id' in user) {
            let role = await infrastructure.getEntity('admin',user.user_role_id)
            user.user_role = role
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
            address_id: address_id._id,
            user_role_id: req.body.user_role_id
        }
        let result = await infrastructure.createUser(user)
        user._id = result.user_id
        return user
    },
    getAllUsers: async function (req) {
        let users  = await infrastructure.getAllEntities('admin','user')
        console.log(users.result)
        for (let user in users.result){ 
            if ('user_role_id' in users.result[user]) {
                let role = await infrastructure.getEntity('admin',users.result[user].user_role_id)
                users.result[user].user_role = role
            }
          };
        return users.result
    },
    updateUser: async function (req) {
        let user = await infrastructure.getEntity('admin',req.params.id)
        let user_request = req.body
        let address = req.body.address
        let address_from_db = await helpers.getAddress(user.address_id)
        console.log(address)
        console.log('------------------')
        console.log(address_from_db)
        address._id = address_from_db._id
        user_request._id = user._id
        user_request._rev = user._rev
        let result_address = await infrastructure.updateEntity(address)
        let result = await infrastructure.updateUser(user_request)
        console.log(result_address)
        //if (result.successful && result_address)
        return result
      },
}