var app = angular.module('myApp', ["ngRoute"]);
app.controller('myCtrl', function($scope, $http, $location) {
    $scope.testVar = "Test Variable";
    $scope.investableUniverse;
    $scope.assets;
    $scope.objectiveFunction;
    $scope.rebalancingFrequency;
    $scope.benchmark;
    $scope.objectiveFunction;
    $scope.location;
    $scope.loading = false;


    // highcharts
    $scope.getChart = function createChart() {
        console.log("inside of getChart()");

    };


    // Button for creating chart
    $scope.createChart = function createChart(investableUniverse, assets, objectiveFunction, rebalancingFrequency, benchmark) {
        console.log("Create Chart Button Clicked");
        swal({
          type: 'success',
          title: 'Chart Successfully Created',
          showConfirmButton: false,
          timer: 1500
      })
      $scope.getChart();
    };

    // Changes view on click of create chart button
    $scope.changeView = function(){
        $location.path("graphView");
    }

    // Next function
    $scope.nextFunction = function(){
        console.log("inside of next function");
    }




});
