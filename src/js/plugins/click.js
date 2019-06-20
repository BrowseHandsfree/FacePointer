/**
 * Click on things
 */
// Number of frames mouse has been downed
let mouseDowned = 0
// Max number of frames to keep down
let maxMouseDownedFrames = 5
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
    mouseDowned++
    document.body.classList.add('facepointer-clicked')
  } else {
    mouseUp = mouseDowned
    mouseDowned = 0
    mouseDrag = mouseDown = false
    document.body.classList.remove('facepointer-clicked')
  }

  // Set the state
  if (mouseDowned > 0 && mouseDowned < maxMouseDownedFrames) fp.pointer.state = 'mouseDown'
  else if (mouseDowned > maxMouseDownedFrames) fp.pointer.state = 'mouseDrag'
  else if (mouseUp) fp.pointer.state = 'mouseUp'
  else ''

  // Actually click something (or focus it)
  if (fp.pointer.state === 'mouseDown') {
    const $el = document.elementFromPoint(pointer.x, pointer.y)
    if ($el) {
      $el.dispatchEvent(new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        clientX: pointer.x,
        clientY: pointer.y
      }))

      // Focus
      if (['INPUT', 'TEXTAREA', 'BUTTON', 'A'].includes($el.nodeName))
        $el.focus()
    }
  }
})