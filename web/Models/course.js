const auth = require('../Auth/auth')
const infrastructure = require('../../fabcar/api/api.js');
const helpers = require('../Helpers/helpers');


module.exports = {
  getAllCourses: async function (req) {
    let courses  = await infrastructure.getAllEntities(auth.get_bearer(req),'course')
    return courses.result
  },
  getCourseById: async function (req) {
    let course = await infrastructure.getEntity(auth.get_bearer(req), req.params.id)
    if ('lecturers' in course) {
      //TODO
    }
    if ('prerequisites' in course) {
      //TODO
    }
    return course
  },
  addCourse: async function (req) {
    if ('prerequisities_course_ids' in req.body){
      //TODO
    }
    let course = {
      garant_id: req.body.garant_id,
      name: req.body.name,
      acronym: req.body.acronym,
      description: req.body.description,
      trimester: req.body.trimester,
      prerequisite_course_ids: req.body.prerequisite_course_ids,
    }
    course.entity_name = 'course'
    let result = await infrastructure.putEntity('admin', course)
    return course
  },

};