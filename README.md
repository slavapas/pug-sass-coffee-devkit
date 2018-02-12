/*<a><img src="http://res.cloudinary.com/dt4qeehms/image/upload/v1494509335/logo_njvnrz.png" height="300" align="right"></a>*/

# Pug-Sass-Coffee DevKit

Pug-Sass-Coffee DevKit is a Front-end web kit and boilerplate for building web apps or small sites using Pug, Sass, and Coffeescript

## Inspiration

This project is based on a simple and fast workflow focused mainly on the front-end task. It gives a solid starting point for newcomers who wants a ready-to-deploy local environment setup. The sources used to build this project includes:

  * [H5BP Project](https://github.com/h5bp/html5-boilerplate)
  * [React Redux Starter Kit](https://github.com/davezuko/react-redux-starter-kit)
  * [Mark Goodyear's Blog](https://markgoodyear.com/2014/01/getting-started-with-gulp/)
  * [Web Starter Kit](https://github.com/google/web-starter-kit)

## Features

  * Pug
  * Sass
  * Coffeescript
  * Sourcemaps
  * Bootswatch support
  * Easy to deploy your production files
  * Performance optimization: minify and concatenate JavaScript, CSS, HTML and images
  * Live browser reloading with `BrowserSync`
    * Includes automatic css injection using `gulp watch`
  * Includes:
    * [`Normalize.css`](https://necolas.github.com/normalize.css/) for CSS normalizations and common bug fixes
    * [`jQuery`](https://jquery.com/) via CDN and Yarn installation
    * [`Bootstrap`](http://getbootstrap.com/) via CDN and Yarn installation
    * [`Font Awesome`](https://fontawesome.com/) via CDN and Yarn installation
    * [`html5shiv`](https://github.com/aFarkas/html5shiv) via CDN
    * [`Respond`](https://github.com/scottjehl/Respond) via CDN
    * [`gulpfile.js`](http://gulpjs.com/) with Gulp presets
    * `Sass variables` with with popular color palettes from [Material Design Palette](https://www.materialpalette.com/) and [Flat UI Colors](https://flatuicolors.com/)

## Requirements

* [Node.js](https://nodejs.org) ``
* [npm](https://www.npmjs.com) ``
* [Gulp](http://gulpjs.com/) `npm install gulp --save-dev`

## Optionals

* [Yarn](https://yarnpkg.com/en/) `npm install yarn --save-dev`


## Getting Started

After [Node.js](https://nodejs.org/en/download/), [npm](https://docs.npmjs.com/getting-started/installing-node), [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) and [Yarn](https://yarnpkg.com/en/)(optional) installation, you can create a new project based on `pug-sass-boilerplate-starter-kit` by doing the following:

### Install From Source

First, clone the project:

```bash
$ git clone https://github.com/jaspercayne/pug-sass-coffee-boilerplate-starter-kit.git <my-project-name>
```

Initialize `npm` on `<my-project-name>` directory

```bash
$ cd <my-project-name>
$ npm init
```
and optionally
```bash
$ yarn init
```

Install `Gulp` locally

```bash
$ npm install gulp --save-dev
```
or
```bash
$ yarn add gulp --dev
```
Finally, install `Gulp` required dependencies


```bash
$ yarn add del gulp-uglify browser-sync gulp-plumber gulp-autoprefixer gulp-sass gulp-pug gulp-imagemin gulp-cache gulp-clean-css gulp-sourcemaps gulp-concat beeper gulp-util gulp-rename gulp-notify --dev
```
alternatively:
```bash
$ npm install del gulp-uglify browser-sync gulp-plumber gulp-autoprefixer gulp-sass gulp-pug gulp-imagemin gulp-cache gulp-clean-css gulp-sourcemaps gulp-concat beeper gulp-util gulp-rename gulp-notify --save-dev
```

![get start demo gif](http://res.cloudinary.com/dt4qeehms/image/upload/v1494619106/boilerplate/gif1.gif)

Optionally, if you want to add external components and libraries, initialize `Yarn` and install the dependencies to be used in your next project (e.g.: jQuery, Bootstrap, Modernizer).

```bash
$ yarn init
$ yarn add jquery --dev                 # Absolutely required, if yarn is not used install through npm
$ yarn add bootstrap --dev              # If bootstrap is desired
$ yarn add bootswatch --dev             # If bootswatch templates will be used
$ yarn add font-awesome --dev           # If font-awesome fonts are needed for the project
```
ALTERNATIVE Without Yarn:
```bash
$ npm install jquery --save-dev         # Do NOT run this if it was already installed through yarn above
$ npm install bootstrap --save-dev      # If bootstrap is desired
$ npm install bootswatch --save-dev     # If bootswatch templates will be used
$ npm install font-awesome --save-dev   # If font-awesome fonts are needed for the project
```
### Running Your Local Server With Gulp

After the installation of all requirements and its dependencies, your local web development environment is ready to run. Setup your initial files with `gulp setup`. This command is only necessary the first time the project is set or if the build folder is deleted.

```bash
$ gulp setup
```

Now run your local server using the `watch` task

```bash
$ gulp watch
```

This task will open the browser window usually with the URL http://localhost:3000/. Any saved changes made to the project files, will reload automatically the browser.

![gulp task demo gif](http://res.cloudinary.com/dt4qeehms/image/upload/v1494619106/boilerplate/gif2.gif)

## Project Structure

The structure presented in this boilerplate is grouped primarily by folder content and file type. Please note that this structure is only meant to serve as a guide, it is by no means prescriptive.

```
.
├── build/                  # Store processed/minified files and sourcemaps - your project's optimized and compiled code
| ├── css/                  # Contains the concatenated/minified .css files and .map files
│ | └── vendor/             # Store third party CSS libraries
│     └── bootstrap/        # Local Bootstrap fallback
| ├── fonts/                # Contains font files used throughout the site
│ | └── vendor/             # Store third party fonts
│ |   └── font-awesome/     # Local Font Awesome fallback
| ├── img/                  # Contains the compressed and optimized image files
| ├── index.html            # Minified html index file
| └── scripts/              # Contains the concatenated/minified/uglyfied .js files and .map files
│   └── vendor/             # Store third party JavaScript libraries
│     └── jquery/           # Local jQuery fallback
├── src/                    # Place all your source files in this directory, everything contained within will be processed
| ├── css/                  # Main folder for CSS files
| | ├── scss/               # Sass source files go in this folder
| | ├── modules/            # Store third party modules and initializers (e.g.: normalize, reset)
| | ├── main.scss           # Index.html source goes here
| | └── variables/          # Store sass variables files
| ├── fonts/                # Local font files go here
| ├── img/                  # Main folder for image files
| ├── js/                   # Main folder for JavaScript files
| | ├── coffee/             # Coffeescript source files go in this folder
| | └── main.js             # Index JS code goes here
| | └── vendor/             # Store third party library files [source/compiled] (e.g.: jquery, bootstrap)
| ├── templates/            # Main folder for pug template files
| └── index.pug             # Index.html source
├── gulpfile.js             # Setup Gulp tasks
└── README.md               # This document that you are reading right now
```

## The Gulp plugins

* [Autoprefixer](https://github.com/postcss/autoprefixer) : Write CSS rules without vendor prefixes.
* [beeper](https://github.com/sindresorhus/beeper) : Beeps when an error happens.
* [BrowserSync](https://github.com/browsersync/browser-sync) : Keep multiple browsers in sync after file save.
* [cache](https://github.com/jgable/gulp-cache) : Keeps an in-memory cache of files images so only changed images are compressed with Imagemin plugin.
* [clean-css](https://github.com/jakubpawlowicz/clean-css) : CSS optimizer and minifier.
* [concat](https://github.com/contra/gulp-concat) : Concatenates `.js` files into `bundle.js`.
* [del](https://github.com/sindresorhus/del) : Deletes files and folders
* [imagemin](https://github.com/sindresorhus/gulp-imagemin) : Minify PNG, JPEG, GIF and SVG images.
* [notify](https://github.com/mikaelbr/gulp-notify) : Send error messages to Mac Notification Center, Linux notifications or Windows >= 8.
* [plumber](https://github.com/floatdrop/gulp-plumber) : Prevent pipe breaking caused by errors from gulp plugins.
* [Pug](https://github.com/pugjs/gulp-pug) : Compile your Pug templates into HTML.
* [rename](https://github.com/hparra/gulp-rename) : Rename minified files adding `.min` suffix.
* [SASS](https://github.com/dlmanning/gulp-sass) : Compile your SASS or SCSS into CSS.
* [sourcemaps](https://github.com/floridoo/gulp-sourcemaps) : Create CSS and JavaScript map files to debug the code within compressed files.
* [uglify](https://github.com/terinjokes/gulp-uglify) : Minify JavaScript files.
* [gutil](https://github.com/gulpjs/gulp-util) : Log the error message with red highlighting for easier reading.
