var express = require('express')
var cors = require('cors')

var bodyParser = require('body-parser')
var app = express()
// var port = 3030

app.use(cors())
app.use(bodyParser.json()) // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })) // to support URL-encoded bodies
app.use(express.json()) // to support JSON-encoded bodies
app.use(express.static('public'))

const sqlite3 = require('sqlite3').verbose()

console.log(sqlite3)
console.log('Connecting...')

//Initial connect to db
let db = new sqlite3.Database(
  './settings.db',
  sqlite3.OPEN_READWRITE,
  (err) => {
    //if db doesnt exist...
    if (err && err.code == 'SQLITE_CANTOPEN') {
      //create db
      createDatabase()
      return
    } else if (err) {
      console.log('Getting error ' + err)
      //exit(1);
    }
    console.log('Connected to the in-memory SQlite database.')
  }
)

function createDatabase() {
  //Create db only if doesnt exist...
  var newdb = new sqlite3.Database('./settings.db', (err) => {
    if (err) {
      console.log('Getting error ' + err)
      //   exit(1);
    }
    newdb.exec(
      `CREATE TABLE settings(id, parcours, experience, langue);
		INSERT INTO settings (id, parcours, experience, langue) VALUES(1,8,0,'fr');`,
      () => {
        // callback
      }
    )
  })
}

async function getDBConnection() {
  //Connect to db
  const db = new sqlite3.Database(
    './settings.db',
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        return console.error(err.message)
      }
    }
  )
  return db
}

app.get('/api/settings', async function (req, res) {
  let db = await getDBConnection()
  let authors = await db.all('SELECT * from settings', (err, settings) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      console.log('request received...')
      res.send({ settings })
    }
  })
})

//If the incoming post path is /api/settings, the update all settings with provided parameters
app.post('/api/settings', async function (req, res) {
  let db = await getDBConnection()
  //   console.log(req.body)
  //   res.send('ok-post')
  let authors = await db.all(
    `UPDATE settings SET "${req.body.setting}"="${req.body.value}" WHERE id=1 RETURNING *`,
    (err, settings) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      } else {
        res.send({ settings })
      }
    }
  )
})

module.exports = app
