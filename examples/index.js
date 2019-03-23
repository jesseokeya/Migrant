const Migrant = require('../index')

const migrant = new Migrant({
    up: 'mongodb://workbench:workbench1@ds145093.mlab.com:45093/workbench',
    down: ' mongodb://codefront:codefront123@ds249311.mlab.com:49311/codefront'
})

migrant.migrate()