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

describe('Infrastructure API', function () {
    
    describe('putEntity', function () {
        it('should return true when returned entity array size is not 0', async function () {
            for(let entity of course_result_entities){
                await api.putEntity('admin', entity);
            }
            const received_ents = await api.getAllEntities('admin', 'course_result');
            assert.notEqual(received_ents.result.length, 0);
        });
    });

    describe('getAllEntities', function () {
        it('should return true when all the created entities match the received list', async function () {
            const received_ents = await api.getAllEntities('admin', 'course_result');
            assert.equal(received_ents.result.length, course_result_entities.length);
        });
    });

    describe('getEntity', function () {
        it('should return true when the entities match', async function () {
            const received_ents = await api.getAllEntities('admin', 'course_result');
            const ent = await api.getEntity('admin', received_ents.result[2]._id);
            assert.equal(ent.student_id, received_ents.result[2].student_id);
        });
    });

    describe('updateEntity', function () {
        it('should return true when the entity has been updated', async function () {
            const received_ents = await api.getAllEntities('admin', 'course_result');

            let ent = await api.getEntity('admin', received_ents.result[0]._id);
            ent.student_id = course_result_entities[0].student_id;
            api.updateEntity('admin', ent);
    
            const new_ent = await api.getEntity('admin', course_result_0_id);
            assert.equal(new_ent.student_id, course_result_entities[0].student_id);
        });
    });

    describe('deleteEntity', function () {
        it('should return true when the entity was deleted', async function () {
            const all_ents = await api.getAllEntities('admin', 'course_result');
            for(let entity of all_ents.result){
                await api.deleteEntity('admin', entity._id);
            }

            const received_ents = await api.getAllEntities('admin', 'course_result');
            assert.equal(received_ents.result.length, 0);
        });
    });

    describe('createUser', function () {
        it('should return true when all the created entities match the received list', async function () {
            for(let entity of user_entities){
                await api.createUser(entity);
            }
            const users = await api.getAllEntities('admin', 'user');
            assert.equal(users.result.length, user_entities.length + 2); // created two users on init
        });
    });

    describe('updateUser', function () {
        it('should return true when the user have been updated', async function () {
            const users = await api.getAllEntities('admin', 'user');
            let user_0_id = users.result[0]._id;

            let ent = await api.getEntity('admin', user_0_id);
            ent.first_name = 'Abdul';
            api.updateUser('admin', ent);

            const new_ent = await api.getEntity('admin', user_0_id);
            assert.equal(new_ent.result.first_name, user_entities[0].first_name);
        });
    });

    describe('getUserSession', function () {
        it('should return -1 when the value is not present', async function () {
            const user = await api.getUserSession(user_entities[0].email, user_entities[0].password);
            assert.equal(user.email, user_entities[0].email);
        });
    });

    describe('deleteUser', function () {
        it('should return true when the user was deleted', async function () {
            const all_ents = await api.getAllEntities('admin', 'user');
            for(let entity of all_ents.result){
                await api.deleteEntity('admin', entity._id);
            }

            const users = await api.getAllEntities('admin', 'user');
            assert.equal(users.result.length, 0);
        });
    });
});