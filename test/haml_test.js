var grunt = require('grunt');

exports.haml = {
  compile: function(test) {
    'use strict';
    test.expect(1);

    var haml = grunt.file.read('tmp/haml.html');
    var expected = grunt.file.read('test/expected/compile.html');
    test.equal(haml, expected, 'should compile SASS to CSS');

    test.done();
  }
};
