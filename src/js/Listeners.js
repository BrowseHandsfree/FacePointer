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

;(function () {
  /**
   * Listen to clicks on .facepointer-start and .facepointer-stop
   * - Instantiates a Facepointer if it doesn't exist with autostart...
   * - ...or Starts the last created Facepointer
   */
  document.addEventListener('click', ev => {
    let loops = 0
    let $el = ev.target

    // Loop through each parent, up to 5 times
    while (loops++ < 5) {
      // .facepointer-start
      if ($el.classList.contains('facepointer-start')) {
        if (Facepointer.instances.length) {
          Facepointer.instances[Facepointer.instances.length - 1].start()
        } else {
          new Facepointer({autostart: true})
        }
        break
      }

      // .facepointer-stop
      if ($el.classList.contains('facepointer-stop')) {
        location.reload()
        break
      }

      if ($el.parentElement)
        $el = $el.parentElement
      else
        break
    }
  })
})()