/**
 * graph widget for showing customizable time-series
 * Created by tylar on 2015-10-24
 */
require("c3-angularjs");

angular.module('c3GraphWidget', [
    "c3-angularjs"
])
    .controller('c3GraphWidgetController', ['$scope', function($scope) {
        //$scope.selected='sample1';

         var json1 = {
             "instrument": "neutron spectrometer 1",
             "collimation": 80,
             "collimation_units" : "minutes",
             "aperture_w" : 0.5,
             "aperture_h" : 0.5,
             "aperture_units" : "inches",
             "energy": [13.5, 30.5, 41, 60],
             "energyUnits": "meV",
             "flux": [1.69e7, 3.97e7, 5.17e7, 4.11e7],
             "fluxUnits": "n/(cm**2 * s)"
         }

         var json3 = {
             "instrument": "neutron spectrometer 3",
             "collimation": 80,
             "collimation_units" : "minutes ",
             "aperture_w" : 0.5,
             "aperture_h" : 0.5,
             "aperture_units" : "inches",
             "energy": [14.7, 30.5, 41, 60],
             "energyUnits": "meV",
             "flux": [1.63e7, 4.60e7, 6.07e7, 6.78e7],
             "fluxUnits": "n/(cm**2 * s)"
         }

        //example1();

        // example 1: three series
        $scope.sampleAxis1 = {
        };
        $scope.sampleData1 = {
            json: {
                data1: [30, 20, 50, 40, 60, 50],
                data2: [200, 130, 90, 240, 130, 220],
                data3: [300, 200, 160, 400, 250, 250]
            }
        };


        // example 2: scatter plot
        $scope.sampleData2 = {
            xs: {
                setosa: 'setosa_x',
                versicolor: 'versicolor_x',
            },
            // iris data from R
            columns: [
                ["setosa_x", 3.5, 3.0, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3.0, 3.0, 4.0, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3.0, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3.0, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3.0, 3.8, 3.2, 3.7, 3.3],
                ["versicolor_x", 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2.0, 3.0, 2.2, 2.9, 2.9, 3.1, 3.0, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3.0, 2.8, 3.0, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3.0, 3.4, 3.1, 2.3, 3.0, 2.5, 2.6, 3.0, 2.6, 2.3, 2.7, 3.0, 2.9, 2.9, 2.5, 2.8],
                ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
                ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
            ],
            type: 'scatter'
        };

        $scope.sampleAxis2 = {
            x: {
                label: 'Sepal.Width',
                tick: {
                    fit: false
                }
            },
            y: {
                label: 'Petal.Width'
            }
        };

        // the real data
        $scope.data = {
            xs: {
                flux1: 'energy1',
                flux2: 'energy2'
            },
            // iris data from R
            columns: [
                ["flux1"].concat(  json1.flux),
                ["flux2"].concat(  json3.flux),
                ["energy1"].concat(json1.energy),
                ["energy2"].concat(json3.energy)
            ],
            type: 'scatter'
        };

        $scope.axis = {
            x: {
                label: 'energy',
                tick: {
                    fit: false
                }
            },
            y: {
                label: 'flux'
            }
        };

    }])
   .directive("c3GraphWidget", function() {
    return {
        restrict: 'E',
        templateUrl: "ng-modules/c3GraphWidget/c3GraphWidget.html"
    };
});

module.exports = angular.module('c3GraphWidget').name;