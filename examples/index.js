const Migrant = require('../index')

const context = new Migrant({
    /** Database uri your migrating from  **/
    up: 'mongodb://dafe:dafe12@ds237574.mlab.com:37574/orezime',
    /** Database uri our migrating to **/
    down: 'mongodb://orezime-admin:orezime12@cluster0-shard-00-00-qpxel.gcp.mongodb.net:27017,cluster0-shard-00-01-qpxel.gcp.mongodb.net:27017,cluster0-shard-00-02-qpxel.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
})

/** performs database migration **/
context.migrate()
