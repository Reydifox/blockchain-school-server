#!/bin/bash
echo "Cleaning docker container for Fabric.."
docker stop $(docker ps -a -q)
docker rm -f $(docker ps -a -q)
echo "Cleaning ledger build.."
cd ./fabcar/javascript
rm -rf node_modules
rm package-lock.json
sudo npm install
cd ../config
rm -rf node_modules
rm package-lock.json
sudo npm install
cd ../test
rm -rf node_modules
rm package-lock.json
sudo npm install
echo "Cleaning node server build.."
cd ../../web
rm -rf node_modules
rm package-lock.json
sudo npm install bcrypt --unsafe-perms
sudo npm install express-session
sudo npm install
sudo npm install --save cors
echo "Done"
