#!/bin/bash
if [ $1 == "--dev" ]; then
    echo "Setting up test data into ledger.."
    sudo sed -i "8i const default_entities = [
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
        
        for(let entity of default_entities){
            const id = entity._id;
            delete entity._id;
            const temp_entity = JSON.stringify(entity);
            await ctx.stub.putState(id, temp_entity);
        }" /chaincode/fabcar/javascript/lib/fabcar.js
fi
echo "Starting fabric.."
cd fabcar
./startFabric.sh javascript
echo "Setting up DB..."
cd config
node setupDb.js
cd ..
rm -rf wallet/*
cd config
echo "Setting up API..."
node setupApi.js
echo "Starting node server.."
cd ../../web
node index.js
echo "Execution done!"
