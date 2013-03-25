/*
 * grunt-contrib-haml
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Sindre Sorhus, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var path = require('path');

  grunt.registerMultiTask('haml', 'Compile Haml to HTML', function() {
    var helpers = require('grunt-lib-contrib').init(grunt);
    var options = this.options();
    var cb = this.async();

    grunt.verbose.writeflags(options, 'Options');

    grunt.util.async.forEachSeries(this.files, function(f, next) {
      var args;
      var bundleExec = options.bundleExec;

      delete options.bundleExec;

      args = [f.dest, '--stdin'].concat(helpers.optsToArgs(options));

      args.unshift('haml');

      if (bundleExec) {
        args.unshift('bundle', 'exec');
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
            'https://github.com/jhchen/grunt-contrib-haml'
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
