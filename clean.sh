#!/bin/bash
echo "Cleaning docker container for Fabric.."
docker stop $(docker ps -a -q)
docker rm -f $(docker ps -a -q)
echo "Done"
