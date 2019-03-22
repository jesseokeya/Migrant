const MongoClient = require('mongodb').MongoClient

class Run {
  constructor ({ up, down, colors }) {
    const useNewUrlParser = true
    this.colors = colors
    try {
      this.up = MongoClient.connect(
        up,
        { useNewUrlParser: true }
      ).then(res => {
        console.log(
          `\n Database connection to ${
            res.db().databaseName
          } was established \n`.underline.magenta.inverse
        )
        return res
      })
      this.down = MongoClient.connect(
        down,
        { useNewUrlParser: true }
      ).then(res => {
        console.log(
          `\n Database connection to ${
            res.db().s.databaseName
          } was established \n`.underline.cyan.inverse
        )
        return res
      })
    } catch (err) {
      throw err
    }
  }

  async execute () {
    try {
      return {
        up: await this.up,
        down: await this.down
      }
    } catch (err) {
      throw err
    }
  }

  async collections () {
    console.log(await (await this.up).db())
    const up = await (await this.up)
      .db()
      .listCollections()
      .toArray()
    const down = await (await this.down)
      .db()
      .listCollections()
      .toArray()
    return { up, down }
  }
}

module.exports = Run
