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

  // Set the state
  if (mouseDown) fp.pointer.state = 'mouseDown'
  else if (mouseUp) fp.pointer.state = 'mouseUp'
  else if (mouseDrag) fp.pointer.state = 'mouseDrag'
  else ''

  // Actually click something (or focus it)
  if (mouseDowned) {
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