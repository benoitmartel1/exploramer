// Put variables in global scope to make them available to the browser console.
const constraints = (window.constraints = {
  video: {
    pan: true,
    tilt: true,
    zoom: true,
  },
})

function handleSuccess(stream) {
  const video = document.querySelector('video')

  const videoTracks = stream.getVideoTracks()
  console.log('Got stream with constraints:', constraints)
  console.log(`Using video device: ${videoTracks[0].label}`)
  video.srcObject = stream

  // make track variable available to browser console.
  const [track] = ([window.track] = stream.getVideoTracks())
  track.applyConstraints({ advanced: [{ zoom: 30, brightness: -15 }] })
  const capabilities = track.getCapabilities()
  const settings = track.getSettings()

  for (const ptz of ['focusMode', 'focusDistance', 'brightness', 'zoom']) {
    // Check whether camera supports pan/tilt/zoom.
    if (!(ptz in settings)) {
      errorMsg(`Camera does not support ${ptz}.`)
      continue
    }

    // Map it to a slider element.
    const capability = document.querySelector(`div[name=${ptz}]`)
    const input = capability.querySelector('input')
    const value = capability.querySelector('.value')
    if (capabilities[ptz].step) {
      input.min = capabilities[ptz].min
      input.max = capabilities[ptz].max
      input.step = capabilities[ptz].step
      input.value = settings[ptz]
      value.innerHTML = input.value
    } else {
      value.innerHTML = settings[ptz]
      input['checked'] = settings[ptz] == 'continuous' ? 0 : 1
    }

    if (input['type'] == 'range') {
      input.oninput = async (event) => {
        try {
          value.innerHTML = input.value
          const constraints = { advanced: [{ [ptz]: input.value }] }
          await track.applyConstraints(constraints)
        } catch (err) {
          console.error('applyConstraints() failed: ', err)
        }
      }
    } else {
      input.oninput = async (event) => {
        try {
          value.innerHTML = input['checked'] == false ? 'continuous' : 'manual'
          const constraints = { advanced: [{ [ptz]: value.innerHTML }] }
          await track.applyConstraints(constraints)
        } catch (err) {
          console.error('applyConstraints() failed: ', err)
        }
      }
    }
  }
}

function handleError(error) {
  if (error.name === 'NotAllowedError') {
    errorMsg(
      'Permissions have not been granted to use your camera, ' +
        'you need to allow the page access to your devices in ' +
        'order for the demo to work.'
    )
  }
  errorMsg(`getUserMedia error: ${error.name}`, error)
}

function errorMsg(msg, error) {
  console.error(error)
  //   const errorElement = document.querySelector('#errorMsg')
  //   errorElement.innerHTML += `<p>${msg}</p>`
  //   if (typeof error !== 'undefined') {
  //     console.error(error)
  //   }
}

async function initCameraControls(e) {
  //   console.log('Init Camera Controls')
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints)

    handleSuccess(stream)

    // e.target.disabled = true
  } catch (e) {
    handleError(e)
  }
}
window.addEventListener('load', function (event) {
  console.log('loaded')
  //   initCameraControls()
  var myInt = setInterval(() => {
    console.log('check if video')
    const video = document.querySelector('video')

    if (video) {
      this.clearInterval(myInt)
      initCameraControls()
    }
  }, 2000)
})

// document.querySelector('#showVideo').addEventListener('click', (e) => init(e))
