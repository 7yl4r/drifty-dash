/**
 * Created by tylar on 9/23/15.
 */

angular.module('demoWidget', [])
    .controller('demoWidgetController', ['$scope', function($scope) {

        /*
         TODO:
         Wavelength  -> lambda[angstroms] = 9.044 / np.sqrt(E[meV])
         Wave vector -> k[angstroms^-1] = 2*np.pi/lambda[angstroms]
         Frequency   -> nu[THz] = 0.2418*E[meV]
         Wavenumber  -> nu[cm-1] = nu[Hz] / (2.998 * 10^10 cm/s)
         Velocity    -> v[km/s] = 0.6302 k[angstroms^-1]
         Temperature -> T[K] = 11.605 * E[meV]
         Energy      -> E[meV] = 2.072*k^2 [angstroms^-1]

         lambda = 9.044 / sqrt(E)
         k      = 2*PI / lambda
         nu_f   = .2418 * E
         nu_w   = nu_f*1000000000000 / (2.998 * 10^10)
         nu_v   = 0.6302 * k
         T      = 11.605 * E
         E      = 2.072 * k * k
         */

        $scope.updateWavelength = function() {
            console.log('update wavelen')
            $scope.waveVector = 2*Math.PI / $scope.wavelength
            console.log('wavelen=' + $scope.wavelength)
            console.log('waveVector=' + $scope.waveVector)
        };

        /*
        $scope.updateWavelength = function(){

        }

        $scope.updateWaveVector = function(){

        }
        $scope.updateFreq = function(){

        }
        $scope.updateWavenumber = function(){

        }
        $scope.updateVelocity = function(){

        }
        $scope.updateTemperature = function(){

        }
        $scope.updateEnergy = function(){

        }
        */

    }])

   .directive("demoWidget", function() {
    return {
        restrict: 'E',
        templateUrl: "ng-modules/demoWidget/demoWidget.html"
    };
});

module.exports = angular.module('demoWidget').name;