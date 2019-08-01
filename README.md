# Mongo Migrant
### Perform mongoDb migrations easily


![](/images/screenshot.png)

## Getting Started

### Installing

Install node dependecies required

```
npm install mongo-migrant --save
```

Inorder to use the command line tools you have to install mongo-migrant globally

```
npm install mongo-migrant -g
```

### Usage

```js
const Migrant = require('../index')

const context = new Migrant({
    /** Database uri your migrating from  **/
    up: process.env.UP,
    /** Database uri our migrating to **/
    down: process.env.DOWN
})

/** performs database migration **/
context.migrate()
```` 

### CLI Usage

Type command in terminal or command line

Displays current version of mongo-migrate

```sh
mongo-migrant --version
```

Displays command line usage / docs

```sh
mongo-migrant --help
```

Performs mongo database migration

```sh
mongo-migrant --up='database_uri_your_migrating_from' --down='database_uri_your_migrating_to'
```

## Authors
* **Jesse Okeya** - *Initial work* - [jesseokeya](https://github.com/jesseokeya)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
* Hat tip to anyone whose code was used
* oclif 
* mongoClient
