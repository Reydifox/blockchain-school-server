#!/bin/bash
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
echo "Running infrastructural tests"
cd ../test
sudo npm test
echo "Starting node server.."
cd ../../web
node index.js
echo "Execution done!"
