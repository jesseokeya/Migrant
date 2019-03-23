const colors = require('colors')
const mongoClient = require('mongodb').MongoClient
const Run = require('./run')

class Migrate extends Run {
  constructor(options = {}) {
    super({ up: options.up.trim(), down: options.down.trim(), mongoClient })
  }

  async migrate() {
    try {
      const migration = await this.execute().then(ctx => {
        this._calculateExecutionTime()
        return ctx
      })
      return migration
    } catch (err) {
      this._handle(err)
    }
  }

  _handle(e) {
    console.log(` ${e.message} `.red)
  }

}

module.exports = Migrate
