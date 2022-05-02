'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async initLedger(ctx) {
        console.log("initLedger running...")
    }

    async getEntity(ctx, entity_id){
        const full_response = await ctx.stub.getState(entity_id)
        return full_response.toString()
    }

    async putEntity(ctx, entity_id, entity){
        const full_response = await ctx.stub.putState(entity_id, Buffer.from(JSON.stringify(entity)))
    }

    async deleteEntity(ctx, entity_id){
        const response = await ctx.stub.deleteState(entity_id)
        return response
    }

    async getAllEntities(ctx, entity_name){
        const start_key = '';
        const end_key = '';
        const all_results = [];
        const result = {}
        for await (const {key, value} of ctx.stub.getStateByRange(start_key, end_key)){
            const str_value = Buffer.from(value).toString('utf-8')
            let record;
            try{
                record = JSON.parse(str_value)
            } catch(error){
                console.log(error);
                record = str_value;
            }
            if (key.startsWith(entity_name)){
                all_results.push({Key : key, Record : record});
            }   
        }
        result.result = all_results
        return result
    }

    async getIteratorData(iterator){
        let result_array = [];

        while(true){
            let res = await iterator.next();
            let resJSON = {};

            console.log(res);

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
