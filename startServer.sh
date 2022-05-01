#!/bin/bash
echo "Starting fabric.."
cd fabcar
./startFabric.sh javascript
echo "Setting up DB..."
cd config
node setupDb.js
echo "Setting up API..."
node setupApi.js
echo "Starting node server.."
cd ../../web
node index.js
echo "Execution done!"
