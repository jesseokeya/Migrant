require("colors");
const Migrant = require("../../lib");
const { Command, flags } = require("@oclif/command");

class HealthbrainMigrantCommand extends Command {
  async run() {
    // const { flags } = this.parse(HealthbrainMigrantCommand);
    this.log('\n                       🚀 ', ` Migrant `.white.bold.inverse, '🚀 \n')
    this.log(`Perform MongoDb Migrations Easily. Use --help flag to learn more \n`.white.bold.inverse);
  }
}

HealthbrainMigrantCommand.description = `Describe the command here
Perform mongoDb migrations easily
Give us a star on github 
https://github.com/jesseokeyahealthbrain/Migrant
`;

HealthbrainMigrantCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({ char: "v" }),
  // add --help flag to show CLI version
  help: flags.help({ char: "h" }),
  migrate: flags.string({ char: "n", description: "performs database migration from up to down" })
};

module.exports = HealthbrainMigrantCommand;
