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
        var myChart = Highcharts.chart('container', {
            title: {
            text: 'Solar Employment Growth by Sector, 2010-2016'
            },

            subtitle: {
            text: 'Source: thesolarfoundation.com'
            },

            yAxis: {
            title: {
                text: 'Number of Employees'
            }
            },
            legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
            },

            plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 2010
            }
            },

            series: [{
            name: 'Installation',
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
            }, {
            name: 'Manufacturing',
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
            }, {
            name: 'Sales & Distribution',
            data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
            }, {
            name: 'Project Development',
            data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
            }, {
            name: 'Other',
            data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
            }],

            responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
            }

                            });
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
    };

    // Changes view on click of create chart button
    $scope.changeView = function(){
        $location.path("graphView");
        $scope.getChart();
    }

    // Next function
    $scope.nextFunction = function(){
        console.log("inside of next function");
    }




});
