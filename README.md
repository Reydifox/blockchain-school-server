# How to use this basic example
1. Navigate to fabcar/ and run 'startFabric.sh javascript' to start the Fabric network
2. Launch the web server by navigating to web/ and running 'node index.js'
3. The web interface should now be available at localhost:5000
4. An admin user for the network will be created automatically when starting the server, however at least one other user needs to be created to be able to query the ledger. This is done by navigating to localhost:5000/register and registering via the form.
NOTE: please make sure ```enroll_admin()``` is not commented out in index.js.
5. Various queries can be run by navigating to different URLs, see available get/post mappings in the web/index.js file
