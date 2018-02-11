var autoprefixer       = require('gulp-autoprefixer');
var beeper             = require('beeper');
var browserSync        = require('browser-sync');
var cache              = require('gulp-cache');
var cleanCSS           = require('gulp-clean-css');
var del                = require('del');
var gconcat            = require('gulp-concat');
var gulp               = require('gulp');
var gutil              = require('gulp-util');
var imagemin           = require('gulp-imagemin');
var notify             = require('gulp-notify');
var plumber            = require('gulp-plumber');
var pug                = require('gulp-pug');
var rename             = require("gulp-rename");
var sass               = require('gulp-sass');
var sourcemaps         = require('gulp-sourcemaps');
var uglify             = require('gulp-uglify');
// yarn add gulp-uglify browser-sync gulp-plumber gulp-autoprefixer gulp-sass gulp-pug gulp-imagemin gulp-cache gulp-clean-css gulp-sourcemaps gulp-concat beeper gulp-util gulp-rename gulp-notify del --dev
var jsVendorFiles      = [];             // Holds the js vendor files to be concatenated
var myJsFiles          = [buildLocations.jsDir+'/*.js'];    // Holds the js files to be concatenated
var fs                 = require('fs');  // ExistsSync var to check if font directory patch exist
var yarnDir            = './node_modules';
var bootstrapJSPath    = yarnDir + "/bootstrap/dist/js/bootstrap.min.js";
var bootstrapCSSPath   = yarnDir + "/bootstrap/dist/css/bootstrap.min.css";
var bootstrapFontsPath = yarnDir + "/bootstrap/dist/fonts/**.*";
var jqueryPath         = yarnDir + "/jquery/dist/jquery.min.js";
var bootstrapExist     = false;
var onError            = function(err) { // Custom error msg with beep sound and text color
    notify.onError({
      title:    "Gulp error in " + err.plugin,
      message:  err.toString()
    })(err);
    beeper(3);
    this.emit('end');
    gutil.log(gutil.colors.red(err));
};
var sourceLocations    = {
  sourceDir: './src',
  sassDir: sourceDir+'/sass',
  imageDir: sourceDir+'/img',
  coffeeDir: sourceDir+'/coffee',
  pugDir: sourceDir+'/pug'
}
var sourceFiles        = {
  allSassFiles: sourceLocations.sassDir+'/**/*.scss',
  allImageFiles: sourceLocations.imageDir+'/**/*.*',
  allCoffeeFiles: sourceLocations.coffeeDir+'/**/*.coffee',
  allPugFiles: sourceLocations.pugDir+'/**/*.pug'
}
var buildLocations     = {
  buildDir: './build',
  cssDir: buildDir+'/styles',
  imgDir: buildDir+'/img',
  jsDir: buildDir+'/scripts'
}

/// FUNCTION: setupJquery(data)
/// SUBTASKS
///     - Copies jquery to dist folder
///     - Splices in jquery CDN and local fallback to supplied data
function setupJquery(data) {
  var jqueryCDN = '    script(src="https://code.jquery.com/jquery-{{JQUERY_VERSION}}.min.js" integrity="{{JQUERY_SRI_HASH}}" crossorigin="anonymous")';
  var jqueryLocalFallback = "    <script>window.jQuery || document.write(" + "'<script src=" + '"js/vendor/jquery/dist/jquery/jquery.min.js"' + "><\\/script>')</script>";
  gulp.src(jqueryPath)
  .pipe(gulp.dest(buildLocations.jsDir+'/vendor/jquery/dist/jquery'));
  data.splice(data.length, 0, jqueryCDN);
  data.splice(data.length, 0, jqueryLocalFallback);
}

/// FUNCTION: setupBootstrap(data)
/// SUBTASKS
///     - Copies bootstrap to dist folder
///     - Splices in bootstrap CDN and local fallback to supplied data
function setupBootstrap(data) {
  bootstrapExist = true;
  setupJquery(data);
  var bootstrapCSSCDN = '    link(href="https://maxcdn.bootstrapcdn.com/bootstrap/{{BOOTSTRAP_VERSION}}/css/bootstrap.min.css", rel="stylesheet", integrity="{{BOOTSTRAP_SRI_HASH}}", crossorigin="anonymous")';
  var bootstrapCSSLocalFallback = '    div(id="bootstrapCssTest" class="hidden")\n' + "    <script>$(function(){if ($('#bootstrapCssTest').is(':visible')){$('head').prepend('<link rel=" + '"stylesheet" href="/scripts/vendor/bootstrap/dist/css/bootstrap.min.css">' + "');}});</script>";
  var bootstrapJSCDN = '    script(src="https://maxcdn.bootstrapcdn.com/bootstrap/{{BOOTSTRAP_VERSION}}/js/bootstrap.min.js", integrity="{{BOOTSTRAP_SRI_HASH}}", crossorigin="anonymous")';
  var bootstrapJSLocalFallback = "    <script>if(typeof($.fn.modal) === 'undefined'" + ") {document.write('<script src=" + '"/scripts/vendor/bootstrap/dist/js/bootstrap.min.js"' + "><\\/script>')}</script>";
  gulp.src(bootstrapFontsPath)
  .pipe(gulp.dest(buildLocations.jsDir+'/vendor/bootstrap/dist/fonts'));
  gulp.src(bootstrapJSPath)
  .pipe(gulp.dest(buildLocations.jsDir+'/vendor/bootstrap/dist/js'));
  gulp.src(bootstrapCSSPath)
  .pipe(gulp.dest(buildLocations.jsDir+'/vendor/bootstrap/dist/css'));

  data.splice(8, 0, bootstrapCSSCDN);
  data.splice(data.length, 0, bootstrapJSCDN);
  data.splice(data.length, 0, bootstrapJSLocalFallback);
  data.splice(data.length, 0, bootstrapCSSLocalFallback);
}

// TODO function setupFontAwesome(data)

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
