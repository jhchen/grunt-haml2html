# grunt-haml2html [![Build Status](https://secure.travis-ci.org/jhchen/grunt-haml2html.png?branch=master)](http://travis-ci.org/jhchen/grunt-haml2html)

> Compile Haml to HTML



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-haml2html --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-haml2html');
```




## Haml task
_Run this task with the `grunt haml` command._

This task requires you to have [Ruby](http://www.ruby-lang.org/en/downloads/) and [Haml](http://haml.info/). If you're on OS X or Linux you probably already have Ruby installed, try `ruby -v` in your terminal. When you've confirmed you have Ruby installed, run `gem install haml` to install Haml.
### Options

Any HAML options are also valid. Ex. { format: 'html5' } will run haml with --format html5.

#### loadPath
Type: `String|Array`

Add a (or multiple) Haml import path.

#### bundleExec
Type: `Boolean`

Run `haml` with [bundle exec](http://gembundler.com/v1.3/man/bundle-exec.1.html): `bundle exec haml`.

#### encoding
Type: `String`

Specifiy default character encoding. Same as running haml with the -E option.

### Examples

#### Example config

```javascript
grunt.initConfig({
  haml: {                              // Task
    dist: {                            // Target
      files: {                         // Dictionary of files
        'main.html': 'main.haml',       // 'destination': 'source'
        'widgets.html': 'widgets.haml'
      }
    },
    dev: {                             // Another target
      options: {                       // Target options
        bundleExec: true,
        style: 'expanded'
      },
      files: {
        'main.html': 'main.haml',
        'widgets.html': [
          'button.haml',
          'tab.haml',
          'debug.haml'  // Maybe you need one extra file in dev
        ]
      }
    }
  }
});

grunt.loadNpmTasks('grunt-haml2html');

grunt.registerTask('default', ['jshint', 'haml']);
```

#### Compile

```javascript
grunt.initConfig({
  haml: {
    dist: {
      files: {
        'main.html': 'main.haml'
      }
    }
  }
});
```

#### Concat and compile

If you specify an array of `src` paths they will be concatenated. However, in most cases you would want to just `@import` them into `main.haml`.

```javascript
grunt.initConfig({
  haml: {
    dist: {
      files: {
      'main.html': [
          'reset.haml',
          'main.haml'
        ]
      }
    }
  }
});
```

#### Compile multiple files

You can specify multiple `destination: source` items in `files`.

```javascript
grunt.initConfig({
  haml: {
    dist: {
      files: {
        'main.html': 'main.haml',
        'widgets.html': 'widgets.haml'
      }
    }
  }
});
```


## Release History

 * 2014-05-06   v0.2.0   Add encoding option
 * 2014-03-01   v0.1.2   Update deprecated dependency
 * 2013-08-19   v0.1.1   Bug fix #1 (Thanks @shahata)
 * 2013-03-23   v0.1.0   Initial release. Mostly a modification of https://github.com/gruntjs/grunt-contrib-sass

---

Task submitted by [Jason Chen](http://github.com/jhchen)
