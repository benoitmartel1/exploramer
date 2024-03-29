const path = require('path')
var fs = require('fs')
const os = require('os')

const userHomeDir = os.homedir()
const destDir = path.join(
  userHomeDir,
  'AppData/Roaming/Microsoft/Windows/Start Menu/exploramer.bat'
)

const srcDir = path.join(
  path.dirname(path.dirname(__dirname)),
  'exploramer.bat'
)
fs.stat(destDir, (err, stat) => {
  if (err) {
    fs.copyFile(srcDir, destDir, (err) => {
      if (err) {
        console.error(err)
      }
    })
  } else {
    console.log('Exploramer.bat already exists.')
  }
})

const http = require('http')
const { Nuxt, Builder } = require('nuxt')
let config = require('./nuxt.config.js')
config.rootDir = __dirname // for electron-builder
// Init Nuxt.js
const nuxt = new Nuxt(config)
const builder = new Builder(nuxt)
const server = http.createServer(nuxt.render)
// Build only in dev mode
if (config.dev) {
  builder.build().catch((err) => {
    console.error(err) // eslint-disable-line no-console
    process.exit(1)
  })
}
// Listen the server
server.listen(3000)

/*
 ** Electron
 */
let win = null // Current window
const electron = require('electron')

// const path = require('path')

//Define entry point with settings as args
const _NUXT_URL_ = `http://localhost:${server.address().port}/exploramer/`

const app = electron.app
const newWin = () => {
  win = new electron.BrowserWindow({
    width: 1280,
    height: 1920,
    frame: false,
    autoHideMenuBar: true,
    alwaysOnTop: true,
    fullscreen: true,
    kiosk: true,
    webPreferences: {
      nodeIntegration: true,
      devTools: true,
    },
    icon: path.join(__dirname, 'favicon.ico'),
  })
  win.webContents.on('before-input-event', (event, input) => {
    if (input.type == 'keyUp' && input.key == 'Escape') {
      console.log('closing...')
      win.close()
    }
  })
  win.on('closed', () => (win = null))
  if (config.dev) {
    console.log('is CONFIG DEV')
    // Install vue dev tool and open chrome dev tools
    const {
      default: installExtension,
      VUEJS_DEVTOOLS,
    } = require('electron-devtools-installer')
    installExtension(VUEJS_DEVTOOLS.id)
      .then((name) => {
        console.log(`Added Extension:  ${name}`)
        win.webContents.openDevTools()
      })
      .catch((err) => console.log('An error occurred: ', err))
    // Wait for nuxt to build
    const pollServer = () => {
      http
        .get(_NUXT_URL_, (res) => {
          if (res.statusCode === 200) {
            win.loadURL(_NUXT_URL_)
          } else {
            setTimeout(pollServer, 300)
          }
        })
        .on('error', pollServer)
    }
    pollServer()
  } else {
    console.log('is NOT CONFIG DEV')
    return win.loadURL(_NUXT_URL_)
  }
}
app.on('ready', newWin)
app.on('window-all-closed', () => {
  //   app.relaunch()
  app.exit()
})
app.on('activate', () => win === null && newWin())
