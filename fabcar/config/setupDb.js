const createDb = require('./createDb')
const createViews = require('./setupCouchViews')

async function main(){
    await createDb()
    createViews()
}

main()