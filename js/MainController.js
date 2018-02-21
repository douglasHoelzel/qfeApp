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
        $scope.myChart = Highcharts.chart('chart1Container', {
            title: {
                text: 'Visualization I'
                  },
                  yAxis: {
                      title: {
                          text: 'Percent Return'
                      }
                  },
                   xAxis: {
                      title: {
                          text: 'Time'
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
                      name: 'Portfolio',
                      data: [43934, 52503, 57177, 52503, 97031, 119931, 137133, 154175]
                  }, {
                      name: 'Benchmark',
                      data: [12908, 51503, 52177, 55503, 90031, 109931, 127133, 160175]
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
          $scope.myChart2 = Highcharts.chart('chart2Container', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Visualization II'
                },
                xAxis: {
                    categories: ['Var1', 'Var2', 'Var3', 'Var4', 'Var5']
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Time'
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                legend: {
                    align: 'right',
                    x: -30,
                    verticalAlign: 'top',
                    y: 25,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false
                },
                tooltip: {
                    headerFormat: '<b>{point.x}</b><br/>',
                    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                        }
                    }
                },
                series: [{
                    name: 'Asset1',
                    data: [5, 3, 4, 7, 2]
                }, {
                    name: 'Asset2',
                    data: [2, 2, 3, 2, 1]
                }, {
                    name: 'Asset3',
                    data: [3, 4, 4, 2, 5]
                }]
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
    }

    // Next function
    $scope.nextFunction = function(){
        console.log("inside of next function");
    }




});
