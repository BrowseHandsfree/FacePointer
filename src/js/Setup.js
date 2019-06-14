const Facepointer = window.Facepointer
let loadedDeps = false

Facepointer.prototype.setup = function () {
  this.loadDependencies()
  this.cleanConfig()
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
      this.cleanConfig()
    }
    $script.src = 'js/jeelizFaceTransfer.js'
    document.getElementsByTagName('head')[0].appendChild($script)
    document.body.classList.add('facepointer-loading')
  }
}