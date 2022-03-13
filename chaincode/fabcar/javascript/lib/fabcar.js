'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async initLedger(ctx) {
        let students = [
            {
                "first_name" : "Janko",
                "last_name" : "Hrasko",
            },
            {
                "first_name" : "Ferko",
                "last_name" : "Mrkvicka",
            },
            {
                "first_name" : "Juraj",
                "last_name" : "Janosik",
            }
        ]
        let index = 0;
        for (let student of students){
            let temp_student = JSON.stringify(student);
            await ctx.stub.putState("student_" + index, temp_student);
            index++;
        }
    }

    async getStudent(ctx, student_id){
        let student = await ctx.stub.getState(student_id);
        return student.toString();
    }

    async putStudent(ctx, id, first_name, last_name){
        let full_name = first_name + " " + last_name;
        await ctx.stub.putState(id, full_name);
        return full_name;
    }

    async getAllStudents(ctx){
        const start_key = '';
        const end_key = '';
        const all_results = [];
        for await (const {key, value} of ctx.stub.getStateByRange(start_key, end_key)){
            const str_value = Buffer.from(value).toString('utf-8')
            let record;
            try{
                record = JSON.parse(str_value)
            } catch(error){
                console.log(error);
                record = str_value;
            }
            all_results.push({Key : key, Record : record});
        }
        console.info(all_results)
        return JSON.stringify(all_results);
    }

    async queryStudentsByName(ctx, full_name){
        let arr_full_name = full_name.split(" ");
        let first_name = arr_full_name[0];
        let last_name = arr_full_name[1];
        let query_string = {};
        query_string.selector = {
            "first_name" : first_name,
            "last_name" : last_name
        }
        let iterator = await ctx.stub.getQueryResult(JSON.stringify(query_string));
        let result = await this.getIteratorData(iterator);
        return JSON.stringify(result);
    }

    async queryStudentsById(ctx, id){
        let query_string = {};
        query_string.selector = {
            "_id" : "student_" + id
        }
        let iterator = await ctx.stub.getQueryResult(JSON.stringify(query_string));
        let result = await this.getIteratorData(iterator);
        return JSON.stringify(result);
    }

    async getIteratorData(iterator){
        let result_array = [];

        while(true){
            let res = await iterator.next();
            let resJSON = {};

            console.log(res);

            // MY_COMMENT
            // elements of res
            // res.value
            // res.value.key
            // res.value.value

            if(res.value && res.value.value.toString()){
                resJSON.key = res.value.key;
                resJSON.value = JSON.parse(res.value.value.toString('utf-8'));
                result_array.push(resJSON);
            }

            if(res.done){
                await iterator.close()
                break;
            }
        }

        return result_array;
    }

    

}

module.exports = FabCar;
