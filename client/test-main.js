if (!Object.hasOwnProperty('name')) {
  Object.defineProperty(Function.prototype, 'name', {
    get: function() {
      var matches = this.toString().match(/^\s*function\s*(\S*)\s*\(/);
      var name = matches && matches.length > 1 ? matches[1] : "";
      Object.defineProperty(this, 'name', {value: name});
      return name;
    }
  });
}

// Turn on full stack traces in errors to help debugging
Error.stackTraceLimit = Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

// Cancel Karma's synchronous start,
// we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function() {};

System.config({
  baseURL: '/base/',
  defaultJSExtensions: true,
  paths: {
    'ng2-translate/*': 'node_modules/ng2-translate/*.js',
    'ng2-bootstrap/*': 'node_modules/ng2-bootstrap/*.js',
    'moment/*': 'node_modules/moment/*.js',
    'moment': 'node_modules/moment/moment.js',
    'angular2-jwt/angular2-jwt': 'node_modules/angular2-jwt/angular2-jwt.js',
    'ng2-dragula/*': 'node_modules/ng2-dragula/*.js',
    'ng2-dragula/ng2-dragula': 'node_modules/ng2-dragula/ng2-dragula.js',
    'angular2-modal/*': 'node_modules/angular2-modal/*.js'
  },
  map: {
    'rxjs': 'node_modules/rxjs',
    '@angular': 'node_modules/@angular',
    'jquery': 'node_modules/jquery/dist/jquery.js',
    'lodash': 'node_modules/lodash/lodash.js',
    'toastr': 'node_modules/toastr/toastr.js',
    '@ngrx/store': 'node_modules/@ngrx/store/index.js',
    'dragula': 'node_modules/dragula/dist/dragula.js'
  },
  packages: {
    '@ngrx/core': {main: 'index.js', defaultExtension: 'js'},
    '@ngrx/store': {main: 'index.js', defaultExtension: 'js'},
    '@angular/common': {main: 'index.js', defaultExtension: 'js'},
    '@angular/compiler': {main: 'index.js', defaultExtension: 'js'},
    '@angular/core': {main: 'index.js', defaultExtension: 'js'},
    '@angular/http': {main: 'index.js', defaultExtension: 'js'},
    '@angular/platform-browser': {main: 'index.js', defaultExtension: 'js'},
    '@angular/platform-browser-dynamic': {main: 'index.js', defaultExtension: 'js'},
    '@angular/router': {main: 'index.js', defaultExtension: 'js'},
    '@angular/router-deprecated': {main: 'index.js', defaultExtension: 'js'},
    '@angular/upgrade': {main: 'index.js', defaultExtension: 'js'},
    'rxjs': { defaultExtension: 'js' }
  }
});

Promise.all([
  System.import('@angular/core/testing'),
  System.import('@angular/platform-browser-dynamic/testing')
]).then(function (providers) {
  debugger;
  var testing = providers[0];
  var testingBrowser = providers[1];

  testing.setBaseTestProviders(testingBrowser.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
      testingBrowser.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

}).then(function() {
      return Promise.all(
          Object.keys(window.__karma__.files) // All files served by Karma.
              .filter(onlySpecFiles)
              .map(file2moduleName)
              .map(function(path) {
                return System.import(path).then(function(module) {
                  if (module.hasOwnProperty('main')) {
                    module.main();
                  } else {
                    throw new Error('Module ' + path + ' does not implement main() method.');
                  }
                });
              }));
    })
    .then(function() {
      __karma__.start();
    }, function(error) {
      console.error(error.stack || error);
      __karma__.start();
    });

function onlySpecFiles(path) {
  // check for individual files, if not given, always matches to all
  var patternMatched = __karma__.config.files ?
      path.match(new RegExp(__karma__.config.files)) : true;

  return patternMatched && /[\.|_]spec\.js$/.test(path);
}

// Normalize paths to module names.
function file2moduleName(filePath) {
  return filePath.replace(/\\/g, '/')
      .replace(/^\/base\//, '')
      .replace(/\.js$/, '');
}
