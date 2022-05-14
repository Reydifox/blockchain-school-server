const auth = require('../Auth/auth')
const infrastructure = require('../../fabcar/api/api.js');
const helpers = require('../Helpers/helpers');

module.exports = {
    getAllRoles: async function (req) {
        let result = await infrastructure.getAllEntities('admin','user_role')
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
        let result = await infrastructure.putEntity('admin', role)
        role.id = result.id
        return role
    },
    getUserRoleById: async function (req) {
        let role = await infrastructure.getEntity('admin', req.params.id)
        let system_credibilities = await helpers.getSystemCredibilities(role.system_credibility_id)
        role.system_credibilities = system_credibilities
        return role
    },
    deleteUserRole: async function (req) {
        let result = await infrastructure.deleteEntity('admin',req.params.id)
        return result
    },
    getAllCreditibilities: async function (req) {
        let result = await infrastructure.getAllEntities('admin','system_credibility')
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
        let role = await infrastructure.getEntity('admin',req.params.id)
        role.name = req.body.name,
        role.definition = req.body.definition,
        role.system_credibility_id = credibilities
    
        let result = await infrastructure.updateEntity('admin',role)
        if (result.data.ok) {
            return role
        }
        return result
    }
}