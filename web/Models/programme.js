const auth = require('../Auth/auth')
const infrastructure = require('../../fabcar/api/api.js');
const helpers = require('../Helpers/helpers');

module.exports = {
    getAllProgramme: async function (req) {
        let result = await infrastructure.getAllEntities(auth.get_bearer(req),'study_programme')
        return result.result
    },
    addProgramme: async function (req) {
        let programme = {
            name: req.body.name,
            entity_name:"study_programme",
            acronym:req.body.acronym
        }
        let result = await infrastructure.putEntity(auth.get_bearer(req), programme)
        programme.id = result.id
        return programme
    },
    getProgrammeById: async function (req) {
        let result = await infrastructure.getEntity(auth.get_bearer(req), req.params.id)
        return result
    },
    updateProgramme: async function (req) {
        let programme = await this.getProgrammeById(req)
        programme.name = req.body.name
        programme.acronym = req.body.acronym
        let result = await infrastructure.updateEntity(auth.get_bearer(req),programme)
        return result
    },
    deleteProgramme: async function (req) {
        let result = await infrastructure.deleteEntity(auth.get_bearer(req),req.params.id)
        return result
    }
}