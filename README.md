Crafted.io
==========

The Crafted Services site


## Getting Started

Install Node, NPM and Grunt, then install our dependencies:

```bash
$ npm install
```

### CSS and Grunt

This app uses LessCSS for it's CSS, and needs to be compiled to run in the browser. So we created a couple of Grunt tasks to help you along:

 - `grunt` will compile all Less into `css/main.css`.
 - `grunt watch` will watch all Less files for changes, and recompile when changes are encountered.
 - `grunt build` will build the app for production.