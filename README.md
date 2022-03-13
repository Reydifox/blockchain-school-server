# Very basic showcase of a web interface for Hyperledger Fabric
Before trying to launch any of the examples in this repo, please follow the [official Hyperledger Fabric setup guide](https://hyperledger-fabric.readthedocs.io/en/release-2.2/getting_started.html)
Besides the tools mentioned in the linked setup guide, you will also need to have Node.js installed.

# How to launch the example
1. Launch the 'fabcar' example network by navigating to /fabcar/ and running the 'startFabric.sh' script.
2. Go to /fabcar/javascript/ and run enrollAdmin.js and registerUser.js ('node enrollAdmin.js', analogically for registerUser.js)
3. Launch the web server by navigating to /web/ and typing the command 'node index.js'
4. You should be able to access the index.html page in your web browser at localhost:5000