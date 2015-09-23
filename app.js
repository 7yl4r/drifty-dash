require('angular');

/* global FastClick, smoothScroll */
var app = angular.module('drifty-dashboard',
    [
        require('ui.bootstrap')
    ]
);

app.controller('MainCtrl', function() {
    var vm = this;

	console.log('drifty-dash init');
});
