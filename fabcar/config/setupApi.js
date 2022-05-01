const enrollAdmin = require('../javascript/enrollAdmin')
const registerUser = require('../javascript/registerUser')

const main = async () => {
    const systemWallets = ['auth', 'student']
    await enrollAdmin()
    systemWallets.forEach(async wallet => await registerUser(wallet))
}

main()