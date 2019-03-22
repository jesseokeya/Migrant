const colors = require('colors')
const Run = require('./run')

class Migrate extends Run {
  constructor (options = {}) {
    const params = { up: options.up.trim(), down: options.down.trim() }
    super({ ...params, colors })
  }

  async migrate () {
    try {
      return this.execute()
    } catch (err) {
      throw err
    }
  }

}

module.exports = Migrate
