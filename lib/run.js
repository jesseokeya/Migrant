class Run {
  constructor({ up, down, mongoClient }) {
    this.mongoClient = mongoClient
    console.log('\n         🚀 ', ` Migrant `.white.bold.inverse, '🚀 \n\n ')
    this._initialize({ up, down })
    this.start = new Date()
    this.hrstart = process.hrtime()
    this.simulateTime = 5
  }

  async execute() {
    try {
      const { up, down } = await this.databases()
      const result = await this.insertDocuments({ up, down })
      return result
    } catch (err) {
      this._handle(err)
    }
  }

  async collections() {
    try {
      let { up, down } = await this.databases()
      up = await up.listCollections().toArray()
      down = await down.listCollections().toArray()
      return { up, down }
    } catch (err) {
      this._handle(err)
    }
  }

  async databases() {
    try {
      let up = await this.up
      let down = await this.down
      return {
        up: await up.db(),
        down: await down.db()
      }
    } catch (err) {
      this._handle(err)
    }
  }

  async insertDocuments({ up, down }) {
    try {
      console.log(`\n Step 2 (create necessary collection(s)) ✓ \n`.underline.green.inverse.bold)
      const collections = await up.listCollections().toArray()
      let multiplePromises = [
        ...collections.map(({ name }) => {
          console.log(` Created collection ${name} for ${down.s.databaseName} database ✓`.underline.cyan)
          return down.createCollection(name)
        })
      ]
      await Promise.all(multiplePromises)
      console.log(`\n Step 3 (perform data base migration(s)) ✓ \n`.underline.green.inverse.bold)
      const ctx = collections.map(async ({ name }) => {
        const context = await up.collection(name)
        const collectionData = await context.find().toArray()
        return this._performMigration({ db: down, name, data: collectionData }).then(
          _ => console.log(` Successfully migrated collection ${name} from ${up.s.databaseName} to ${down.s.databaseName} database ✓`.underline.blue)
        )
      })
      await Promise.all(ctx)
      return { up, down }
    } catch (err) {
      this._handle(err)
    }
  }

  async _performMigration({ db, name, data }) {
    try {
      return new Promise(resolve => {
        db.collection(name).insertMany([...data], (err, result) => {
          if (err) { this._handle(err) }
          resolve(result)
        })
      })
    } catch (err) {
      this._handle(err)
    }

  }

  _initialize({ up, down }) {
    try {
      const useNewUrlParser = true
      console.log(`Step 1 (esablish database connection(s)) ✓ \n`.underline.green.inverse.bold)
      this.up = this.mongoClient.connect(up, { useNewUrlParser }).then(res => {
        console.log(` Database connection to ${res.db().databaseName} was established ✓`.underline.magenta)
        return res
      })
      this.down = this.mongoClient.connect(down, { useNewUrlParser }).then(res => {
        console.log(` Database connection to ${res.db().s.databaseName} was established ✓`.underline.magenta)
        return res
      })
    } catch (err) {
      this._handle(err)
    }
  }

  _collectionNames(collections) {
    try {
      const up = collections.up.map(collection => collection.name)
      const down = collections.down.map(collection => collection.name)
      return { up, down }
    } catch (err) {
      this._handle(err)
    }
  }

  _calculateExecutionTime() {
    try {
      const end = new Date() - this.start
      const hrend = process.hrtime(this.hrstart)
      console.log(`\n Migration Complete ✓ `.underline.cyan.inverse.bold)
      console.log(`\n Datbase Migration Complete. Execution time: ${end}ms ✓ `.green.bold)
      console.log(` Execution time (s): ${hrend[0]}s ${hrend[1] / 1000000}ms ✓ `.green.bold)
    } catch (err) {
      this._handle(err)
    }
  }
}

module.exports = Run
