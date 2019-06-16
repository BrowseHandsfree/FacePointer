const Facepointer = window.Facepointer

/**
 * Entry point to setting up this instance
 */
Facepointer.prototype.setup = function (config) {
  this.addListeners()
  this.cleanConfig(config)
  this.initProps()
  this.loadDependencies()
  this.createDebugger()
  this.createPointer()
}

/**
 * Add event listeners
 */
Facepointer.prototype.addListeners = function () {
  // Maybe autostart
  this.on('dependenciesReady', () => {
    this.trackerSDK = window.JEEFACETRANSFERAPI
    this.trackerHelper = window.JEELIZ_RESIZER
    this.config.autostart && this.start()
  })
}

/**
 * Cleans and sanitizes the config with defaults
 */
Facepointer.prototype.cleanConfig = function (config) {
  this._config = config
  config = Object.assign({
    // Whether Facepointer should automatically start after instantiation
    autostart: false,
    sensitivity: {
      // A factor to adjust the cursors move speed by
      xy: 0.7,
      // How much wider (+) or narrower (-) a smile needs to be to click
      click: 0
    },
    stabilizer: {
      // How much stabilization to use: 0 = none, 3 = heavy
      factor: 1,
      // Number of frames to stabilizer over
      buffer: 30
    }
  }, config)
  this.config = config
}

/**
 * Initialize properties
 */
Facepointer.prototype.initProps = function () {
  if (!Facepointer.instances) {
    Facepointer.instances = [this]
  } else {
    Facepointer.instances.push(this)
  }
  
  this.id = Facepointer.instances.length
  this.trackerSDK = null
  this.pointer = {
    x: 0,
    y: 0,
    $el: null
  }
  this.tween = {
    x: -1,
    y: -1,
    rx: 0,
    ry: 0,
    positionList: []
  }
}

/**
 * Load the Weboji head tracker
 */
Facepointer.prototype.loadDependencies = function () {
  if (!this.trackerSDK) {
    const $script = document.createElement('script')
    $script.async = true
    $script.onload = () => {
      document.body.classList.remove('facepointer-loading')
      this.emit('dependenciesReady')
    }
    $script.src = Facepointer.libSrc + 'js/jeelizFaceTransfer.js'
    document.getElementsByTagName('head')[0].appendChild($script)
    document.body.classList.add('facepointer-loading')
  } else {
    this.emit('dependenciesReady')
  }
}

/**
 * Creates the debugger, which contains the canvas/video element
 */
Facepointer.prototype.createDebugger = function () {
  const $wrap = document.createElement('DIV')
  $wrap.classList.add('facepointer-debugger')
  
  const $canvas = document.createElement('CANVAS')
  $canvas.classList.add('facepointer-canvas')
  $canvas.setAttribute('id', `facepointer-canvas-${this.id}`)
  $wrap.appendChild($canvas)

  document.body.appendChild($wrap)
}

/**
 * Creates the cursor/pointer
 */
Facepointer.prototype.createPointer = function () {
  const $pointer = document.createElement('DIV')
  $pointer.classList.add('facepointer-pointer')
  this.pointer.$el = $pointer

  document.body.appendChild($pointer)
}

/**
 * Initializes the head tracker SDK
 */
Facepointer.prototype.initSDK = function () {
  const url = Facepointer.libSrc + 'js/jeelizFaceTransferNNC.json'
  document.body.classList.add('facepointer-loading')
  fetch(url)
  .then(model => {
    return model.json()
  })
  // Next, let's initialize the head tracker API
  .then(model => {
    this.trackerHelper.size_canvas({
      canvasId: `facepointer-canvas-${this.id}`,
      callback: videoSettings => {
        this.trackerSDK.init({
          canvasId: `facepointer-canvas-${this.id}`,
          NNCpath: JSON.stringify(model),
          videoSettings,
          callbackReady: () => {
            document.body.classList.remove('facepointer-loading')
            document.body.classList.add('facepointer-started')
            this.track()
          }
        })
      }
    })
  })
  .catch(() => console.error(`Couldn't load head tracking model at ${url}`))
}