/**
 * Adds a callback (we call it a plugin) to be called after every tracked frame
 * @param {String} name The plugin name
 * @param {Function} callback The callback to run
 */
Facepointer.use = function (name, callback) {
  Facepointer.plugins[name] = callback
}

// Import core plugins
require('./plugins/vertScroll')
require('./plugins/click')