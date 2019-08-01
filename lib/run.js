/**
 * Run class performs all the critical actions needed to perform a migration sucessfully
 *
 * @param {Object} params
 * @param {String} params.up - database uri your migrating from
 * @param {String} params.down - database uri your migrating to
 * @param {Object} mongoClient - mongodb context object
 *
 */
class Run {
  constructor({ up, down, mongoClient }) {
    this.mongoClient = mongoClient;
    console.log("\n         🚀 ", ` Migrant `.white.bold.inverse, "🚀 \n\n ");
    this._initialize({ up, down });
    this.start = new Date();
    this.hrstart = process.hrtime();
    this.simulateTime = 5;
    const methods = [...this._methods(), this._methods];
    methods.forEach(method => method.bind(this));
  }

  /**
   * Executes database migration
   *
   * @returns {Promise<{Object}>} params
   * @throws {Exception} throws an error if error occurs
   *
   */
  async execute() {
    try {
      const { up, down } = await this.databases();
      const result = await this._insertDocuments({ up, down });
      return result;
    } catch (err) {
      this._handle(err);
    }
  }

  /**
   * Retrieves all collections in databases { up, down }
   *
   * @returns {Promise<{Object}>} params
   * @throws {Exception} throws an error if error occurs
   *
   */
  async collections() {
    try {
      let { up, down } = await this.databases();
      up = await up.listCollections().toArray();
      down = await down.listCollections().toArray();
      return { up, down };
    } catch (err) {
      this._handle(err);
    }
  }

  /**
   * Returns the mongo database context for each database
   * Other operations can also be performed after return
   *
   * @returns {Promise<{Object}>}
   * @throws {Exception} throws an error if error occurs
   *
   */
  async databases() {
    try {
      let up = await this.up;
      let down = await this.down;
      return {
        up: await up.db(),
        down: await down.db()
      };
    } catch (err) {
      this._handle(err);
    }
  }

  /**
   *
   * Private method that performes migration by creating collections and moving
   * documents from the up to the down database
   *
   * @param {Object} params
   * @param {Promise<{Object}>} params.up - mongo database context
   * @param {Promise<{Object}>} params.down - mongo database context
   *
   * @returns {Promise<{Object}>}
   * @throws {Exception} throws an error if error occurs
   *
   */
  async _insertDocuments({ up, down }) {
    try {
      console.log(
        `\n Step 2 (create necessary collection(s)) ✓ \n`.underline.green
          .inverse.bold
      );
      const collections = await up.listCollections().toArray();
      let multiplePromises = [
        ...collections.map(({ name }) => {
          if (!name.includes("system.indexes")) {
            console.log(
              ` Created collection ${name} for ${
                down.s.databaseName
              } database ✓`.underline.cyan
            );
            return down.createCollection(name);
          }
        })
      ];
      await Promise.all(multiplePromises);
      console.log(
        `\n Step 3 (perform database migration(s)) ✓ \n`.underline.green.inverse
          .bold
      );
      const ctx = collections.map(async ({ name }) => {
        if (!name.includes("system.indexes")) {
          const context = await up.collection(name);
          const collectionData = await context.find().toArray();
          return this._performMigration({
            db: down,
            name,
            data: collectionData
          }).then(_ =>
            console.log(
              ` Successfully migrated collection ${name} from ${
                up.s.databaseName
              } to ${down.s.databaseName} database ✓`.underline.blue
            )
          );
        }
      });
      await Promise.all(ctx);
      return { up, down };
    } catch (err) {
      this._handle(err);
    }
  }

  /**
   *
   * Private method that performes migration for each individual collection
   *
   * @param {Object} params
   * @param {Promise<{Object}>} params.db - database context
   * @param {String} params.name - collection name
   * @param {[Object]} params.data - data to be migrated
   *
   * @returns {Promise<{Object}>}
   * @throws {Exception} throws an error if error occurs
   *
   */
  async _performMigration({ db, name, data }) {
    try {
      return new Promise(resolve => {
        db.collection(name).insertMany([...data], (err, result) => {
          if (err) {
            this._handle(err);
          }
          resolve(result);
        });
      });
    } catch (err) {
      this._handle(err);
    }
  }

  /**
   *
   * Private metod which connects to the mongo database via the uri { up, down }
   *
   * @param {Object} params
   * @param {Promise<{Object}>} params.up - mongo database context
   * @param {Promise<{Object}>} params.down - mongo database context
   *
   * @throws {Exception} throws an error if error occurs
   *
   */
  _initialize({ up, down }) {
    try {
      const useNewUrlParser = true;
      console.log(
        `Step 1 (esablish database connection(s)) ✓ \n`.underline.green.inverse
          .bold
      );
      this.up = this.mongoClient.connect(up, { useNewUrlParser }).then(res => {
        console.log(
          ` Database connection to ${
            res.db().databaseName
          } database was established ✓`.underline.magenta
        );
        return res;
      });
      this.down = this.mongoClient
        .connect(down, { useNewUrlParser })
        .then(res => {
          console.log(
            ` Database connection to ${
              res.db().s.databaseName
            } database was established ✓`.underline.magenta
          );
          return res;
        });
    } catch (err) {
      this._handle(err);
    }
  }

  /**
   *
   * Filters collections returning only an array of collection names
   *
   * @param {[Object]} collections - list of all collections from a praticular database
   *
   * @returns {[String]} an array of collection names
   * @throws {Exception} throws an error if error occurs
   *
   */
  _collectionNames(collections) {
    try {
      const up = collections.up.map(collection => collection.name);
      const down = collections.down.map(collection => collection.name);
      return { up, down };
    } catch (err) {
      this._handle(err);
    }
  }

  /**
   *
   * Private method that calculates and prints how long the migration took in milliseconds and seconds
   * @throws {Exception} throws an error if error occurs
   *
   */
  _calculateExecutionTime() {
    try {
      if (!this.errorOccured) {
        const end = new Date() - this.start;
        const hrend = process.hrtime(this.hrstart);
        console.log(`\n Migration Complete ✓ `.underline.cyan.inverse.bold);
        console.log(
          `\n Datbase Migration Complete. Execution time: ${end}ms ✓ `.green
            .bold
        );
        console.log(
          ` Execution time (s): ${hrend[0]}s ${hrend[1] / 1000000}ms ✓ `.green
            .bold
        );
      }
    } catch (err) {
      this._handle(err);
    }
  }

  /**
   *
   * Private method that returns a list of all methods in the current class
   * @throws {Exception} throws an error if error occurs
   *
   */
  _methods() {
    try {
      return [
        this.execute,
        this.collections,
        this.databases,
        this._insertDocuments,
        this._performMigration,
        this._initialize,
        this._collectionNames,
        this._calculateExecutionTime
      ];
    } catch (err) {
      this._handle(err);
    }
  }
}

module.exports = Run;
