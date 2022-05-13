const infrastructure = require('../fabcar/api/api.js');
const helpers = require('./Helpers/helpers')

async function initializeData() {
    address1 = await helpers.putAddress({
        street: "Sturova",
        house_number: "384/4",
        city: "Stara Lubovna",
        postal_code: "06401",
        county: "Slovensko",
    })
    address12 = await infrastructure.putEntity('student', {
        street: "Sturova",
        house_number: "384/4",
        city: "Stara Lubovna",
        postal_code: "06401",
        county: "Slovensko",
        entity_name:"address"
    })
    address1 = await helpers.getLatestID('address')
    console.log(address1)
    address2 = await infrastructure.putEntity('admin', {
        street: "Kukucinova",
        house_number: "217/12",
        city: "Spisska Bela",
        postal_code: "05901",
        county: "Slovensko",
        entity_name:"address"
    })
    address2 = await helpers.getLatestID('address')
    console.log(address2)
    address3 = await infrastructure.putEntity('admin', {
        street: "Sturova",
        house_number: "34/523",
        city: "Bratislava",
        postal_code: "81101",
        county: "Slovensko",
        entity_name:"address"
    })
    address3 = await helpers.getLatestID('address')
    console.log(address3)
    address4 = await infrastructure.putEntity('admin', {
        street: "Kukucinova",
        house_number: "58",
        city: "Malacky",
        postal_code: "08725",
        county: "Slovensko",
        entity_name:"address"
    })
    address4 = await helpers.getLatestID('address')
    console.log(address4)

    student1 = await infrastructure.createUser({
        user_type: "student",
        first_name: "Marek",
        last_name: "Drab",
        email:"xdrabm@stuba.sk",
        password: undefined,
        academic_degree: "Bc.",
        private_email:   "marek.drablp@gmail.com",
        address_id: address1._id
    })
    console.log(student1)

    student2 = await infrastructure.createUser({
        user_type: "student",
        first_name: "Marek",
        last_name: "Lunter",
        email:"xlunter@stuba.sk",
        password: "955db0b81ef1989b4a4dfeae8061a9a6", // originalne je to "heslo"
        academic_degree: "Bc.",
        private_email:   "marek.lunter@gmail.com",
        address_id: address2._id
    })
    student2 = await helpers.getLatestID('user')
    console.log(student2)

    faculty_member1 = await infrastructure.createUser({
        user_type: "faculty_member",
        first_name: "Andrej",
        last_name: "Hronec",
        email:"xhronec@mail.sk",
        password: undefined,
        academic_degree: "Ing.|PhD.",
        private_email:  "andrej.hronec@gmail.com",
        address_id: address3._id
    })
    faculty_member1 = await helpers.getLatestID('user')
    console.log(faculty_member1)

    faculty_member2 = await infrastructure.createUser({
        user_type: "faculty_member",
        first_name: "Jozef",
        last_name: "Kralik",
        email:"xkralik@stuba.sk",
        password: undefined,
        academic_degree: "doc. Ing.|PhD.",
        private_email:   "jozef.krail@gmail.com",
        address_id: address4._id
    })
    faculty_member2 = await helpers.getLatestID('user')
    console.log(faculty_member2)

    course1 = await infrastructure.putEntity('admin', {
        entity_name:"course",
        garant_id: undefined,
        name: "Progamovanie 1",
        acronym: "PROG-1",
        descriptiom: "aifoanfoaif",
        trimester: undefined,
        prerequisite_course_id: undefined
    })
    course1 = await helpers.getLatestID('course')
    console.log(course1)

    course2 = await infrastructure.putEntity('admin', {
        entity_name:"course",
        garant_id: undefined,
        name: "Progamovanie 2",
        acronym: "PROG-2",
        descriptiom: "prog2 desc",
        trimester: undefined,
        prerequisite_course_id: undefined
    })
    course2 = await helpers.getLatestID('course')
    console.log(course2)

    course3 = await infrastructure.putEntity('admin', {
        entity_name:"course",
        garant_id: undefined,
        name: "Programovacie Techniky",
        acronym: "PT",
        descriptiom: "PT desc",
        trimester: undefined,
        prerequisite_course_id: undefined
    })
    console.log(course3)

    course4 = await infrastructure.putEntity('admin', {
        entity_name:"course",
        garant_id: undefined,
        name: "Logika",
        acronym: "LOG",
        descriptiom: "log desc",
        trimester: undefined,
        prerequisite_course_id: undefined
    })
    console.log(course4)

    course5 = await infrastructure.putEntity('admin', {
        entity_name: "course",
        garant_id: faculty_member2._id,
        lecturer_id: [faculty_member1._id, faculty_member2._id],
        name: "testcourse",
        acronym: "TSTCRS",
        description: "test desc",
        trimester: "3",
        prerequisite_course_id: [course1._id, course2._id]
    })
    course5 = await helpers.getLatestID('course')
    console.log(course5)

    programme = await infrastructure.putEntity('admin', {
        entity_name:"study_programme",
        name:"Aplikovana inf",
        acronym:"API"
    })
    console.log(programme)
 
    programme = await infrastructure.putEntity('admin', {
        entity_name:"study_programme",
        name:"Elektrotechnika",
        acronym:"ELK"
    })
    console.log(programme)

    system_credibility = await infrastructure.putEntity('admin', {
        entity_name: "system_credibility",
        name: "Sys Credibility 1",
        definition: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    })

    system_credibility = await infrastructure.putEntity('admin', {
        entity_name: "system_credibility",
        name: "Sys Credibility 2",
        definition: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }) 

    system_credibility = await infrastructure.putEntity('admin', {
        entity_name: "system_credibility",
        name: "Sys Credibility 3",
        definition: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    })

    system_credibility = await infrastructure.putEntity('admin', {
        entity_name: "system_credibility",
        name: "Sys Credibility 4",
        definition: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    })

    system_credibility_id = await helpers.getLatestID('system_credibility')
    console.log('-----------------------')
    console.log(system_credibility_id)
    console.log('-----------------------')

    role1 = await infrastructure.putEntity('admin',{
        entity_name: "user_role",
        system_credibility_id: [system_credibility_id._id],
        name : "Rola1",
        definition: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    })
    console.log(role1)
    user_role_id = await helpers.getLatestID('user_role')
    console.log('-----------------------')
    console.log(user_role_id)
    console.log('-----------------------')

    thesis = await infrastructure.putEntity('admin', {
        entity_name:"thesis",
        authot_id: undefined,
        supervisor_id: undefined,
        title:"Test",
        abstract:"abstrakt",
        status_id:undefined,
        finish_date: "21.5.2021",
        type_id: undefined,
        file_id:undefined
    })
    thesis = await infrastructure.putEntity('admin', {
        entity_name:"thesis",
        authot_id: undefined,
        supervisor_id: undefined,
        title:"Test2",
        abstract:"abstrakt2",
        status_id:undefined,
        finish_date: "22.5.2021",
        type_id: undefined,
        file_id:undefined
    })
    console.log(thesis)
    getThesis = await infrastructure.getAllEntities('admin', 'thesis')
    console.log(getThesis)
    
    course_lecturer1 = await infrastructure.createUser({
        lecturer_id: faculty_member2._id,
        course_id: course5._id,
        lecturer_level: "Prednasajuci"
    })
    course_lecturer1 = await helpers.getLatestID('user')
    console.log(course_lecturer1)
    
    course_result1 = await infrastructure.putEntity('admin', {
        entity_name:"course_result",
        final_result: "A",
        midterm_result: "60",
        semminar_grading_record:"B",
        student_id: student2._id,
        course_id: course5._id,
        academic_year: "2022"
    })
    course_result1 = await helpers.getLatestID('course_result')
    console.log(course_result1)

    course_result2 = await infrastructure.putEntity('admin', {
        entity_name:"course_result",
        final_result: "C",
        midterm_result: "40",
        semminar_grading_record:"D",
        student_id: student2._id,
        course_id: course2._id,
        academic_year: "2022"
    })
    course_result1 = await helpers.getLatestID('course_result')
    console.log(course_result2)
}

module.exports.initializeData = initializeData