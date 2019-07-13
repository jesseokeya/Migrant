require("colors");
const Migrant = require("../../lib");
const { Command, flags } = require("@oclif/command");

class HealthbrainMigrantCommand extends Command {
  async run() {
    const { flags } = this.parse(HealthbrainMigrantCommand);
    // const name = flags.name || "world"; 
    this.log('\n                       🚀 ', ` Migrant `.white.bold.inverse, '🚀 \n')
    this.log(`Perform MongoDb Migrations Easily. Use --help flag to learn more \n`.white.bold.inverse);
  }
}

HealthbrainMigrantCommand.description = `Describe the command here
...
Extra documentation goes here
`;

HealthbrainMigrantCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({ char: "v" }),
  // add --help flag to show CLI version
  help: flags.help({ char: "h" }),
  name: flags.string({ char: "n", description: "name to print" })
};

module.exports = HealthbrainMigrantCommand;
