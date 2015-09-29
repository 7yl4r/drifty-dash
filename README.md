# drifty-dash
[![Build Status](https://travis-ci.org/7yl4r/drifty-dash.svg?branch=master)](https://travis-ci.org/7yl4r/drifty-dash)

Widget dashboard to help Drifty with physicsy things.

Utilizes:
* coffeescript (in some places) for legibility
* angular.js for templating (directives), 2-way binding, etc
* browserify.js for modular js
* less for enhanced (and modular) css
* mocha, chai, travis.ci for testing
* bootstrap (angular-ui variant) as html/css foundation

file structure:
* assets/ - images, css, fonts, etc.
* ng-modules/ - angular "modules" aka groups of html/js/css which work together as widgets or other functionally independent units
* app.js - main js file
* app.less - main less/css file
* index.hmtl - main html file
* bundle.* - generated bundle file used for distribution 
* build.sh - shell script to generate the bundles

## dev startup:
### prequisite software
npm (node package manager). easiest to install as part of node.js (included by default).

### setup
1. clone repo
2. install dependencies `npm install`
3. build `./build.sh`

### workflow
1. edit less/js/coffee/html files
2. build the bundles w/ `build.sh`
