const assert = require('assert');
const api = require('../api/api.js');

const user_entities = [
    {
        user_type: 'student',
        first_name: 'Juraj',
        last_name: 'Janosik',
        email: 'janosik@stuba.sk',
        password: 'halusky'
    },
    {
        user_type: 'student',
        first_name: 'Ferko',
        last_name: 'Mrkvicka'
    },
    {
        user_type: 'faculty_member',
        first_name: 'Janko',
        last_name: 'Hrasko'
    }
];

const course_result_entities = [
    {
        entity_name: 'course_result',
        final_result_id: '0',
        student_id: 'user_0'
    },
    {
        entity_name: 'course_result',
        final_result_id: '1',
        student_id: 'user_2'
    },
    {
        entity_name: 'course_result',
        final_result_id: '2',
        student_id: 'user_2'
    },
    {
        entity_name: 'course_result',
        final_result_id: '3',
        student_id: 'user_3'
    }
];

describe('Infrastructure API tests', function () {
    
    describe('putEntity', function () {
        it('should put entities into the persistance', async function () {
            for(let entity of course_result_entities){
                await api.putEntity('admin', entity);
            }
            const received_ents = await api.getAllEntities('admin', 'course_result');
            assert.notEqual(received_ents.result.length, 0);
        });
    });

    describe('getAllEntities', function () {
        it('should get all the entities put in the persistance', async function () {
            const received_ents = await api.getAllEntities('admin', 'course_result');
            assert.equal(received_ents.result.length, course_result_entities.length);
        });
    });

    describe('getEntity', function () {
        it('should get a certain entity', async function () {
            const received_ents = await api.getAllEntities('admin', 'course_result');
            const ent = await api.getEntity('admin', received_ents.result[2]._id);
            assert.equal(ent.student_id, received_ents.result[2].student_id);
        });
    });

    describe('updateEntity', function () {
        it('should update a certain entity data', async function () {
            const received_ents = await api.getAllEntities('admin', 'course_result');

            let ent = await api.getEntity('admin', received_ents.result[0]._id);
            // retrieve original entity based on the student id of the retrieved entity
            const original_ent = course_result_entities.filter(elem => elem.student_id === ent.student_id)[0]
            ent.student_id = 'user_123456';
            await api.updateEntity('admin', ent);
    
            const new_ent = await api.getEntity('admin', received_ents.result[0]._id);
            assert.notEqual(new_ent.student_id, original_ent.student_id);
        });
    });

    describe('deleteEntity', function () {
        it('should delete all the entities put in the persistance', async function () {
            const all_ents = await api.getAllEntities('admin', 'course_result');
            for(let entity of all_ents.result){
                await api.deleteEntity('admin', entity._id);
            }

            const received_ents = await api.getAllEntities('admin', 'course_result');
            assert.equal(received_ents.result.length, 0);
        });
    });

    describe('createUser', function () {
        it('should create new users', async function () {
            for(let entity of user_entities){
                await api.createUser(entity);
            }
            const users = await api.getAllEntities('admin', 'user');
            assert.equal(users.result.length, user_entities.length);
        });
    });

    describe('updateUser', function () {
        it('should update a certain user data', async function () {
            const users = await api.getAllEntities('admin', 'user');
            let user_0_id = users.result[0]._id;

            let ent = await api.getEntity('admin', user_0_id);
            // retrieve original entity based on the first name of the retrieved entity
            const original_ent = user_entities.filter(elem => elem.first_name === ent.first_name)[0]
            ent.first_name = 'Abdul';
            await api.updateUser(ent);

            const new_ent = await api.getEntity('admin', user_0_id);
            assert.notEqual(new_ent.first_name, original_ent.first_name);
        });
    });

    describe('getUserSession', function () {
        it('should get user session on successful login', async function () {
            const user = await api.getUserSession(user_entities[0].email, user_entities[0].password);
            assert.equal(user.email, user_entities[0].email);
        });
    });

    describe('deleteUser', function () {
        it('should delete all the users put in the persistance', async function () {
            const all_ents = await api.getAllEntities('admin', 'user');
            for(let entity of all_ents.result){
                await api.deleteEntity('admin', entity._id);
            }

            const users = await api.getAllEntities('admin', 'user');
            assert.equal(users.result.length, 0);
        });
    });
});