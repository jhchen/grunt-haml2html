'use strict';

var dargs = require('dargs');

module.exports = function(grunt) {
  var path = require('path');

  grunt.registerMultiTask('haml', 'Compile Haml to HTML', function() {
    var options = this.options();
    var cb = this.async();

    grunt.verbose.writeflags(options, 'Options');

    var bundleExec = options.bundleExec;
    delete options.bundleExec;

    var encoding = options.encoding;
    delete options.encoding;

    grunt.util.async.forEachSeries(this.files, function(f, next) {
      var args = ['haml', f.dest, '--stdin'].concat(dargs(options));

      if (bundleExec) {
        args.unshift('bundle', 'exec');
      }

      if (encoding) {
        args.push('-E', encoding);
      }

      var max = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Add dirs of specified files to the haml path
        args.push('--load-path', path.dirname(filepath));

        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(grunt.util.linefeed));

      // Make sure grunt creates the destination folders
      grunt.file.write(f.dest, '');

      var haml = grunt.util.spawn({
        cmd: args.shift(),
        args: args
      }, function(error, result, code) {
        if (code === 127) {
          return grunt.warn(
            'You need to have Ruby and Haml installed and in your PATH for\n' +
            'this task to work. More info:\n' +
            'https://github.com/jhchen/grunt-haml2html'
          );
        }
        next(error);
      });

      haml.stdin.write(new Buffer(max));
      haml.stdin.end();
      haml.stdout.pipe(process.stdout);
      haml.stderr.pipe(process.stderr);
    }, cb);
  });
};
