/**
 * Facepointer plugin for drawing into Paper with face
 * - Adds `Facepointer_paperClear()` to window. Call this method to clear the canvas
 * 
 * @see http://paperjs.org/
 */
window.addEventListener('load', () => {
  const paper = window.paper
  const $canvas = document.getElementById('paper')
  let path
  let tool
  let lastPoint
  
  Facepointer.use('paper-demo', (pointer, fp) => {
    /**
     * Click
     */
    if (pointer.state === 'mouseDown') {
      lastPoint = getPoint(pointer)
  
      path = new paper.Path()
      path.strokeColor = {
        hue: Math.random() * 360,
        saturation: 1,
        brightness: 1
      }
      path.strokeJoin = 'round'
      path.strokeWidth = 10
      path.moveTo(lastPoint)
    }
  
    /**
     * Drag
     */
    if (pointer.state === 'mouseDrag') {
      const newPoint = getPoint(pointer)
  
      if (newPoint.getDistance(lastPoint) > tool.minDistance) {
        path.strokeWidth = 10
        path.lineTo(new paper.Point(
          pointer.x - $canvas.getBoundingClientRect().left,
          pointer.y - $canvas.getBoundingClientRect().top
        ))
        paper.view.draw()
        path.smooth()
  
        lastPoint = getPoint(pointer)
      }
    }

    /**
     * Clear screen
     */
    if (fp.head.morphs[4] > 0.25 && fp.head.morphs[5] > 0.25) {
      window.Facepointer_paperClear()
    }
  })
  
  /**
   * Gets a paper point from a fp.pointer
   * @param  {Object} pointer
   * @return {Point}           The point
   */
  const getPoint = function (pointer) {
    return new paper.Point(
      pointer.x - $canvas.getBoundingClientRect().left,
      pointer.y - $canvas.getBoundingClientRect().top
    )
  }
  
  /**
   * Renitialize Paper.js
   */
  window.Facepointer_paperClear = function () {
    paper.project.clear()
  }
  
  /**
   * Adapted from: http://paperjs.org/tutorials/interaction/working-with-mouse-vectors/
   */
  paper.setup($canvas)
  path = new paper.Path()
  tool = new paper.Tool()
  tool.minDistance = 20
  
  tool.onMouseDown = function (event) {
    path = new paper.Path()
    path.strokeColor = {
      hue: Math.random() * 360,
      saturation: 1,
      brightness: 1
    }
    path.strokeWidth = 10
    path.strokeJoin = 'round'
    path.add(event.point)
  }
  
  /**
   * Handle mouseDrag
   */
  tool.onMouseDrag = function (event) {
    path.add(event.point)
    path.smooth()
  }
})