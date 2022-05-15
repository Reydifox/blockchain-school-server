const auth = require('../Auth/auth')
const infrastructure = require('../../fabcar/api/api.js');
const helpers = require('../Helpers/helpers');


module.exports = {
  getAllCourses: async function (req) {
    let courses  = await infrastructure.getAllEntities('admin','course')
    return courses.result
  },
  getCourseById: async function (req) {
    let course = await infrastructure.getEntity('admin', req.params.id);
    let garant = {}
    if ('garant_id' in course && course.garant_id != null) {
      garant = await infrastructure.getEntity('admin', course.garant_id)
    }
    course.garant = garant;
    console.log(course.garant);
    let coursePrerequisites = []
    if ('prerequisite_course_id' in course && course.prerequisite_course_id != null) {
      if(Array.isArray(course.prerequisite_course_id) && course.prerequisite_course_id.length) {
        console.log(course.prerequisite_course_id);
        for (let item in course.prerequisite_course_id) {
          let courseId = course.prerequisite_course_id[item];
          let tmp_course = await infrastructure.getEntity('admin', courseId);
          console.log(tmp_course);
          coursePrerequisites.push(tmp_course);
        }
      }
    }
    if ('lecturer_id' in course && course.lecturer_id != null) {
      var lecturer = await infrastructure.getEntity('admin', course.lecturer_id)
    } else {
      var lecturer = {}
    }
    course.lecturer = lecturer
    course.prerequisite_course = coursePrerequisites;
    console.log(course.prerequisite_course);
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
      lecturer_id: req.body.lecturer_id,
    };
    course.entity_name = 'course';
    let result = await infrastructure.putEntity('admin', course);
    return course;
  },
  editCourseById: async function(req) {
    let course = await infrastructure.getEntity('admin', req.params.id);
    course.garant_id = req.body.garant_id;
    course.name = req.body.name;
    course.acronym = req.body.acronym;
    course.description = req.body.description;
    course.trimester = req.body.trimester;
    course.prerequisite_course_id = req.body.prerequisite_course_id;
    result = await infrastructure.updateEntity('admin', course);
    return result;
  },
  deleteCourse: async function(req) {
    let result = await infrastructure.deleteEntity('admin', req.params.id);
    return result
  },
  setGarant: async function (req) {
    let course = await infrastructure.getEntity('admin', req.params.id);
    if ('garant_id' in req.body) {
      let garant = await infrastructure.getEntity('admin', req.body.garant_id);
      course.garant = garant;
      course.garant_id = req.body.garant_id;
      result = await infrastructure.updateEntity('admin', course);
    }
    return result;
  },
  addPrerequisite: async function(req) {
    let course = await infrastructure.getEntity('admin', req.params.id);
    if ('prerequisite_course_id' in req.body) {
      if(Array.isArray(course.prerequisite_course_id) && course.prerequisite_course_id.length) {
        course.prerequisite_course_id.push(req.body.prerequisite_course_id);
      }
      else{
        course.prerequisite_course_id = req.body.prerequisite_course_id;
      }
      result = await infrastructure.updateEntity('admin', course);
    }
    return result;
  },
  getGarantCourses: async function(req) {
    let allCoursesResult  = await infrastructure.getAllEntities('admin','course');
    let allCourses = allCoursesResult.result;
    let garantCourses = []
    if(Array.isArray(allCourses) && allCourses) {
      for (i in allCourses) {
        if ('garant_id' in allCourses[i]) {
          if (allCourses[i].garant_id == req.params.id) {
            garantCourses.push(allCourses[i]);
          }
        }
      }
    }
    return garantCourses;
  },

  getLecturerCourses: async function(req) {
    let allCoursesResult  = await infrastructure.getAllEntities('admin','course');
    let allCourses = allCoursesResult.result;
    let lecturerCourses = []
    if(Array.isArray(allCourses) && allCourses) {
      for (i in allCourses) {
        if ('lecturer_id' in allCourses[i]) {
          for (id in allCourses[i].lecturer_id){
            if (allCourses[i].lecturer_id[id] == req.params.id) {
              lecturerCourses.push(allCourses[i]);
              break;
            }
          }
        }
      }
    }
    return lecturerCourses;
  },

  getStudentCourses: async function(req) {
    let allCourseResultsResult  = await infrastructure.getAllEntities('admin','course_result');
    let allCourseResults = allCourseResultsResult.result;
    let studentCourses = []
    if(Array.isArray(allCourseResults) && allCourseResults) {
      for (i in allCourseResults){
        if (allCourseResults[i].student_id == req.params.id) {
          let course = await infrastructure.getEntity('admin', allCourseResults[i].course_id);
          studentCourses.push(course);
        }
      }
    }
    return studentCourses;
  },
  getCourseStudents: async function (req) {
    let allCourseResultsResult  = await infrastructure.getAllEntities('admin','course_result');
    let allCourseResults = allCourseResultsResult.result;
    let courseStudents = [];
    if(Array.isArray(allCourseResults) && allCourseResults) {
      for (i in allCourseResults){
        if (allCourseResults[i].course_id == req.params.id) {
          let student = await infrastructure.getEntity('admin', allCourseResults[i].student_id);
          courseStudents.push(student);
        }
      }
    }
    return courseStudents;
  }
};