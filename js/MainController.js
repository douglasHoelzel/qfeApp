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
    $scope.startDate;
    $scope.toDate;
    $scope.fromDate;
    $scope.endDate;
    $scope.usEquityList = ["IYJ","IVV","IYH","IBB", "IYW", "IYF", "IYE", "IYC", "IHE"];
    $scope.startDate = "2015-12-31";
    $scope.endDate = "2016-06-30";
    $scope.frequency = "monthly";


    // highcharts
    $scope.getChart = function getChart() {
        console.log("Inside of get charts function");
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
    };

    // Ajax Call for Data
    $scope.getData = function(investableUniverse, assets, objectiveFunction, rebalancingFrequency, benchmark){
        console.log("IU: " + investableUniverse + " ||  Asset: " + assets + " || OF: " +
                    objectiveFunction + " || RF: " + rebalancingFrequency + " || BM: " + benchmark);
        $('#myOverlay').show();
        console.log("Getting data....");
            $.ajax({
                  type: "POST",
                  url: "https://api523-nmchenry.cloudapps.unc.edu/api/info",
                  data: JSON.stringify({

                              assets: $scope.usEquityList,
                              start_date: $scope.startDate,
                              end_date: $scope.endDate,
                              frequency: $scope.frequency
                        }),
                  contentType: "application/json; charset=UTF-8'",
                  dataType: "json",
                  success: function(data) {
                      console.log(JSON.stringify(data));
                  },
                  error: function(data){
                      console.log("AJAX Call Failed");
                      $('#myOverlay').hide();
                  },
                  complete: function (data) {
                      console.log("Done ajax call");
                      $('#myOverlay').hide();
                      console.log("Finished getting data");
                      swal({
                        type: 'success',
                        title: 'Chart Successfully Created',
                        showConfirmButton: false,
                        timer: 1000
                        }).then((result) => {
                               $scope.getChart();
                        })
                  }
                });

    }
    // Changes view on click of create chart button
    $scope.changeView = function(){
        $location.path("graphView");
    }

    // Invalid Click Popup
    $scope.invalidFormClick = function(){
        swal({
          type: 'error',
          text: 'Finish completing form',
        })

    }
});
