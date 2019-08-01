const description = `
Perform mongoDb migrations easily

USAGE
  $ migrant

OPTIONS
  -d, --down=down  specifies the database your migrating to and is dependent on the --up flag
  -h, --help       show CLI help
  -u, --up=up      specifies the database your migrating from and is dependent on the --down flag
  -v, --version    show CLI version

DESCRIPTION
  Make sure your database uri permissions give you read write access

  Give us a star on github 
  https://github.com/jesseokeya/Migrant
  `;

  module.exports = { description }