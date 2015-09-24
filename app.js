require('angular');

/* global FastClick, smoothScroll */
var app = angular.module('drifty-dash',
    [
        require('ui.bootstrap')
    ]
);

app.controller('MainCtrl', function() {
    var vm = this;

	console.log('drifty-dash init');
});
