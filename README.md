<div align="center">
  <p><img src="https://i.imgur.com/yu0VPuu.png" width=64></p>
  <p><img src="https://media.giphy.com/media/kDrhIUpyj29ndpLRXH/source.gif"></p>
  <p>
    <small>presented by <a href="https://browsehandsfree.com">browsehandsfree.com</a></small>
    <br><small>with a special thanks to <a href="http://studioforcreativeinquiry.org/">the STUDIO for Creative Inquiry at CMU</a></small>
  </p>
  <h1>facepointer.js</h1>
  <p>Use head tracking and face gestures to move a "mouse" pointer from up to 3m (10ft) away 👋</p>
</div>

---

# Using in HTML

## Setup
> 🙈 Facepointer currently only works via CDN because of the way we're bundling dependencies. This will be fixed soon so that you can `import Facepointer from 'facepointer'`

To use Facepointer in your projects add the following to your projects `<head>`:

```html
<link rel="stylesheet" href="https://unpkg.com/facepointer/dist/facepointer.css">
<script defer src="https://unpkg.com/facepointer/dist/facepointer.js"></script>
```

That will pull the latest build. If you'd like to instead use a specific version, use something like:

```html
<link rel="stylesheet" href="https://unpkg.com/facepointer@0.0.3/dist/facepointer.css">
<script defer src="https://unpkg.com/facepointer@0.0.3/dist/facepointer.js"></script>
```

## .facepointer-start

To start tracking, give an element like a button `.facepointer-start` class. Clicking it will either execute `new Facepointer({autostart: true})` if Facepointer hasn't been initialized yet or simply call the `.start()` method of the last Facepointer instance.

You can also programmatically start Facepointer with:

```js
// With autostart
const fp = new Facepointer({autostart: true})

// Without autostart first run...
const fp = new Facepointer(config)
// ...then
fp.start()
```

---

> ## 🏗 Work in Progress
> This project is not ready yet but will be soon. Follow us on [Twitter @browsehandsfree](https://twitter.com/browsehandsfree) to stay updated

---

# Local Development Setup
## Prereqs
- First install [NodeJS](https://nodejs.org/en/download/) and [git](https://git-scm.com/downloads)
- Then install [Parcel.js](https://parceljs.org/) globally with: `npm install -g parcel-bundler`
- Then:

```bash
# Download this repository
git clone https://github.com/browsehandsfree/facepointer

# Install dependencies
npm i
```

## NPM Scripts
After you have dependencies installed, you'll be able to run the following:

```bash
# Start a local development server on localhost:1234
npm start
```

---

## Instantiation
To start using Facepointer, you'll need to instantiate it with: `const fp = new Facepointer(config)`

```js
new Facepointer({autostart: true})
```

Each instantiation creates it's own "debugger", which contains the following:

```html
<div class="facepointer-debugger">
  <canvas></canvas>
</div>
```

---

## Classes
The following classes are used throughout the lifecycle of facepointer:

```bash
# Added anytime facepointer is making an AJAX request or injecting depdencies
body.facepointer-loading
# Added after `fp.start()` and just before the actual first frame
body.facepoitner-started

# Add to an element to initialize (if one isn't initialized) and start the latest instance on click
# These elements are automatically hidden when started
# NOTE: this will work if a child at most 5 deep is clicked too
.facepointer-start

# Add to an element to reload the page (effectively stopping inference)
# These elements are hidden until started
# NOTE: this will work if a child at most 5 deep is clicked too
.facepointer-stop

# Hidden while loading
.facepointer-hide-when-loading
# Show while loading
.facepointer-show-when-loading
```

## Events
The following public events are available on `document` with `document.addEventListener(eventName)`:

```bash
# Called after the dependencies are loaded and ready
# @see Facepointer.prototype.loadDependencies
facepointer-dependenciesReady
```

You can emit events with `fp.emit(eventName, data)`, which is a shorthand for:

```js
document.dispatchEvent(new CustomEvent(`facepointer-${evenName}`), detail: data)
```

You can listen to events with `fp.on(eventName, callback)`, which is also shorthand for:

```js
document.addEventListener(`facepointer-${eventName}`, callback)
```

## Properties
The following properties are available:

```js
fp.pointer = {
  // The inferred pointer position
  x: 0,
  y: 0,
  // The pointer DIV element
  $el: null
}

// The original config object passed during instantiation
fp._config
// The cleaned config object with their defaults
fp.config

// Number of instances
Facepointer.numInstances = 0
// Instance id (the first instance is 1, the second is 2, and so on)
fp.id

// document.currentScript as run from inside Facepointer (used for calling dependencies)
Facepointer.libSrc

// Contains the JEELIZ tracker library once it's been injected
fp.trackerSDK = null

// Whether we're tracking or not
fp.isStarted = false

// Contains a collection of callbacks to call on every frame
fp.plugins = []
```

---

# Config
```js
let config = {
  // Whether Facepointer should automatically start after instantiation
  autostart: false,

  sensitivity: {
    // A factor to adjust the cursors move speed by
    xy: 0.7,
    // How much wider (+) or narrower (-) a smile needs to be to click
    click: 0
  },
  
  stabilizer: {
    // How much stabilization to use: 0 = none, 3 = heavy
    factor: 1,
    // Number of frames to stabilizer over
    buffer: 30
  },

  // Configs specific to plugins
  plugin: {
    click: {
      // Morphs to watch for and their required confidences
      morphs: {
        0: .5,
        1: .5
      }
    },
    
    vertScroll: {
      // The multiplier to scroll by. Lower numbers are slower
      scrollSpeed: .15,
      // How many pixels from the the edge to scroll
      scrollZone: 100
    }
  }
}

const fp = new Facepointer(config)
```

## Morphs

The following morph values are available on `fp.head.morphs`

```
0: smileRight → closed mouth smile right
1: smileLeft → closed mouth smile left
2: eyeBrowLeftDown → eyebrow left frowned
3: eyeBrowRightDown → eyebrow right frowned
4: eyeBrowLeftUp → eyebrow left up (surprised)
5: eyeBrowRightUp → eyebrow right up (surprised)
6: mouthOpen → mouth open
7: mouthRound → mouth round
8: eyeRightClose → close right eye
9: eyeLeftClose → close left eye
10: mouthNasty → mouth nasty (upper lip raised)
```


---

# Adding Functionality

Using `Facepointer.use(name, callback)` adds a `callback` to be called on every inference loop for every instance. We call these plugins. The plugin recieves `(pointer, fp)` - `pointer` is the pointers current `(x,y)` and `fp` is the Facepointer instance (use `fp.head` to get that instances head pose data, for example). Here's a basic example of scrolling the page:

```js
Facepointer.use('verticalScroll', (pointer, fp) => {
  if (pointer.y < 100)
    window.scrollTo(0, window.scrollY + pointer.y)
  if (pointer.y > window.innerHeight)
    window.scrollTo(0, window.scrollY + (pointer.y - window.innerHeight))
})
```

Using `Facepointer.use()` with the same plugin name overwrites the existing one.

---

# Integrations
## WordPress
In oder to integrate this repository directly with WordPress, you'll first need to install [WP Pusher](https://wppusher.com/). Then, use the following settings (located at `/wp-admin/admin.php?page=wppusher-plugins-create`):

```bash
Plugin repository: "browsehandsfree/facepointer"
Repository branch: "master"
Repository subdirectory: "integrations/wordpress"
```

![](https://i.imgur.com/vOpLzLq.png)

## Todo
- P5.js
- aFrame
- Babylon.js