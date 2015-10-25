/**
 * graph widget for showing customizable time-series
 * Created by tylar on 2015-10-24
 */


angular.module('c3GraphWidget', [
    require("c3-angularjs")
])
    .controller('c3GraphWidgetController', ['$scope', function($scope) {
    }])
   .directive("c3GraphWidget", function() {
    return {
        restrict: 'E',
        templateUrl: "ng-modules/c3GraphWidget/c3GraphWidget.html"
    };
});

module.exports = angular.module('c3GraphWidget').name;