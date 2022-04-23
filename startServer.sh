#!/bin/bash
echo "Starting fabric.."
cd fabcar
./startFabric.sh javascript
echo "Starting node server.."
cd ../web
node index.js
echo "Execution done!"
