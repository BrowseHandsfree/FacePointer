/**
 * (∩｀-´)⊃━☆ﾟ.*・｡ﾟ Facepointer
 * 
 * @usage const fp = new Facepointer(config);
 */
class Facepointer {
  /**
   * @param {Object} config The config object (see README)
   */
  constructor (config = {}) {
    this.setup(config)
  }

  /**
   * Triggers an event on the document
   * @param {String} eventName The event name, appended as `facepointer-${eventName}`
   */
  emit (eventName, detail = null) {
    const event = new CustomEvent(eventName, detail)
    document.dispatchEvent(event)
  }

  /**
   * Calls a callback on `document` when an event is triggered
   * @param {String} eventName The `facepointer-${eventName}` to listen to
   * @param {Function} callback The callback to call
   */
  on (eventName, callback) {
    document.addEventListener(eventName, callback)
  }

  /**
   * Starts the tracking loop
   */
  start () {
    if (this.trackerSDK && !this.isStarted) {
      this.initSDK()
    } else if (!this.isStarted) {
      console.warn('Head tracking SDK not loaded yet')
    }
  }


  stop () {
    location.reload()
  }

  /**
   * The main tracking loop
   * - Also runs plugins
   */
  track () {
    this.head = {
      rotation: this.trackerSDK.get_rotationStabilized(),
      translation: this.trackerSDK.get_positionScale(),
      morphs: this.trackerSDK.get_morphTargetInfluencesStabilized()
    }
    this.updatePointer()
    
    Object.keys(Facepointer.plugins).forEach(key => {
      Facepointer.plugins[key](this.pointer, this)
    })
    
    requestAnimationFrame(() => this.track())
  }
}

/**
 * Setup static properties
 */
// Set the lib path to whereever this file is, this is required for loading dependencies correctly
let libSrc = document.currentScript.getAttribute('src')
libSrc = libSrc.substr(0, libSrc.lastIndexOf('/') + 1)
Facepointer.libSrc = libSrc
Facepointer.plugins = {}

// Contains the instances
Facepointer.instances = []
window.Facepointer = Facepointer

require('./styles/main.styl')
require('./js/Setup')
require('./js/Pointer')
require('./js/Listeners')
require('./js/Plugins')

console.log('(∩｀-´)⊃━☆ﾟ.*・｡ﾟ https://github.com/browsehandsfree/facepointer')

export default Facepointer