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
    if (this.trackerSDK) {
      this.initSDK()
    } else {
      console.warn('Head tracking SDK not loaded yet')
    }
  }

  /**
   * The main tracking loop
   */
  track () {
    this.head = {
      rotation: this.trackerSDK.get_rotationStabilized(),
      translation: this.trackerSDK.get_positionScale(),
      morphs: this.trackerSDK.get_morphTargetInfluencesStabilized()
    }
    this.updatePointer()

    requestAnimationFrame(() => this.track())
  }
}

window.Facepointer = Facepointer
require('./styles/main.styl')
require('./js/Setup')
require('./js/Pointer')
console.log('(∩｀-´)⊃━☆ﾟ.*・｡ﾟ https://github.com/browsehandsfree/facepointer')