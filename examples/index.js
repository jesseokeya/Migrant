const Migrant = require('../index')

const context = new Migrant({
    /** Database uri your migrating from  **/
    up: 'mongodb://healthbrain:healthbrain@ds255258.mlab.com:55258/healthbraindev',
    /** Database uri our migrating to **/
    down: 'mongodb+srv://jesseokeya:ov6CCAcEWxpMaXKw@cluster0-gseyx.mongodb.net/test?retryWrites=true&w=majority'
})

/** performs database migration **/
context.migrate()
