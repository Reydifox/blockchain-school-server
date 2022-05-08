const infrastructure = require('../fabcar/api/api.js');

async function getLatestID(entity_name) {
   let result = await infrastructure.getAllEntities('admin', entity_name)
   return result.result[result.result.length-1]
}

async function initializeData() {
    address1 = await infrastructure.putEntity('student', {
        street: "Sturova",
        house_number: "384/4",
        city: "Stara Lubovna",
        postal_code: "06401",
        county: "Slovensko",
        entity_name:"address"
    })
    address1 = await getLatestID('address')
    console.log(address1)
    address2 = await infrastructure.putEntity('admin', {
        street: "Kukucinova",
        house_number: "217/12",
        city: "Spisska Bela",
        postal_code: "05901",
        county: "Slovensko",
        entity_name:"address"
    })
    address2 = await getLatestID('address')
    console.log(address2)
    address3 = await infrastructure.putEntity('admin', {
        street: "Sturova",
        house_number: "34/523",
        city: "Bratislava",
        postal_code: "81101",
        county: "Slovensko",
        entity_name:"address"
    })
    address3 = await getLatestID('address')
    console.log(address3)
    address4 = await infrastructure.putEntity('admin', {
        street: "Kukucinova",
        house_number: "58",
        city: "Malacky",
        postal_code: "08725",
        county: "Slovensko",
        entity_name:"address"
    })
    address4 = await getLatestID('address')
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
        password: undefined,
        academic_degree: "Bc.",
        private_email:   "marek.lunter@gmail.com",
        address_id: address2._id
    })
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
    console.log(faculty_member2)

    course = await infrastructure.putEntity('admin', {
        entity_name:"course",
        garant_id: undefined,
        name: "Progamovanie 1",
        acronym: "PROG-1",
        descriptiom: "aifoanfoaif",
        trimester: undefined,
        prerequisite_course_id: undefined
    })
    console.log(course)
    
    programme = await infrastructure.putEntity('admin', {
        entity_name:"study_programme",
        name:"Aplikovana inf",
        acronym:"API"
    })
    console.log(programme)
 
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
    course_result = await infrastructure.putEntity('admin', {
        final_result_id: "id_ajlndad",
        entity_name:"course_result",
        midterm_result_id: "aopada",
        semminar_grading_record_id:"oafpawfa",
        student_id:"unaofaef",
        course_id:"adada",
        academic_year_id: "adasda"
    })
    console.log(course_result)
    getResult = await infrastructure.getAllEntities('admin', 'course_result')
    console.log(getResult)
}

module.exports.initializeData = initializeData