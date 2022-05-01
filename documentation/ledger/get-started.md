## Overview
This project is using [Hyperledger fabric](https://hyperledger-fabric.readthedocs.io/) and [NodeJS](https://nodejs.org/). Hyperledger tools were designed to run unix-like systems. We strictly recommend to run this project on linux distribution.
Project was tested on ubuntu, xubuntu and debian. Recommended operating system for this project is **ubuntu**.
::: note
In the following link, you can download pre-installed virtual operating system: [Images](https://virtual-machines.github.io/).
:::

## Installation
Project repository can be found here: [Github](https://github.com/Reydifox/blockchain-school-server). This solution is based on Hyperledger framework and NodeJS server. All the prerequisites can be found here: https://hyperledger-fabric.readthedocs.io/en/latest/prereqs.html
Installation can be done manualy (if using any other unix system instead of ubuntu) or you can run install script. The following manual how to run this project, includes auto install script for ubuntu. Should work on xubuntu or lubuntu also.

1. Open terminal and log in as a root by `sudo su` command.
2. Clone the repository using `git clone https://github.com/Reydifox/blockchain-school-server`.
3. Navigate to the root project folder and run `./install.sh` in terminal.
4. Check if docker is installer by command `docker --version` and `docker-compose --version`

## Deploy
If all the prerequisites are installed, run the following commands to start the ledger and node server.
1. Type into the console `./startServer.sh` to start the server.
2. Blockchain platform will be initialized and if no error occured, the node server will start.
3. The web interface should now be available at localhost:5000
4. An admin user for the network will be created automatically when starting the server, however at least one other user needs to be created to be able to query the ledger. This is done by navigating to localhost:5000/register and registering via the form.
NOTE: please make sure ```enroll_admin()``` is not commented out in index.js.
5. Various queries can be run by navigating to different URLs, see available get/post mappings in the web/index.js file

::: warning
#### <i class="fa fa-warning"></i> Caution
If you are trying to re-deploy the ledger and for any reason the start process has been interrupted. Try at first use a clean script by typing `./clean.sh` in the project's root folder. Script will try to stop and clean created docker images and also will clean generated javascript environment. Those two mentioned steps are in the most cases general problem.
:::