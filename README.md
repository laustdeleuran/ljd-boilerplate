# Site name: LJD Boilerplate

## Project technologies and methodologies

* [Grunt](http://gruntjs.com/) package based on [1508-boilerplate](https://github.com/1508/1508-boilerplate/) & [vertic-boilerplate](https://github.com/verticlabs/html-boilerplate)
* [SASS](http://sass-lang.com/) using [Compass](http://compass-style.org/)
* [RequireJS](http://requirejs.org/)
* [OOCSS](http://oocss.org/) with [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

## Install

    npm install
    bower install
    grunt server // grunt build, grunt show-built

## Build step

    grunt build
    grunt show-built

The `build` step compiles, concatenates and minifies all CSS and JS, and replaces the links in the HTML templates. It also minifies all images. The `grunt show-built` starts a dumb web server to show the built files, to make sure everything works as it should.

## Known issues

* Compass 0.12.2 throws the error `Cannot determine the opposite position of: to` which is a [known Compass bug](http://support.mixture.io/discussions/problems/2077-compass-support-of-linear-gradient-syntax) that can be safely ignored.

## Readme to-do

Fill out these things in the README:

* Meta data: Name of lead developer.
* Installation guide.
* Dependencies (like nodejs, ruby, grunt, bower and compass).
* Explanation about patterns or frameworks in use (like backbone or other internal framework, with link to further documentation).
* Relevant knowledge (did you hack an external library again?)
