const Migrant = require('../index')

const context = new Migrant({
    /** Database uri your migrating from  **/
    up: process.env.UP,
    /** Database uri our migrating to **/
    down: proccess.env.DOWN
})

/** performs database migration **/
context.migrate()
