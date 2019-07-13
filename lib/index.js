require('colors')

const mongoClient = require('mongodb').MongoClient
const Run = require('./run')

/** 
 * Migrate class handles database migration through custom methods
 * 
 * @param options
 *
 */
class Migrate extends Run {
  constructor(options = {}) {
    super({ up: options.up.trim(), down: options.down.trim(), mongoClient })
    const methods = [this.migrate, this._handle]
    methods.forEach(method => method.bind(this))
  }

  /**
   * Performs database migration and calcuates migration execution time
   * @throws {Exception} throws an error if error occurs
   * 
   */
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

  /**
   * Handles error and warnings througout the appliaction
   * @throws {Exception} prints and throws an error if error occurs
   * 
   */
  _handle(err) {
    const message = err.message
    if (message.includes('E11000 duplicate key error collection')) {
      console.log(` Warning: ${message} `.yellow)
    } else {
      console.log(` Error: ${message} `.red)
    }
  }
}

module.exports = Migrate
