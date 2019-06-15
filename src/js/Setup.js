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
    autostart: false
  }, config)
  this.config = config
}

/**
 * Initialize properties
 */
Facepointer.prototype.initProps = function () {
  Facepointer.numInstances = Facepointer.numInstances ? Facepointer.numInstances + 1 : 1
  this.id = Facepointer.numInstances
  this.trackerSDK = null
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
    $script.src = 'js/jeelizFaceTransfer.js'
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