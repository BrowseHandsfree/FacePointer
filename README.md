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

## Body Classes
The following `<body>` classes are used throughout the lifecycle of facepointer:

```bash
# Called anytime facepointer is making an AJAX request or injecting depdencies
body.facepointer-loading
```

## Properties
The following properties are available:

```js
// The original config object passed during instantiation
fp._config
// The cleaned config object with their defaults
fp.config
```