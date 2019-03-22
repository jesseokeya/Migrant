const mongoose = require('mongoose')
const colors = require('colors')
const Run = require('./run')

class Migrate extends Run {
  constructor (options = {}) {
    const params = { up: options.up, down: options.down }
    super({ ...params, mongoose, colors })
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
