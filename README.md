# Pug-Sass Boilerplate Starter Kit

Pug-Sass Boilerplate is a Front-end web kit for building web apps or sites using Pug(Jade) and Sass

This boilerplate and starter kit project is based on a simple workflow for small apps and personal sites. It gives a solid starting point for newcomers who wants a ready to deploy local environment setup. The sources used to build this project includes:

  * [H5BP Project](https://github.com/h5bp/html5-boilerplate)
  * [React Redux Starter Kit](https://github.com/davezuko/react-redux-starter-kit)
  * [Mark Goodyear's Blog](https://markgoodyear.com/2014/01/getting-started-with-gulp/)
  * [Material Design Palette](https://www.materialpalette.com/)
  * [Flat UI Colors](https://flatuicolors.com/)

## Features

  * Pug-Sass ready.
  * Easy to deploy your production files
  * Includes:
    * [`Normalize.css`](https://necolas.github.com/normalize.css/) for CSS normalizations and common bug fixes
    * [`jQuery`](https://jquery.com/) via CDN with [SRI Hash](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) and a local fallback
    * [`gulpfile.js`](http://gulpjs.com/) with Gulp presets
    * `Sass variables` with with popular color palettes

## Requirements

* [Node.js](https://nodejs.org)
* [npm](https://www.npmjs.com)
* [Gulp](http://gulpjs.com/)
* [Bower](https://bower.io/)

## Getting Started

After [Node.js](https://nodejs.org/en/download/), [npm](https://docs.npmjs.com/getting-started/installing-node), [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) and [Bower](https://bower.io/#install-bower) installation, you can create a new project based on `pug-sass-boilerplate-starter-kit` by doing the following:

### Install from source

First, clone the project:

```bash
$ git clone https://github.com/Errec/pug-sass-boilerplate-starter-kit.git <my-project-name>
```

Initialize `npm` on `<my-project-name>` directory

```bash
$ cd <my-project-name>
$ npm init
```

Then install all required `Gulp` dependencies

```bash
$ sudo npm install gulp-uglify browser-sync gulp-plumber gulp-autoprefixer gulp-sass gulp-jade gulp-imagemin del gulp-cache gulp-clean-css gulp-sourcemaps --save-dev
```

Finally initialize `Bower` and install the dependencies

```bash
$ bower init
$ bower install jquery --save
$ bower install bootstrap --save
```

## Project Structure

The structure presented in this boilerplate is grouped primarily by file type. Please note that this structure is only meant to serve as a guide, it is by no means prescriptive.

```
.
├── img                      #
├── js                       #
│   └── main.js              #
├── styles                   #
│   ├── modules              #
│   ├── variables            #
│   └── main.scss            #
├── templates                #
│   └── index.jade           #
├── .bowerrc                 #
├── gulpfile.js              #
```