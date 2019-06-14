import './styles/main.styl'

// Whether we've loaded dependencies yet
let loadedDeps = false

/**
 * 
 */
class FacePointer {
  /**
   * @param {Object} config The config object (see README)
   */
  constructor (config = {}) {
    this.setup()
  }

  /**
   * Sets up variables
   */
  setup () {
    if (!loadedDeps) {
      loadedDeps = true
      console.log('loaded')
    }
  }
}

window.FacePointer = FacePointer
console.log('(∩｀-´)⊃━☆ﾟ.*・｡ﾟ https://github.com/browsehandsfree/facepointer')