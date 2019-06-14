const Facepointer = window.Facepointer
let loadedDeps = false

/**
 * Entry point to setting up this instance
 */
Facepointer.prototype.setup = function () {
  this.loadDependencies()
  this.cleanConfig()
  this.createDebugger()
}

/**
 * Cleans and sanitizes the config with defaults
 */
Facepointer.prototype.cleanConfig = function (config) {
  this._config = config
  config = Object.assign({

  }, config)
  this.config = config
}

/**
 * Load the Weboji head tracker
 */
Facepointer.prototype.loadDependencies = function () {
  if (!loadedDeps) {
    const $script = document.createElement('script')
    $script.async = true
    $script.onload = () => {
      loadedDeps = true
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
  $wrap.appendChild($canvas)

  document.body.appendChild($wrap)
}