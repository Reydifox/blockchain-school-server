const assert = require('assert');
const enroll_admin = require('../javascript/enrollAdmin.js');
const api = require('../api/api.js');

const user_entities = [
    {
        _id: 'user_0',
        user_type: 'student',
        first_name: 'Juraj',
        last_name: 'Janosik'
    },
    {
        _id: 'user_1',
        user_type: 'student',
        first_name: 'Ferko',
        last_name: 'Mrkvicka'
    },
    {
        _id: 'user_2',
        user_type: 'faculty_member',
        first_name: 'Janko',
        last_name: 'Hrasko'
    }
];

const course_result_entities = [
    {
        _id: 'course_result_0',
        entity_name: 'course_result',
        final_result_id: '0',
        student_id: 'user_0'
    },
    {
        _id: 'course_result_1',
        entity_name: 'course_result',
        final_result_id: '1',
        student_id: 'user_2'
    },
    {
        _id: 'course_result_2',
        entity_name: 'course_result',
        final_result_id: '2',
        student_id: 'user_2'
    }
];

var course_result_0_id = -1;
var user_0_id = -1;

describe('Infrastructure API', function () {
    describe('enroll_admin', function () {
        it('should return true when admin is created', async function () {       
            await enroll_admin()
        });
    });
    
    describe('putEntity', function () {
        it('should return true when returned entity array size is not 0', async function () {
            for(let entity of course_result_entities){
                await api.putEntity('admin', entity);
            }
    
            const ents = await api.getAllEntities('admin', 'course_result');
            assert.notEqual(ents.length, 0);
        });
    });

    describe('getAllEntities', function () {
        it('should return true when all the created entities match the received list', async function () {
            const ents = await api.getAllEntities('admin', 'course_result');
            
            let passed = 0;
            for(let i = 0; i < ents.length; i++) {
                var ent = ents[i];
    
                for(let entity of course_result_entities){
                    if(ent.student_id === entity.student_id){
                        passed++;
                    }
                    i++;
                };
            }
            assert.equal(ents.length, passed);
        });
    });

    describe('getEntity', function () {
        it('should return true when the entities match', async function () {
            const ents = await api.getAllEntities('admin', 'course_result');
            const ent = await api.getEntity('admin', ents[2]._id);
            assert.equal(course_result_entities.indexOf(2).student_id, ent.student_id);
        });
    });

    describe('updateEntity', function () {
        it('should return true when the entity has been updated', async function () {
            const ents = await api.getAllEntities('admin', 'course_result');
            course_result_0_id = ents[0]._id;

            let ent = await api.getEntity('admin', course_result_0_id);
            ent.student_id = 'user_2';
            api.updateEntity('admin', ent);
    
            const new_ent = await api.getEntity('admin', course_result_0_id);
            assert.equal(new_ent.student_id, course_result_entities.indexOf(0).student_id);
        });
    });

    describe('deleteEntity', function () {
        it('should return true when the entity was deleted', async function () {
            await api.deleteEntity('admin', course_result_0_id);
            const ents = await api.getAllEntities('admin', 'course_result');

            assert.notEqual(ents.length, 3);;
        });
    });

    describe('createUser', function () {
        it('should return true when all the created entities match the received list', async function () {
            for(let entity of user_entities){
                await api.createUser(entity);
            }
            const users = await api.getAllEntities('admin', 'user');
    
            let passed = 0;
            for(let i = 0; i < users.length; i++) {
                let ent = ents[i];
    
                for(let entity of course_result_entities){
                    if(ent.first_name === entity.first_name){
                        passed++;
                    }
                    i++;
                };
            }
            assert.equal(users.length, passed);
        });
    });

    describe('updateUser', function () {
        it('should return true when the user have been updated', async function () {
            const users = await api.getAllEntities('admin', 'user');
            user_0_id = ents[0]._id;

            let ent = await api.getEntity('admin', user_0_id);
            ent.first_name = 'Abdul';
            api.updateUser('admin', ent);

            const new_ent = await api.getEntity('admin', user_0_id);
            assert.equal(new_ent.first_name, user_entities.indexOf(0).first_name);
        });
    });

    describe('getUserSession', function () {
        it('should return -1 when the value is not present', function () {
            // TODO
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });

    describe('deleteUser', function () {
        it('should return true when the user was deleted', async function () {
            await api.deleteEntity('admin', user_0_id);
            const ents = await api.getAllEntities('admin', 'user');

            assert.notEqual(ents.length, 3);;
        });
    });
});