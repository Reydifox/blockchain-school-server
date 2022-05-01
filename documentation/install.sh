#!/bin/bash
echo "Downloading tools.."
apt-get update
apt-get -y install nodejs
sudo npm install -g aglio
echo "Installation done! Now you can run generate.sh"
