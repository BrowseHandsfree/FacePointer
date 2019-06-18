/**
 * Scrolls the page vertically
 */
let mouseDowned = false
let mouseDown = false
let mouseDrag = false
let mouseUp = false
let thresholdMet = false

Facepointer.use('click', (pointer, fp) => {
  thresholdMet = false
  
  Object.keys(fp.config.plugin.click.morphs).forEach(key => {
    const morph = fp.config.plugin.click.morphs[key]
    if (fp.head.morphs[key] >= morph)
      thresholdMet = true
  })

  if (thresholdMet) {
    mouseDrag = mouseDowned

    // Every frame after first frame of click
    if (mouseDowned) {
      mouseDown = false
    } else {
      mouseDowned = true
      mouseDown = true
    }
    document.body.classList.add('facepointer-clicked')
  } else {
    mouseUp = mouseDowned
    mouseDowned = mouseDrag = mouseDown = false
    document.body.classList.remove('facepointer-clicked')
  }
})

function click () {

}