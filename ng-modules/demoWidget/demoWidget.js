/**
 * Created by tylar on 9/23/15.
 */

angular.module('demoWidget', [])
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

        /*
         Wavelength  = 9.044 / sqrt(Energy)
         WaveVector  = 2*PI / Wavelength
         Frequency   = .2418 * Energy
         Wavenumber  = Frequency*1000000000000 / (2.998 * 10^10)
         Velocity    = 0.6302 * WaveVector
         Temperature = 11.605 * Energy
         Energy      = 2.072 * WaveVector * WaveVector
         */

        $scope._updateState = function(user_triggered){
            if (user_triggered){
                // reset updated states
                $scope.updated = {
                    wavelength:false,
                    waveVector:false,
                    frequency:false,
                    wavenumber:false,
                    velocity:false,
                    temperature:false,
                    energy:false
                };
            }
        };

        $scope.updateWavelength = function(user_triggered) {
            $scope._updateState(user_triggered);
            $scope.updated.wavelength=true;
            //console.log('update wavelen')

            if (!$scope.updated.waveVector) {
                // WaveVector  = 2*PI / Wavelength
                $scope.waveVector = 2 * Math.PI / $scope.wavelength;
                $scope.updateWaveVector();
            }

            //  Energy = (9.044 / Wavelength)^2
            if (!$scope.updated.energy){
                $scope.energy = (9.044 / $scope.wavelength);
                $scope.energy *= $scope.energy;
                $scope.updateEnergy();
            }
        };

        $scope.updateWaveVector = function(user_triggered){
            $scope._updateState(user_triggered);
            $scope.updated.waveVector=true;

            if (!$scope.updated.wavelength) {
                //  Wavelength = 2*PI / WaveVector
                $scope.wavelength = 2 * Math.PI / $scope.waveVector;
                $scope.updateWavelength();
            }

            //         Energy      = 2.072 * WaveVector * WaveVector
            if (!$scope.updated.energy){
                $scope.energy = 2.072 * $scope.waveVector * $scope.waveVector;
                $scope.updateEnergy();
            }

            //         Velocity    = 0.6302 * WaveVector
            if (!$scope.updated.velocity){
                $scope.velocity = 0.6302 * $scope.waveVector;
                $scope.updateVelocity();
            }
        };

        $scope.updateFreq = function(user_triggered){
            $scope._updateState(user_triggered);
            $scope.updated.frequency = true;

            //         Frequency  /.2418  =  Energy
            if (!$scope.updated.energy){
                $scope.energy = $scope.frequency / .2418;
                $scope.updateEnergy();
            }

            //         Wavenumber  = Frequency*1000000000000 / (2.998 * 10^10)
            if (!$scope.updated.wavenumber){
                $scope.wavenumber = $scope.frequency*1000000000000 / (2.998 * Math.pow(10,10));
                $scope.updateWavenumber();
            }
        };
        $scope.updateWavenumber = function(user_triggered){
            $scope._updateState(user_triggered);
            $scope.updated.wavenumber = true;

            //         Wavenumber * (2.998 * 10^10) / 1000000000000 = Frequency
            if (!$scope.updated.frequency){
                $scope.frequency = $scope.wavenumber * (2.998 * Math.pow(10,10)) / 1000000000000;
                $scope.updateFreq();
            }

        };
        $scope.updateVelocity = function(user_triggered){
            $scope._updateState(user_triggered);
            $scope.updated.velocity = true;

            //         Velocity / .6302   =  WaveVector
            if (!$scope.updated.waveVector){
                $scope.waveVector = $scope.velocity / .6302
                $scope.updateWaveVector();
            }
        };
        $scope.updateTemperature = function(user_triggered){
            $scope._updateState(user_triggered);
            $scope.updated.temperature = true;

            //         Temperature = 11.605 * Energy
            if (!$scope.updated.energy){
                $scope.energy = $scope.temperature / 11.605;
                $scope.updateEnergy();
            }

        };
        $scope.updateEnergy = function(user_triggered){
            $scope._updateState(user_triggered);
            $scope.updated.energy = true;

            if (!$scope.updated.wavelength){
                // Wavelength  = 9.044 / sqrt(Energy)
                $scope.wavelength = 9.044 / Math.sqrt($scope.energy);
                $scope.updateWavelength();
            }

            //         Frequency   = .2418 * Energy
            if (!$scope.updated.frequency){
                $scope.frequency = .2418 * $scope.energy;
                $scope.updateFreq();
            }

            //Temperature = 11.605 * Energy
            if (!$scope.updated.temperature){
                $scope.temperature = 11.605 * $scope.energy;
                $scope.updateTemperature();
            }

            // sqrt(Energy / 2.072)     =  WaveVector
            if (!$scope.updated.waveVector){
                $scope.waveVector = Math.sqrt($scope.energy / 2.072);
                $scope.updateWaveVector();
            }
        }
    }])
   .directive("demoWidget", function() {
    return {
        restrict: 'E',
        templateUrl: "ng-modules/demoWidget/demoWidget.html"
    };
});

module.exports = angular.module('demoWidget').name;