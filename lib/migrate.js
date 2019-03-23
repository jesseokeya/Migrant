const colors = require('colors')
const mongoClient = require('mongodb').MongoClient
const Run = require('./run')

class Migrate extends Run {
  constructor(options = {}) {
    super({
      colors,
      up: options.up.trim(),
      down: options.down.trim(),
      mongoClient
    })
  }

  async migrate() {
    try {
      return this.execute()
    } catch (err) {
      throw err
    }
  }

}

module.exports = Migrate
