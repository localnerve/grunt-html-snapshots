# grunt-html-snapshots

> The grunt task for html-snapshots

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-html-snapshots --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-html-snapshots');
```

## The "html_snapshots" task

### Overview
In your project's Gruntfile, add a section named `html_snapshots` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  html_snapshots: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific options go here.
    },
  },
})
```

### Options

#### options.force
Type: `boolean`
Default value: `false`

A boolean value that is used to force the gruntfile to continue, even if this task fails.

#### MORE
For details of task and target specific options, read the options section of [html-snapshots][http://github.com/localnerve/html-snapshots]

### Usage Examples

#### Default Options and Targets
In this example, the default options are used to specify that the output directory should always be cleaned prior to taking snapshots, that a local robots.txt file should be used, and the html should be served from localhost. On all pages except the home page, when the selector "#dynamic-content" appears in the output, the page is ready for a snapshot. On the home page, we only take the snapshot when the selector "#home-content" is visible in the output.

```js
grunt.initConfig({
  html_snapshots: {
    // options for all targets
    options: {
      source: "/path/to/local/robots.txt",
      hostname: "localhost",
      selector: { "__default": "#dynamic-content", "/": "#home-content" },
      outputDirClean: "true",
    },
    // the debug target
    debug: {
      outputDir: "./snapshots/debug"
    },
    // the release target
    release: {
      outputDir: "./snapshots/release"
    }
  },
})
```

For more examples, visit [html-snapshots][http://github.com/localnerve/html-snapshots].

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
