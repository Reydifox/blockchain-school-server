const auth = require('../Auth/auth')
const infrastructure = require('../../fabcar/api/api.js');
const helpers = require('../Helpers/helpers');
const { updateUser } = require('../Models/user');
const role = require('../Models/role')


module.exports = {
    get_bearer: function(req) {
        const bearerHeader = req.headers.authorization
        if (bearerHeader) {
            return bearerHeader.split(' ')[1]
        }
    },
    get_userInfo: async function(email,password) {
        const user = await infrastructure.getUserSession(email,password);
        return user;
    },
    post_updateUser: async function(req){
        const result = await infrastructure.updateUser(req);
        return result;
    },
    get_userRole: async function(user_id){
        let role = await infrastructure.getEntity(user_id.split('_')[0], user_id)
        let system_credibilities = await helpers.getSystemCredibilities(role.system_credibility_id)
        let returnValue = system_credibilities
        return returnValue
    }
    
    // getUserById: async function (req) {
    //     let user = await infrastructure.getEntity(auth.get_bearer(req), req.params.id)
    //     if ('address_id' in user) {
    //         let address = await helpers.getAddress(user.address_id)
    //         user.address = address
    //     }
    //     return user
    // },
}