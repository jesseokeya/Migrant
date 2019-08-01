const { isEmpty } = require("lodash");
const { Command, flags } = require("@oclif/command");
const { description } = require("../util");
const Migrant = require("../../index");

class MigrantCommand extends Command {
  async run() {
    try {
      const { flags } = this.parse(MigrantCommand);
      if (isEmpty(flags)) {
        const message = "invalid command. use the migrant --help flag";
        this.error(message);
        this.log(description);
      } else {
        const { up, down } = flags;
        if (!isEmpty(up) && !isEmpty(down)) {
          const ctx = new Migrant({ up, down });
          await ctx.migrate();
        }
      }
    } catch (err) {
      throw err;
    }
  }
}

MigrantCommand.description = `Perform mongoDb migrations easily
Make sure your database uri permissions give you read write access

Give us a star on github 
https://github.com/jesseokeya/Migrant
`;

MigrantCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({ char: "v" }),
  // add --help flag to show CLI version
  help: flags.help({ char: "h" }),
  up: flags.string({
    char: "u",
    description:
      "specifies the database your migrating from and is dependent on the --down flag",
    hidden: false,
    multiple: false,
    dependsOn: ["down"]
  }),
  down: flags.string({
    char: "d",
    description:
      "specifies the database your migrating to and is dependent on the --up flag",
    multiple: true,
    hidden: false,
    multiple: false,
    dependsOn: ["up"]
  })
};

module.exports = MigrantCommand;
