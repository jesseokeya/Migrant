const Migrant = require('../index')

const migrant = new Migrant({
    up: 'mongodb://workbench:workbench1@ds145093.mlab.com:45093/workbench',
    down: 'mongodb://codefront:codefront@ds129776.mlab.com:29776/codefront'
})

migrant.migrate()