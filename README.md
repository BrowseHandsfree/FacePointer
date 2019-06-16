<div align="center">
  <p><img src="https://i.imgur.com/yu0VPuu.png" width=64></p>
  <p>
    <small>presented by <a href="https://browsehandsfree.com">browsehandsfree.com</a></small>
    <br><small>with a special thanks to <a href="http://studioforcreativeinquiry.org/">the STUDIO for Creative Inquiry at CMU</a></small>
  </p>
  <h1>facepointer.js</h1>
  <p>Use head tracking and face gestures to move a "mouse" pointer from up to 3m (10ft) away 👋</p>
</div>

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

`config` has the following defaults:

```js
```

Each instantiation creates it's own "debugger", which contains the following:

```html
<div class="facepointer-debugger">
  <canvas></canvas>
</div>
```

---

## Body Classes
The following `<body>` classes are used throughout the lifecycle of facepointer:

```bash
# Called anytime facepointer is making an AJAX request or injecting depdencies
body.facepointer-loading
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
  }
}

const fp = new Facepointer(config)
```