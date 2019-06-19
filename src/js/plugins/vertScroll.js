/**
 * Scrolls the page vertically
 */
Facepointer.use('vertScroll', (pointer, fp) => {
  if (pointer.y < fp.config.plugin.vertScroll.scrollZone) {
    window.scrollTo(0, window.scrollY + (pointer.y - fp.config.plugin.vertScroll.scrollZone) * fp.config.plugin.vertScroll.scrollSpeed)
  }
  if (pointer.y > window.innerHeight - fp.config.plugin.vertScroll.scrollZone) {
    window.scrollTo(0, window.scrollY + (pointer.y - window.innerHeight + fp.config.plugin.vertScroll.scrollZone) * fp.config.plugin.vertScroll.scrollSpeed)
  }
})