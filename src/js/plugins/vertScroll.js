/**
 * Scrolls the page vertically
 */
Facepointer.use('vertScroll', pointer => {
  console.log(pointer)
  
  if (pointer.y < 100) {
    window.scrollTo(0, window.scrollY + pointer.y)
    console.log('up')
  }
  if (pointer.y > window.innerHeight) {
    window.scrollTo(0, window.scrollY + (pointer.y - window.innerHeight))
    console.log('down')
  }
})