const auth = require('../Auth/auth')
const infrastructure = require('../../fabcar/api/api.js');
const helpers = require('../Helpers/helpers');


module.exports = {
  getAllCourses: async function (req) {
    let courses  = await infrastructure.getAllEntities(auth.get_bearer(req),'course')
    return courses.result
  },
  getCourseById: async function (req) {
    let course = await infrastructure.getEntity(auth.get_bearer(req), req.params.id);
    if ('garant_id' in course) {
      let garant = await infrastructure.getEntity(auth.get_bearer(req), course.garant_id)
      course.garant = garant;
    }
    console.log(course.garant);

    if ('prerequisite_course_id' in course) {
      if(Array.isArray(course.prerequisite_course_id) && course.prerequisite_course_id.length) {
        let coursePrerequisites = []
        console.log(course.prerequisite_course_id);
        for (let item in course.prerequisite_course_id) {
          let courseId = course.prerequisite_course_id[item];
          let tmp_course = await infrastructure.getEntity(auth.get_bearer(req), courseId);
          console.log(tmp_course);
          coursePrerequisites.push(tmp_course);
        }
      course.prerequisite_course = coursePrerequisites;
      console.log(course.prerequisite_course);
      }
    }
    return course;
  },
  addCourse: async function (req) {
    let course = {
      garant_id: req.body.garant_id,
      name: req.body.name,
      acronym: req.body.acronym,
      description: req.body.description,
      trimester: req.body.trimester,
      prerequisite_course_id: req.body.prerequisite_course_id,
    };
    course.entity_name = 'course';
    let result = await infrastructure.putEntity('admin', course);
    return course;
  },
  setGarant: async function (req) {
    let course = await infrastructure.getEntity(auth.get_bearer(req), req.params.id);
    if ('garant_id' in req.body) {
      let garant = await infrastructure.getEntity(auth.get_bearer(req), req.body.garant_id);
      course.garant = garant;
      course.garant_id = req.body.garant_id;
      result = await infrastructure.updateEntity(auth.get_bearer(req), course);
    }
    return result;
  },
  addPrerequisite: async function(req) {
    let course = await infrastructure.getEntity(auth.get_bearer(req), req.params.id);
    if ('prerequisite_course_id' in req.body) {
      if(Array.isArray(course.prerequisite_course_id) && course.prerequisite_course_id.length) {
        course.prerequisite_course_id.push(req.body.prerequisite_course_id);
      }
      else{
        course.prerequisite_course_id = req.body.prerequisite_course_id;
      }
      result = await infrastructure.updateEntity(auth.get_bearer(req), course);
    }
    return result;
  },

};