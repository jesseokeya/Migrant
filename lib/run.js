class Run {
  constructor ({ up, down, mongoose, colors }) {
    this.mongoose = mongoose
    this.colors = colors
    try {
      this.up = mongoose.connect(up)
      this.down = mongoose.connect(down)
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
}

module.exports = Run
