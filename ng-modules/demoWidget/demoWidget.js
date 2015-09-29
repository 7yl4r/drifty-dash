/**
 * Created by tylar on 9/23/15.
 */
 
SysEqController = require('./SysEqController.coffee');


angular.module('demoWidget', [
])
    .controller('demoWidgetController', ['$scope', function($scope) {
        // TODO: this hack is a mess. Should use keys to lookup values in boolean updated dict and numeric values dict
        // TODO:      instead of hard-coded keys in updated and bare vars for values.
        $scope.updated = {  // used to track if values have been updated since last user input
            wavelength:false,
            waveVector:false,
            frequency:false,
            wavenumber:false,
            velocity:false,
            temperature:false,
            energy:false
        };
        
        $scope.sysEq = new SysEqController({
            'wavelength': [
                'energy': function(wavelength){  
                    return Math.pow( 9.044 / wavelength , 2)
                },
                'waveVector': function(wavelength){
                    return 2*Math.PI / wavelength
                }
            ],
            'energy': [
                'wavelength': function(energy){
                    return 9.044 / Math.sqrt(energy)
                },
                'frequency': function(energy){
                    return .2418 * energy
                },
                'temperature': function(energy){
                    return 11.605 * energy
                },
                'waveVector': function(energy){
                    return Math.sqrt(energy / 2.072)
                }
            ],
            'waveVector': [
                'wavelength': function(waveVector){
                    return 2*Math.PI / waveVector
                },
                'velocity': function(waveVector){
                    return 0.6302 * waveVector
                },
                'energy': function(waveVector){
                    return 2.072 * waveVector*waveVector
                }
            ],
            'frequency': [
                'energy': function(frequency){
                    return frequency/.2418
                },
                'wavenumber': function(frequency){
                    return frequency*1000000000000 / (2.998 * Math.pow(10,10)
                }
            ],
            'wavenumber': [
                'frequency': function(wavenumber){
                    return (2.998 * Math.pow(10,10) * wavenumber / 1000000000000
                }
            ],
            'velocity': [
                'waveVector': function(freq){
                    return freq / .6302 
                }
            ],
            'temperature': [
                'energy': function(temp){
                    return temp / 11.605
                }
            ]
            
        });

        
    }])
   .directive("demoWidget", function() {
    return {
        restrict: 'E',
        templateUrl: "ng-modules/demoWidget/demoWidget.html"
    };
});

module.exports = angular.module('demoWidget').name;