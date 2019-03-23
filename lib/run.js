class Run {
  constructor({ up, down, colors, mongoClient }) {
    this.colors = colors
    this.mongoClient = mongoClient
    this._initialize({ up, down })
  }

  async execute() {
    try {
      const collections = await this.collections()
      const collectionNames = _collectionNames(collections)
      return collectionNames
    } catch (err) {
      throw err
    }
  }

  async collections() {
    try {
      let { up, down } = await this.databases()
      up = await up.listCollections().toArray()
      down = await down.listCollections().toArray()
      return { up, down }
    } catch (err) {
      throw err
    }
  }

  async databases() {
    try {
      let up = await this.up
      let down = await this.down
      return { up: await up.db(), down: await down.db() }
    } catch (err) {
      throw err
    }
  }

  _initialize({ up, down }) {
    try {
      const useNewUrlParser = true
      this.up = this.mongoClient.connect(up, { useNewUrlParser }).then(res => {
        console.log(`\n Database connection to ${res.db().databaseName} was established \n`.underline.magenta.inverse)
        return res
      })
      this.down = this.mongoClient.connect(down, { useNewUrlParser }).then(res => {
        console.log(`\n Database connection to ${res.db().s.databaseName} was established \n`.underline.cyan.inverse)
        return res
      })
    } catch (err) {
      throw err
    }
  }

  _collectionNames(collections) {
    try {
      const up = collections.up.filter(collection => collection.name)
      const down = collections.down.filter(collection => collection.name)
      return { up, down }
    } catch (err) {
      throw err
    }
  }

}

module.exports = Run
