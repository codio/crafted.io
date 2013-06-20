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


### Deploying

The [Capistrano](http://capistranorb.com/) Ruby Gem is used to deploy this app. There is a [staging](http://staging.crafted.io) and [production](http://crafted.io) environment.

Run [Bundler](http://gembundler.com/) to install Capistrano and its requirements:

```bash
$ bundle install
```

Before deploying, use Grunt to build the app:

```bash
$ grunt build
```

**NOTE:** Deploying requires that you have your public SSH key installed on the staging and production servers.

The default environment is staging. Deploy to staging by running:

```bash
$ cap deploy
```

To deploy to production (_be careful_):

```bash
$ cap production deploy
```