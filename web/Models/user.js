const auth = require('../Auth/auth')
const infrastructure = require('../../fabcar/api/api.js');
const helpers = require('../Helpers/helpers');
var crypto = require('crypto')

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
        if ('study_programme_id' in user) {
            let programme = await infrastructure.getEntity('admin',user.study_programme_id)
            user.study_programme = programme
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
        if (req.body.password != null) {
            let password = req.body.password; 
            var hash = crypto.createHash('md5').update(password).digest('hex')
        } else {
            var hash = req.body.password
        }
        let user_role_id = undefined
        if ('user_role_id' in req.body && req.body.user_role_id != null) {
            user_role_id = req.body.user_role_id
        } 
        let user = {
            user_type: req.body.user_type,
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            email : req.body.email,
            academic_degree : req.body.academic_degree,
            private_email : req.body.private_email,
            password: hash,
            address_id: address_id._id,
            user_role_id: user_role_id
        }
        let result = await infrastructure.createUser(user)
        user._id = result.user_id
        return user
    },
    getAllUsers: async function (req) {
        let users  = await infrastructure.getAllEntities('admin','user')
        for (let user in users.result){ 
            if ('user_role_id' in users.result[user] && users.result[user].user_role_id != null) {
                let role = await infrastructure.getEntity('admin',users.result[user].user_role_id)
                users.result[user].user_role = role
            }
          };
        return users.result
    },
    updateUser: async function (req) {
        let user = await infrastructure.getEntity('admin',req.params.id)
        let user_request = req.body
        
        user_request._id = user._id
        user_request._rev = user._rev

        let result_address = await infrastructure.updateEntity('admin',req.body.address)
        if ('user_role' in req.body ) {
            console.log(req.body)
            delete req.body.user_role
            console.log('------------------------')
            console.log(req.body)
        } 
        if ('study_programme' in req.body ) {
            console.log(req.body)
            delete req.body.study_programme
            console.log('------------------------')
            console.log(req.body)
        } 
        if (user_request.password != null || user_request.password != "") {
            var password = user_request.password
            var hash = crypto.createHash('md5').update(password).digest('hex')
            user_request.password = hash
        } else {
            delete user_request.password 
        }

        let result = await infrastructure.updateUser(user_request)
        
        return result
      },
}