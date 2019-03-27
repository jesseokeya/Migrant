require('colors')
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
    if (e.message.includes('E11000 duplicate key error collection')) {
      console.log(` Warning: ${e.message} `.yellow)
    } else {
      console.log(` ${e.message} `.red)
      throw e
    }
  }

}

module.exports = Migrate
