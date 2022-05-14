#!/bin/bash
echo "Downloading tools.."
apt-get update
apt-get -y install git
apt-get -y install curl
apt-get -y install npm
apt-get -y install nodejs
apt-get -y install golang
apt-get -y install docker-compose
apt-get -y install docker.io
echo "Starting docker.."
systemctl start docker
systemctl enable docker
usermod -a -G docker root
echo "Preparing javascript environment.."
cd ./fabcar/javascript
sudo npm install
cd ../config
sudo npm install
cd ../test
sudo npm install
cd ../../web
sudo npm install
sudo npm install bcrypt --unsafe-perms
sudo npm install --save cors
sudo npm install express-session
echo "Downloading Hyperledger Fabric.."
cd ../../
curl -sSL https://bit.ly/2ysbOFE | bash -s
echo "Installation done! Now you can run startServer.sh"
