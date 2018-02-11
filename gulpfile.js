var autoprefixer         = require('gulp-autoprefixer');
var beeper               = require('beeper');
var browserSync          = require('browser-sync');
var cache                = require('gulp-cache');
var cleanCSS             = require('gulp-clean-css');
var del                  = require('del');
var gconcat              = require('gulp-concat');
var gulp                 = require('gulp');
var gutil                = require('gulp-util');
var imagemin             = require('gulp-imagemin');
var notify               = require('gulp-notify');
var plumber              = require('gulp-plumber');
var pug                  = require('gulp-pug');
var rename               = require("gulp-rename");
var sass                 = require('gulp-sass');
var sourcemaps           = require('gulp-sourcemaps');
var uglify               = require('gulp-uglify');
// yarn add gulp gulp-uglify browser-sync gulp-plumber gulp-autoprefixer gulp-sass gulp-pug gulp-imagemin gulp-cache gulp-clean-css gulp-sourcemaps gulp-concat beeper gulp-util gulp-rename gulp-notify del --dev
// OR
// npm install gulp gulp-uglify browser-sync gulp-plumber gulp-autoprefixer gulp-sass gulp-pug gulp-imagemin gulp-cache gulp-clean-css gulp-sourcemaps gulp-concat beeper gulp-util gulp-rename gulp-notify del --save-dev
var jsVendorFiles        = [];             // Holds the js vendor files to be concatenated
var myJsFiles            = [buildLocations.jsDir+'/*.js'];    // Holds the js files to be concatenated
var fs                   = require('fs');  // ExistsSync var to check if font directory patch exist
var yarnDir              = './node_modules';
var bootstrapJSPath      = yarnDir + "/bootstrap/dist/js/bootstrap.min.js";
var bootstrapCSSPath     = yarnDir + "/bootstrap/dist/css/bootstrap.min.css";
var bootstrapFontsPath   = yarnDir + "/bootstrap/dist/fonts/**.*";
var jqueryPath           = yarnDir + "/jquery/dist/jquery.min.js";
var bootstrapExists      = false;
var fontAwesomeSassPath  = yarnDir + '/font-awesome/scss',
var fontAwesomeCssPath   = yarnDir + '/font-awesome/css',
var fontAwesomeFontsPath = yarnDir + '/font-awesome/fonts',
var fontAwesomeExists    = false;
var onError              = function(err) { // Custom error msg with beep sound and text color
    notify.onError({
      title:    "Gulp error in " + err.plugin,
      message:  err.toString()
    })(err);
    beeper(3);
    this.emit('end');
    gutil.log(gutil.colors.red(err));
};
var sourceLocations      = {
  sourceDir: './src',
  sassDir: sourceDir+'/sass',
  imageDir: sourceDir+'/img',
  coffeeDir: sourceDir+'/coffee',
  pugDir: sourceDir+'/pug',
  fontsDir: sourceDir+'/fonts'
}
var sourceFiles          = {
  allSassFiles: sourceLocations.sassDir+'/**/*.scss',
  allImageFiles: sourceLocations.imageDir+'/**/*.*',
  allCoffeeFiles: sourceLocations.coffeeDir+'/**/*.coffee',
  allPugFiles: sourceLocations.pugDir+'/**/*.pug',
  allFontFiles: sourceLocations.fontsDir+'/**/*.*'
}
var buildLocations       = {
  buildDir: './build',
  cssDir: buildDir+'/styles',
  imgDir: buildDir+'/img',
  jsDir: buildDir+'/scripts',
  fontsDir: buildDir+'/fonts'
}
var bootswatchTemplates  = {
  Default: 'link(href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css", rel="stylesheet", integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm", crossorigin="anonymous")',
  Cerulean: 'link(href="https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0-beta.3/cerulean/bootstrap.min.css", rel="stylesheet", integrity="sha384-SJRp3lIuvy82g2roYNoSMWGEf7ufogthbl9noRHbJIxsMPcFl6NEi5fO3PuYptFv", crossorigin="anonymous")',
  Cosmo: 'link(href="https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0-beta.3/cosmo/bootstrap.min.css", rel="stylesheet", integrity="sha384-a1fJ5ppVJ3J5OscI8CmYpZH6XRnafYX7sXnA9uVadDWXox/IU9IIk9zz5zNE5HPL", crossorigin="anonymous")',
  Cyborg: 'link(href="https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0-beta.3/cyborg/bootstrap.min.css", rel="stylesheet", integrity="sha384-MtIP/3oPOnaTWtZGXE7C1YfcWSIgL8W+tyWY425Vav0Uten58co0sWnIfridWjr9", crossorigin="anonymous")',
  Darkly: 'link(href="https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0-beta.3/darkly/bootstrap.min.css", rel="stylesheet", integrity="sha384-novkfxI48G9YvcamVHf01KL+Sm6JFherxeJKqUdbez8EoEsAued2k/cD43lYG+B1", crossorigin="anonymous")',
  Flatly: 'link(href="https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0-beta.3/flatly/bootstrap.min.css", rel="stylesheet", integrity="sha384-+lmTKXkS+c9d34U9obDdGOZT7zqFicJDkhckYYsW7oenXR37T2OEV4uqfUO45M87", crossorigin="anonymous")',
  Journal: 'link(href="https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0-beta.3/journal/bootstrap.min.css", rel="stylesheet", integrity="sha384-/qQob+A1P2FeRYphuSbqp7heEKdhjZxqgAz/yWLX9CQKU9FTB8wKTexI0IiFlIXC", crossorigin="anonymous")',
  Litera: 'link(href="https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0-beta.3/litera/bootstrap.min.css", rel="stylesheet", integrity="sha384-IzI0oYQkUWBlg1pHwxuQHkY3lDjpB6aHpvi1eomAYMJlD7yk+TvMZoRXt0Wk31WJ", crossorigin="anonymous")',
  Lumen: 'link(href="https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0-beta.3/lumen/bootstrap.min.css", rel="stylesheet", integrity="sha384-lBO0+E/aIJhpRIYjP6dJ1mNYgo3hhUBPcF74XRfOM27g7WmDuitolvnUENdDG4QI", crossorigin="anonymous")',
  Lux: 'link(href="https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0-beta.3/lux/bootstrap.min.css", rel="stylesheet", integrity="sha384-XI0PIujkSZEzZ5m8WTEm+krRuIpfO+vHrEznaIrhTAkbrbIvfs11kzCqUarPR7yn", crossorigin="anonymous")',
  Materia: 'link(href="https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0-beta.3/materia/bootstrap.min.css", rel="stylesheet", integrity="sha384-9+9yAZ8WTqE5Elo0puxoZtIpLRu+wf9gLMnZsiBuCThtWoy+J2LUu/PIuzzKzhhP", crossorigin="anonymous")',
  Minty: 'link(href="https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0-beta.3/minty/bootstrap.min.css", rel="stylesheet", integrity="sha384-JhIgJbGaBmwiP1/6gN1Li6rs5arXlyM7vZ2Ehu3Pg6ySt73jpv+d6IKesRmwDhaa", crossorigin="anonymous")',
  Pulse: 'link(href="https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0-beta.3/pulse/bootstrap.min.css", rel="stylesheet", integrity="sha384-Tt49/uH7xRJMCIU5qH2HEeWNZLx4BKZwYN0H7NJ2jo9v732hZJ7yHl0xUu2Lkt04", crossorigin="anonymous")',
  Sandstone: 'link(href="https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0-beta.3/sandstone/bootstrap.min.css", rel="stylesheet", integrity="sha384-XNRTCesHENaXoVVjLx3Vm0rmwmS4W2g5w0xwZQIDPDvT4IDa/HRIvwb8CoH7/JPW", crossorigin="anonymous")',
  Simplex: 'link(href="https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0-beta.3/simplex/bootstrap.min.css", rel="stylesheet", integrity="sha384-PaAXG6+jSgdshuo6vfUlKWn4lPCWBBE1xxs4LhwbqgpRdHWPtjR7XvKkj8cEAqd4", crossorigin="anonymous")',
  Sketchy: 'link(href="https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0-beta.3/sketchy/bootstrap.min.css", rel="stylesheet", integrity="sha384-7ELRJF5/u1pkLd0W7K793Y7ZCb1ISE8FjEKiDAwHD3nSDbA2E9Txc423ovuNf1CV", crossorigin="anonymous")',
  Slate: 'link(href="https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0-beta.3/slate/bootstrap.min.css", rel="stylesheet", integrity="sha384-0hg9nIBwdqzDMXB5NKI6aLmOMkt8sWpL8xY0q9J7eAS/UYXIqoZ/iXiRxQYe0znl", crossorigin="anonymous")',
  Solar: 'link(href="https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0-beta.3/solar/bootstrap.min.css", rel="stylesheet", integrity="sha384-Jpv9vxZao0dlyvegpeTxSgc5cczNCOpcV5ihm8RQbrMo263QmC3Sf5HIMBfr+nqx", crossorigin="anonymous")',
  Spacelab: 'link(href="https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0-beta.3/spacelab/bootstrap.min.css", rel="stylesheet", integrity="sha384-37YbQUib4zA7U5bsHd2KZyDlsbwU4JgX78b4NZR3fFBCvoX9VQ0Py9iYVKd0OKo9", crossorigin="anonymous")',
  Superhero: 'link(href="https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0-beta.3/superhero/bootstrap.min.css", rel="stylesheet", integrity="sha384-5wAMKUlGYMj+I1P0kUCCwryZKMvv4S6K2e0UlixY5YK3Z4/HWKP9MtELCm0Iyo74", crossorigin="anonymous")',
  United: 'link(href="https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0-beta.3/united/bootstrap.min.css", rel="stylesheet", integrity="sha384-oh6CIJjWhRwp0mieUS356ygt51KjDbBegXk3ExmLxlQPRno1G/QOtiK55uCVuGs3", crossorigin="anonymous")',
  Yeti: 'link(href="https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0-beta.3/yeti/bootstrap.min.css", rel="stylesheet", integrity="sha384-xpQNcoacYF/4TKVs2uD3sXyaQYs49wxwEmeFNkOUgun6SLWdEbaCOv8hGaB9jLxt", crossorigin="anonymous")'
}
var selectedTemplateCDN  = bootswatchTemplates.Default;

/// FUNCTION: setupJquery(data)
/// SUBTASKS
///     - Copies jquery to dist folder
///     - Splices in jquery CDN and local fallback to supplied data
function setupJquery(data) {
  var jqueryCDN = '    script(src="https://code.jquery.com/jquery-{{JQUERY_VERSION}}.min.js" integrity="{{JQUERY_SRI_HASH}}" crossorigin="anonymous")';
  var jqueryLocalFallback = "    <script>window.jQuery || document.write(" + "'<script src=" + '"js/vendor/jquery/dist/jquery/jquery.min.js"' + "><\\/script>')</script>";
  gulp.src(jqueryPath)
  .pipe(gulp.dest(buildLocations.jsDir+'/vendor/jquery/dist'));
  data.splice(data.length, 0, jqueryCDN);
  data.splice(data.length, 0, jqueryLocalFallback);
}

/// FUNCTION: setupBootstrap(data)
/// SUBTASKS
///     - Copies bootstrap to dist folder
///     - Splices in bootstrap CDN and local fallback to supplied data
function setupBootstrap(data) {
  bootstrapExists = true;
  setupJquery(data);
  var bootstrapCSSCDN = selectedTemplateCDN;
  var bootstrapCSSLocalFallback = '    div(id="bootstrapCssTest" class="hidden")\n' + "    <script>$(function(){if ($('#bootstrapCssTest').is(':visible')){$('head').prepend('<link rel=" + '"stylesheet" href="/scripts/vendor/bootstrap/dist/css/bootstrap.min.css">' + "');}});</script>";
  var bootstrapJSCDN = '    script(src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js", integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl", crossorigin="anonymous")';
  var bootstrapJSLocalFallback = "    <script>if(typeof($.fn.modal) === 'undefined'" + ") {document.write('<script src=" + '"/scripts/vendor/bootstrap/dist/js/bootstrap.min.js"' + "><\\/script>')}</script>";
  gulp.src(bootstrapJSPath)
  .pipe(gulp.dest(buildLocations.jsDir+'/vendor/bootstrap'));
  gulp.src(bootstrapCSSPath)
  .pipe(gulp.dest(buildLocations.cssDir+'/vendor/bootstrap'));

  data.splice(8, 0, bootstrapCSSCDN);
  data.splice(data.length, 0, bootstrapJSCDN);
  data.splice(data.length, 0, bootstrapJSLocalFallback);
  data.splice(data.length, 0, bootstrapCSSLocalFallback);
}
/// FUNCTION: setupFontAwesome(data)
/// SUBTASKS
///     - Copies font-awesome to dist folder
///     - Splices in font-awesome CDN and local fallback to supplied data
function setupFontAwesome(data){
  fontAwesomeExists = true;
  var fontAwesomeCSSCDN = '    link(href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css", rel="stylesheet", integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN", crossorigin="anonymous")';
  var fontAwesomeCSSLocalFallback = '    div(id="bootstrapCssTest" class="hidden")\n' + "    <script>$(function(){if ($('#bootstrapCssTest').is(':visible')){$('head').prepend('<link rel=" + '"stylesheet" href="/styles/vendor/font-awesome/css/bootstrap.min.css">' + "');}});</script>";
  gulp.src(fontAwesomeCSSPath)
  .pipe(gulp.dest(buildLocations.cssDir+'/vendor/font-awesome'));
  gulp.src(bootstrapFontsPath)
  .pipe(gulp.dest(buildLocations.fontsDir+'/vendor/font-awesome'));
  data.splice(8, 0, fontAwesomeCSSCDN);
  data.splice(data.length, 0, fontAwesomeCSSLocalFallback);
}

function findKeyText(data, txt) { // TODO WTF is this for?
  for (var i = 0; i < data.length; i++) {
    if(data[i].indexOf(txt) > -1) {
      return true;
    }
  }
  return false;
}

/// TASK: compile:css
/// SUBTASKS
///     - Sourcemaps
///     - Sass
///     - Autoprefixer
///     - CleanCSS
gulp.task('compile:css', function() {
  gulp.src(sourceFiles.allSassFiles)
  .pipe(plumber({ errorHandler: onError }))
  .pipe(sourcemaps.init())
  .pipe(sass({indentedSyntax: true}))
  .pipe(autoprefixer({
    browsers: ['last 5 versions'],
    cascade: false}))
  .pipe(cleanCSS())
  .pipe(sourcemaps.write())
  .pipe(rename({ suffix: '.min'}))
  .pipe(gulp.dest(buildLocations.cssDir));
});
/// TASK: compile:html
/// SUBTASKS
///     - Pug
gulp.task('compile:html', function() {
  gulp.src(sourceFiles.allPugFiles)
  .pipe(plumber({ errorHandler: onError }))
  .pipe(pug())
  .pipe(gulp.dest(buildLocations.buildDir));
});
/// TASK: compile:js
/// SUBTASKS
///     - Sourcemaps
///     - GConcat
///     - Uglify
gulp.task('compile:js', function() { // TODO remove myJsFiles reference
  return gulp.src(myJsFiles.concat(jsVendorFiles))
  .pipe(plumber({ errorHandler: onError }))
  .pipe(sourcemaps.init())
  .pipe(gconcat('bundle.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(rename({ suffix: '.min'}))
  .pipe(gulp.dest(buildLocations.jsDir));
});
/// TASK: images
/// SUBTASKS
///     - Imagemin
///       - optimizationLevel=3, progressive=true, interlaced=true
gulp.task('images', function() {
  gulp.src(sourceFiles.allImageFiles)
  .pipe(cache(imagemin({
    optimizationLevel: 3,
    progressive: true,
    interlaced: true})))
  .pipe(gulp.dest(buildLocations.imageDir));
});
/// TASK: setup-src
/// Writes bootstrap, jquery, and minified js and css lines into index.pug
gulp.task('setup-src', function() {
  // data stores the contents of the index page for injecting script lines
  var data = fs.readFileSync(sourceLocations.sourceDir+'/index.pug').toString().split("\n");

  // if the last entry in data is empty ditch it
  if(data[data.length - 1] === '') {
    data.pop();
  }

  // if the line 'script(src="scripts/bundle.min.js")' exists ditch it
  if(data[data.length - 1].indexOf('script(src="scripts/bundle.min.js")') > -1) {
    data.pop();
  }

  if(yarnDir) { // if yarnDir exists
    // if bootstrap exists and is not already in the data
    if(fs.existsSync(bootstrapJSPath) && !findKeyText(data, 'bootstrap.min.css')) {
      setupBootstrap(data); // add bootstrap to the data
    }

    // if jquery exists and is not already in the data
    if(fs.existsSync(jqueryPath) && !bootstrapExist  && !findKeyText(data, 'jquery.min.js')) {
      setupJquery(data); // add jquery to the data
    }
  }

  // if the data does not contain a bundled and minified js file
  if(!findKeyText(data, 'bundle.min.js')) {
    // add it in to the top of the data
    data.splice(data.length, 0, '    script(src="scripts/bundle.min.js")');
  }

  // copy each element of the data into a newline seperated string for writing to file
  var text = data.join("\n");
  // write the data contents back to index.pug
  fs.writeFile(sourceLocations.sourceDir+'/index.pug', text, function (err) {
    if (err) throw err;
  });
});

/// TASK: default
/// Prints out usage for gulpfile
gulp.task('default', function() {
  console.log("Use 'yarn add gulp-uglify browser-sync gulp-plumber gulp-autoprefixer gulp-sass gulp-pug gulp-imagemin gulp-cache gulp-clean-css gulp-sourcemaps gulp-concat beeper gulp-util gulp-rename gulp-notify del --dev' to install all dependencies, then 'gulp setup' command to initialize the project files.");
  console.log("Run gulp watch before making changes to any source files and your browser will remain in sync.");
});
/// TASK: setup
/// Compiles all source files and adds script tags to index.pug for Bootstrap, jQuery and font-awesome
gulp.task('setup', function() {
  gulp.start('compile:css', 'compile:html', 'compile:js', 'images', 'setup-src');
});
/// TASK: watch
/// Watches all source files and recompiles on changes
gulp.task('watch', function() {
  gulp.watch(sourceFiles.allSassFiles,   ['compile:css']);
  gulp.watch([sourceFiles.allPugFiles],  ['compile:html']);
  gulp.watch(sourceFiles.allCoffeeFiles, ['compile:js']);
  gulp.watch(sourceFiles.allImageFiles,  ['images']);

  browserSync.init({ // Initialize browserSync server
    server: {
      proxy: "local.build",
      baseDir: buildLocations.buildDir
    }
  });

  gulp.watch([buildLocations.buildDir+'/**/*.*'], browserSync.reload);
});
