const auth = require('../Auth/auth')
const infrastructure = require('../../fabcar/api/api.js');
const helpers = require('../Helpers/helpers');


module.exports = {
    getResults: async function (req) {
        let course_results  = await infrastructure.getAllEntities(auth.get_bearer(req),'course_result');
        return course_results.result;
    },
    getResult: async function (req) {
        let allCourseResultsResult  = await infrastructure.getAllEntities(auth.get_bearer(req),'course_result');
        let allCourseResults = allCourseResultsResult.result;
        if(Array.isArray(allCourseResults) && allCourseResults) {
            for (i in allCourseResults){
                if (allCourseResults[i].student_id == req.params.student_id && allCourseResults[i].course_id == req.params.course_id) {
                    return allCourseResults[i];
                }
            }
        }
        return "course result not found";
    },
    addResult: async function (req) {
        let course_result = {
            final_result: req.body.final_result,
            midterm_result: req.body.midterm_result,
            seminar_grading_record: req.body.seminar_grading_record,
            academic_year: req.body.academic_year,
            student_id: req.body.student_id,
            course_id: req.body.course_id
        }
        course_result.entity_name = 'course_result';
        let result = await infrastructure.putEntity('admin', course_result);
        return course_result;
    }
};