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
                $scope.updateEnergy()
            }
        };

        $scope.updateWaveVector = function(user_triggered){
            $scope._updateState(user_triggered);
            $scope.updated.wavevector=true;

            if (!$scope.updated.wavelength) {
                //  Wavelength = 2*PI / WaveVector
                $scope.wavelength = 2 * Math.PI / $scope.waveVector;
                $scope.updateWavelength();
            }
        };

        $scope.updateFreq = function(user_triggered){
            $scope._updateState(user_triggered);

        };
        $scope.updateWavenumber = function(user_triggered){
            $scope._updateState(user_triggered);

        };
        $scope.updateVelocity = function(user_triggered){
            $scope._updateState(user_triggered);

        };
        $scope.updateTemperature = function(user_triggered){
            $scope._updateState(user_triggered);

        };
        $scope.updateEnergy = function(user_triggered){
            $scope._updateState(user_triggered);
            $scope.updated.energy = true;

            if (!$scope.updated.wavelength){
                // Wavelength  = 9.044 / sqrt(Energy)
                $scope.wavelength = 9.044 / Math.sqrt($scope.energy);
                $scope.updateWavelength();
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