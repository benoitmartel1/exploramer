/*
 **  Nuxt
 */
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
server.listen()

/*
 ** Electron
 */
let win = null // Current window
const electron = require('electron')
const path = require('path')

const fs = require('fs')

const isDev = false

//Define entry point with settings as args
const _NUXT_URL_ = `http://localhost:${server.address().port}`

const app = electron.app
const newWin = () => {
  win = new electron.BrowserWindow({
    width: 1280 * 0.4,
    height: 1920 * 0.4,
    frame: true,
    autoHideMenuBar: true,
    //  fullscreen: settings.kiosk_mode,
    //  kiosk: settings.kiosk_mode,
    webPreferences: {
      nodeIntegration: true,
      devTools: true,
    },
    icon: path.join(__dirname, 'static/icon.png'),
  })
  console.log(win)
  win.on('closed', () => (win = null))
  if (config.dev) {
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
    return win.loadURL(_NUXT_URL_)
  }
}
app.on('ready', newWin)
app.on('window-all-closed', () => app.quit())
app.on('activate', () => win === null && newWin())
