var app = angular.module('myApp', ["ngRoute"]);
app.controller('myCtrl', function($scope, $http, $location) {
    $scope.investableUniverse = "US Equities";
    $scope.objectiveFunction = "Sharpe Ratio";
    $scope.frequency = "monthly";
    $scope.benchmark = "S&P500";
    $scope.startDate;
    $scope.endDate;
    $scope.objectiveFunction;
    $scope.location;
    $scope.myChart;
    $scope.usEquityList = ["IYJ","IVV","IYH","IBB", "IYW", "IYF", "IYE", "IYC", "IHE"];
    //Line Chart Variables
    $scope.optimizedReturnsDates = [];
    $scope.optimizedReturnsValues = [];
    // Bar Chart Variables
    $scope.optimizedWeightsDates = [];


    // highcharts
    $scope.getChart = function getChart() {
        // Line Chart
        $scope.myChart = Highcharts.chart('chart1Container', {
            title: {
                text: 'Visualization I'
                  },
                  yAxis: {title: {text: 'Percent Return'}},
                  xAxis: {
                   categories: $scope.optimizedReturnsDates,
                   tickInterval: 1,
                   labels: {enabled: true}
                  },
                  legend: {layout: 'vertical',align: 'right',verticalAlign: 'middle'},
                  plotOptions: {spline: {marker: {enabled: true}}
                  },
                  series: [{name: 'Portfolio',data:  $scope.optimizedReturnsValues,color: '#3498DB'}],
                  responsive: {rules: [{condition: {maxWidth: 500},
                  chartOptions: {legend: {layout: 'horizontal', align: 'center', verticalAlign: 'bottom'}}
                  }]}
              });
          // Bar Chart
          $scope.myChart2 = Highcharts.chart('chart2Container', {
                chart: {type: 'column'},
                title: {text: 'Visualization II'},
                xAxis: {categories: $scope.optimizedWeightsDates,},
                yAxis: { min: 0, title: { text: 'Time' },
                    stackLabels: {enabled: true,style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'}
                    }
                },
                legend: {align: 'right',x: -30,verticalAlign: 'top',y: 25,floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false
                },
                tooltip: {headerFormat: '<b>{point.x}</b><br/>',pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'},
                plotOptions: {column: {stacking: 'normal',
                dataLabels: {enabled: true, color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'}
                    }
                },
                series: [{
                    name: $scope.usEquityList[0],
                    color: '#5DADE2',
                    data: [5, 3, 4, 7, 2]
                }, {
                    name: $scope.usEquityList[1],
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
    $scope.getData = function(investableUniverse, assets, objectiveFunction, frequency, benchmark, startDate, endDate){
        $scope.investableUniverse = investableUniverse;
        $scope.usEquityList = assets;
        $scope.frequency = frequency.toLowerCase();
        $scope.startDate = Date.parse(startDate).toString("yyyy-MM-dd");
        $scope.endDate = Date.parse(endDate).toString("yyyy-MM-dd");
        $('#myOverlay').show();
        console.log("Starting AJAX Call....");
            $.ajax({
                  type: "POST",
                  url: "https://api523-nmchenry.cloudapps.unc.edu/api/info",
                  data: JSON.stringify({ assets: $scope.usEquityList, start_date: "2015-12-31", end_date: "2016-06-30", frequency: $scope.frequency }),
                  contentType: "application/json; charset=UTF-8'",
                  dataType: "json",
                  success: function(data) {
                      $scope.parseData(data);
                  },
                  error: function(data){
                      swal({
                        type: 'error',
                        text: 'Error, Try submitting again',
                      })
                      $('#myOverlay').hide();
                  },
                  complete: function (data) {
                      $('#myOverlay').hide();
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
        $('#userInputContainer').hide();
        swal({
          type: 'error',
          text: 'Finish completing form',
          showConfirmButton: false,
          timer: 1000
        }).then((result) => {
              $('#userInputContainer').show();
        })
    }

    // Parses All Data Coming from API
    $scope.parseData = function(data){
        console.log(data);
        console.log("Inside of data parser");
        // Parses All Optimized Returns Data and Saves it
        for (var key in data.optimized_returns) {
                    $scope.optimizedReturnsDates.push(key);
                    $scope.optimizedReturnsValues.push(data.optimized_returns[key]);
        }
        // Parses All Optimized Weights Dates
        for (var key in data.optimized_weights) {
                    $scope.optimizedWeightsDates.push(key);
        }
        // Parses All
    }
});
