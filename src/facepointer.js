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
    // First, let's load the model JSON
    if (this.trackerSDK) {
      const url = 'js/jeelizFaceTransferNNC.json'
      fetch('js/jeelizFaceTransferNNC.json')
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
                console.log('ready')
              }
            })
          }
        })
      })
      .catch(() => console.error(`Couldn't load head tracking model at ${url}`))
    } else {
      console.warn('Head tracking SDK not loaded yet')
    }
  }
}

window.Facepointer = Facepointer
require('./styles/main.styl')
require('./js/Setup')
console.log('(∩｀-´)⊃━☆ﾟ.*・｡ﾟ https://github.com/browsehandsfree/facepointer')