const auth = require('../Auth/auth')
const infrastructure = require('../../fabcar/api/api.js');
const helpers = require('../Helpers/helpers');

module.exports = {
    getAllRoles: async function (req) {
        let result = await infrastructure.getAllEntities(auth.get_bearer(req),'user_role')
        return result.result
    },
    addUserRole: async function (req) {
        let credibilities = []
        if ('system_credibilities' in req.body) {
            if (Array.isArray(req.body.system_credibilities)) {
                req.body.system_credibilities.forEach (item => {
                    credibilities.push(item)
                })
            }
        }
        let role = {
            name: req.body.name,
            entity_name:"user_role",
            definition:req.body.definition,
            system_credibility_id: credibilities
        }
        let result = await infrastructure.putEntity(auth.get_bearer(req), role)
        role.id = result.id
        return role
    },
    getUserRoleById: async function (req) {
        let role = await infrastructure.getEntity(auth.get_bearer(req), req.params.id)
        let system_credibilities = await helpers.getSystemCredibilities(role.system_credibility_id)
        role.system_credibilities = system_credibilities
        return role
    },
    deleteUserRole: async function (req) {
        let result = await infrastructure.deleteEntity(auth.get_bearer(req),req.params.id)
        return result
    },
    getAllCreditibilities: async function (req) {
        let result = await infrastructure.getAllEntities(auth.get_bearer(req),'system_credibility')
        return result.result
    },
    updateUserRole: async function (req) {
        let credibilities = []
        if ('system_credibilities' in req.body) {
            if (Array.isArray(req.body.system_credibilities)) {
                req.body.system_credibilities.forEach (item => {
                    credibilities.push(item)
                })
            }
        }
        let role = {
            _id: req.params.id,
            name: req.body.name,
            definition:req.body.definition,
            system_credibility_id: credibilities
        }
        let result = await infrastructure.updateEntity(auth.get_bearer(req),role)
        return result
    }
}