/**
 * graph widget for showing customizable time-series
 * Created by tylar on 2015-10-24
 */
require("c3-angularjs");
var format = require("d3-format").format;

angular.module('c3GraphWidget', [
    "c3-angularjs",
    require("ui.bootstrap")
])
    .controller('c3GraphWidgetController', ['$scope', function($scope) {
        var DEF_FLUX_UNITS   =      "n/(cm**2 * s)";
        var DEF_ENERGY_UNITS =      "meV";
        var DEF_COLLIMATION_UNITS = "minutes";
        var DEF_APERTURE_UNITS =    "inches";

        $scope.createSeries = function(seriesObj){
            // adds default series values to given object if not already specified.
            var def_values = {
                "energy": [],
                "flux": [],
                "collimation_units": DEF_COLLIMATION_UNITS,
                "aperture_units": DEF_APERTURE_UNITS,
                "energyUnits": DEF_ENERGY_UNITS,
                "fluxUnits": DEF_FLUX_UNITS
            };

            for(var key in def_values) {
                if (typeof seriesObj[key] === 'undefined') {
                    seriesObj[key] = def_values[key];
                } // else do not overwrite values already in seriesObj
            }

            return seriesObj;
        };

        $scope.series =[
            $scope.createSeries({
                "instrument": "neutron spectrometer 1",
                "collimation": 80,
                "aperture_w" : 0.5,
                "aperture_h" : 0.5,
                "energy": [13.5, 30.5, 41, 60],
                "flux": [1.69e7, 3.97e7, 5.17e7, 4.11e7],
            }),
            $scope.createSeries({
                "instrument": "neutron spectrometer 3",
                "collimation": 80,
                "aperture_w" : 0.5,
                "aperture_h" : 0.5,
                "energy": [14.7, 30.5, 41, 60],
                "flux": [1.63e7, 4.60e7, 6.07e7, 6.78e7],
            })
        ];

        $scope.updateSeries = function(index){
            console.log("update series #" + index);
            var text = document.getElementById("series-json-"+index).value;
            $scope.series[index] = JSON.parse(text);
            formatData();
        };

        $scope.removeSeries = function(index){
            console.log("del series #" + index);
            delete $scope.series[index];  // frees memory?
            $scope.series = $scope.series.slice(0,index).concat($scope.series.slice(index + 1));  // actual remove from array
            formatData();
        };

        $scope.addSeries = function(){
            console.log("adding new series");
            $scope.series.push($scope.createSeries({
                 "instrument": "inst " + $scope.series.length
            }));
            updateData();
        };

        var updateData = function() {
            // updates graph data using $scope.series
            // converts to proper data format for c3
            var XS = {};
            var cols = [];
            for (var i = 0; i < $scope.series.length; i++) {
                var seri = $scope.series[i];
                var energySeriesName = 'energy' + i;

                XS[seri.instrument] = energySeriesName;
                //XS[$scope.series[0].instrument] = 'energy1';
                //XS[$scope.series[1].instrument] = 'energy2';


                cols.push([seri.instrument].concat(seri.flux));
                cols.push([energySeriesName].concat(seri.energy));
                //[$scope.series[0].instrument].concat(  $scope.series[0].flux),
                //[$scope.series[1].instrument].concat(  $scope.series[1].flux),
                //["energy1"].concat($scope.series[0].energy),
                //["energy2"].concat($scope.series[1].energy)

            }
            //console.log(cols);

            $scope.data = {
                xs: XS,
                columns: cols,
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
                    label: 'flux',
                    tick:{
                        format: format(".2s")
                    }
                }
            };
        };
        updateData();  // init format data

        $scope.addItem = function() {
            var newItemNo = $scope.series.length + 1;
            //TODO
            //$scope.data....;
        };
    }])
   .directive("c3GraphWidget", function() {
    return {
        restrict: 'E',
        templateUrl: "ng-modules/c3GraphWidget/c3GraphWidget.html"
    };
    })
    .directive("seriesPanel", function(){
        return {
            restrict: 'E',
            templateUrl: "ng-modules/c3GraphWidget/seriesPanel.html"
        };
    });

module.exports = angular.module('c3GraphWidget').name;
