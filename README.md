# How install and run this project
This solution is based on Hyperledger framework and NodeJS server. All the prerequisites can be found here: https://hyperledger-fabric.readthedocs.io/en/latest/prereqs.html
Installation can be done manualy (if using any other unix system insted of ubuntu) or you can run install script. The following manual how to run this project, includes auto install script for ubuntu. Should work on xubuntu or lubuntu also.
1. Open terminal and log in as a root by `sudo su` command.
2. Navigate to the root project folder and run `./install.sh` in terminal.
3. Check if docker is installer by command `docker --version` and `docker-compose --version`
4. If all the prerequisites are installer, run the following command `./startServer.sh` to start the server.
5. Blockchain platform will be initialized and if no error occured, the node server will start.
6. The web interface should now be available at localhost:5000
7. An admin user for the network will be created automatically when starting the server, however at least one other user needs to be created to be able to query the ledger. This is done by navigating to localhost:5000/register and registering via the form.
NOTE: please make sure ```enroll_admin()``` is not commented out in index.js.
8. Various queries can be run by navigating to different URLs, see available get/post mappings in the web/index.js file
