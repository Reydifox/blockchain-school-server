module.exports = main;

'use strict';

const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require('path');

// creates a new user identity for user 'username'
// works by creating a new file system wallet with the given identity
async function main(username = 'testuser') {
    try {

        let result = {};

        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caURL = ccp.certificateAuthorities['ca.org1.example.com'].url;
        const ca = new FabricCAServices(caURL);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userIdentity = await wallet.get(username);
        if (userIdentity) {
            result.message =  `An identity for the user ${username} already exists in the wallet`;
            result.result = false;
            return result;
        }

        // Check to see if we've already enrolled the admin user.
        // The admin user need to exist within the network to register other users.
        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            result.result = false;
            result.message = 'An identity for the admin user "admin" does not exist in the wallet. Run enrollAdmin.js first.';
            return result;
        }

        // build a user object for authenticating with the CA
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'admin');

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({
            affiliation: 'org1.department1',
            enrollmentID: username,
            role: 'client'
        }, adminUser);
        const enrollment = await ca.enroll({
            enrollmentID: username,
            enrollmentSecret: secret
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };
        await wallet.put(username, x509Identity);
        result.message =  `Successfully registered and enrolled admin user ${username} and imported it into the wallet`;
        result.result = true;
        return result;

    } catch (error) {
        console.error(`Failed to register user : ${error}`);
        process.exit(1);
    }
}

// main();
