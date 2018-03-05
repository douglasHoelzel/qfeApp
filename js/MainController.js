var app = angular.module('myApp', ["ngRoute"]);
app.controller('myCtrl', function($scope, $http, $location) {
    $scope.investableUniverse;
    $scope.assets;
    $scope.objectiveFunction;
    $scope.rebalancingFrequency;
    $scope.benchmark;
    $scope.objectiveFunction;
    $scope.location;
    $scope.loading = false;
    $scope.myChart;


    // highcharts
    $scope.getChart = function getChart() {
        $('#myOverlay').show();
        $scope.loading = true;

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
                      data: [43934, 52503, 57177, 52503, 97031, 119931, 137133, 154175],
                      color: '#3498DB'
                  }, {
                      name: 'Benchmark',
                      data: [12908, 51503, 52177, 55503, 90031, 109931, 127133, 160175],
                      color: '#76D7C4'
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
                    color: '#5DADE2',
                    data: [5, 3, 4, 7, 2]
                }, {
                    name: 'Asset2',
                    color: '#76D7C4',
                    data: [2, 2, 3, 2, 1]
                }, {
                    name: 'Asset3',
                    color: '#BFC9CA',
                    data: [3, 4, 4, 2, 5]
                }]
            });
            $scope.loading = false;
            $('#myOverlay').hide();

    };


    // Button for creating chart
    $scope.createChart = function createChart(investableUniverse, assets,
                                            objectiveFunction, rebalancingFrequency, benchmark) {
        console.log("IU: " + investableUniverse + " ||  Asset: " + assets + " || OF: " +
                    objectiveFunction + " || RF: " + rebalancingFrequency + " || BM: " + benchmark);
        swal({
          type: 'success',
          title: 'Chart Successfully Created',
          showConfirmButton: false,
          timer: 1000
      })
    };

    // Initializing the typeahead
    $('.typeahead').typeahead({
        hint: true,
        highlight: true, /* Enable substring highlighting */
        minLength: 1 /* Specify minimum characters required for showing result */
    },
    {
        name: 'asset',
        source: $scope.asset
    });
    $scope.getData = function(){
            $http({
              method: 'GET',
              url: 'https://dog.ceo/api/breeds/list',
              dataType: 'json',
            }).then(function successCallback(response) {
                var jsonResponse = JSON.stringify(response);
                console.log("Response from AJAX: " + jsonResponse);
              }, function errorCallback(response) {
                console.log("Response (ERROR) from AJAX: " + response);
              });

    }
    // Changes view on click of create chart button
    $scope.changeView = function(){
        console.log("Inside of change view");
        $location.path("graphView");
        setTimeout(function(){ $scope.getChart(); }, 1000);
        $scope.getData();

    }

    // Next function
    $scope.nextFunction = function(){
        console.log("inside of next function");
    }





});
