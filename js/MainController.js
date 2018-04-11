var app = angular.module('myApp', ["ngRoute"]);
app.controller('myCtrl', function($scope, $http, $location, $rootScope) {
    $rootScope.loading = false;
    $scope.investableUniverse = "US Equities";
    $scope.objectiveFunction = "Sharpe Ratio";
    $scope.frequency = "monthly";
    $scope.benchmark = "S&P500";
    $scope.benchmarkList = ["IVV"];
    $scope.startDate;
    $scope.endDate;
    $scope.objectiveFunction;
    $scope.location;
    $scope.transaction_costs;
    $scope.myChart;
    $scope.usEquityList = ["IYJ","IVV","IYH","IBB", "IYW", "IYF", "IYE", "IYC", "IHE"];
    $rootScope.optimizedReturnsDates = [];
    $rootScope.optimizedReturnsValues = [];
    $scope.optimizedWeightsDates = [];
    $rootScope.benchmarkReturnsDates = [];
    $rootScope.benchmarkReturnsValues = [];
    $scope.benchmarkWeightsDates = [];
    $scope.benchmarkDataNames = [];
    $scope.optimizedWeightsAsset1 = [];$scope.optimizedWeightsAsset2 = [];$scope.optimizedWeightsAsset3 = [];$scope.optimizedWeightsAsset4 = [];
    $scope.optimizedWeightsAsset5 = [];$scope.optimizedWeightsAsset6 = [];$scope.optimizedWeightsAsset7 = [];$scope.optimizedWeightsAsset8 = [];
    $scope.optimizedWeightsAsset9 = [];



    $rootScope.myChart;
    $rootScope.myChart2;

    // Highcharts
    $rootScope.getChart = function getChart() {
        console.log("Getting graphs now...");
        // Line Chart
        $rootScope.myChart = Highcharts.chart('chart1', {
            title: {
                text: 'Cumulative Returns'
                  },
                  yAxis: {title: {text: 'Percent Return'}},
                  xAxis: {
                   categories: $rootScope.optimizedReturnsDates,
                   tickInterval: 1,
                   labels: {enabled: true}
                  },
                  legend: {layout: 'vertical',align: 'right',verticalAlign: 'middle'},
                  plotOptions: {spline: {marker: {enabled: true}}
                  },
                  series: [ { name: 'Portfolio', data:  $rootScope.optimizedReturnsValues, color: '#3498DB' } ,
                            { name: 'Benchmark', data:  $rootScope.benchmarkReturnsValues, color: '#DB3434' }
                          ],
                  exporting: { buttons: {customButton: {text: 'Enlarge',
                   onclick: function () {
                       $scope.selectChartClick("1");
                        }
                    }
                   }
                 },
                  responsive: {rules: [{condition: {maxWidth: 1500},
                  chartOptions: {legend: {layout: 'horizontal', align: 'center', verticalAlign: 'bottom'}}
                  }]}
              });

              $scope.$apply();
              $rootScope.$apply();
          // Bar Chart
          $rootScope.myChart2 = Highcharts.chart('chart2', {
                chart: {type: 'column'},
                title: {text: 'Visualization II'},
                xAxis: {categories: $scope.optimizedWeightsDates,},
                yAxis: { min: 0, title: { text: 'Time' } //,
                    //stackLabels: {enabled: true,style: {
                       //     fontWeight: 'bold',
                       //     color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'}
                   // }
                },
                legend: {align: 'right',x: -30,verticalAlign: 'top',y: 25,floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false
                },
                tooltip: {headerFormat: '<b>{point.x}</b><br/>',pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'},
                plotOptions: {column: {stacking: 'normal' //,
                //dataLabels: {enabled: true, color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'}
                    }
                },
                series: [
                    { name: $scope.usEquityList[0], color: '#5DADE2', data: $scope.optimizedWeightsAsset1 },
                    { name: $scope.usEquityList[1], color: '#76D7C4', data: $scope.optimizedWeightsAsset2 },
                    { name: $scope.usEquityList[2], color: '#BFC9CA', data: $scope.optimizedWeightsAsset3 },
                    { name: $scope.usEquityList[3], color: '#5ED483', data: $scope.optimizedWeightsAsset4 },
                    { name: $scope.usEquityList[4], color: '#4AADA7', data: $scope.optimizedWeightsAsset5 },
                    { name: $scope.usEquityList[5], color: '#4C6CAB', data: $scope.optimizedWeightsAsset6 },
                    { name: $scope.usEquityList[6], color: '#4968E9', data: $scope.optimizedWeightsAsset7 },
                    { name: $scope.usEquityList[7], color: '#47E0B2', data: $scope.optimizedWeightsAsset8 },
                    { name: $scope.usEquityList[8], color: '#47E0B2', data: $scope.optimizedWeightsAsset9 },
                    ],
                exporting: { buttons: {customButton: {text: 'Enlarge',
                 onclick: function () {
                     $scope.selectChartClick("2");
                      }
                  }
                 }
               },
            });
            $rootScope.$apply();
    };

    // Ajax Call for Data
    $scope.getData = function(investableUniverse, assets, objectiveFunction, frequency, benchmark, startDate, endDate, transaction_costs){
        $scope.investableUniverse = investableUniverse;
        $scope.usEquityList = assets;
        $scope.transaction_costs = transaction_costs;
        $scope.frequency = frequency.toLowerCase();
        $scope.startDate = Date.parse(startDate).toString("yyyy-MM-dd");
        $scope.endDate = Date.parse(endDate).toString("yyyy-MM-dd");
        console.log("SD: "+ $scope.startDate + " ED: " + $scope.endDate);
        $('#myOverlay').show();
        $rootScope.loading = true;
        console.log("Starting AJAX Call....");
            $.ajax({
                  type: "POST",
                   //type: "GET",
                  url: "https://api523-nmchenry.cloudapps.unc.edu/api/info",
                   //url: "https://api523-nmchenry.cloudapps.unc.edu/api/test",
                  data: JSON.stringify({ assets: $scope.usEquityList, benchmark: $scope.benchmarkList, start_date: $scope.startDate, end_date: $scope.endDate, frequency: $scope.frequency, transaction_costs: $scope.transaction_costs }),
                  contentType: "application/json; charset=UTF-8'",
                  dataType: "json",
                  success: function(data) {
                      $scope.parseData(data);
                      console.log(data);
                  },
                  error: function(data){
                      $rootScope.loading = false;
                      swal({
                        type: 'error',
                        text: 'Error, Try submitting again',
                      })
                      $('#myOverlay').hide();

                  },
                  complete: function (data) {
                      $rootScope.loading = false;
                      setTimeout(function(){}, 2000);
                      $('#myOverlay').hide();
                      swal({
                        type: 'success',
                        title: 'Chart Successfully Created',
                        showConfirmButton: false,
                        timer: 1000
                        }).then((result) => {
                               $rootScope.getChart();
                        })
                  }
                });
    }
    // Changes view on click of create chart button
    $scope.changeView = function(){
        $location.path("graphView");
    }
    // Invalid Form Popup
    $scope.invalidFormClick = function(){
        $('#userInputContainer').hide();
        swal({
          type: 'error',
          text: 'Finish completing form',
          showConfirmButton: false,
          timer: 2000
        }).then((result) => {
              $('#userInputContainer').show();
        })
    }

    // Parses All Data Coming from API
    $scope.parseData = function(data){
        console.log("Inside of data parser");
        console.log(data);

        // Parses All Optimized Weights Dates
        for (var key in data.optimized_weights) {
                    $scope.optimizedWeightsDates.push(key);
        }

        // Parses Benchmark and Portfolio Data
        for (var key in data.benchmark_portfolio_intersection) {
                    $rootScope.optimizedReturnsDates.push(key);
                    $rootScope.optimizedReturnsValues.push(data.benchmark_portfolio_intersection[key][0]);
                    $rootScope.benchmarkReturnsValues.push(data.benchmark_portfolio_intersection[key][1]);
        }

        // Parses All Benchmark Data
        for (var key in data.optimized_weights) {
            $scope.optimizedWeightsAsset1.push(Math.abs(data.optimized_weights[key]['0'][1]));
            $scope.optimizedWeightsAsset2.push(Math.abs(data.optimized_weights[key]['1'][1]));
            $scope.optimizedWeightsAsset3.push(Math.abs(data.optimized_weights[key]['2'][1]));
            $scope.optimizedWeightsAsset4.push(Math.abs(data.optimized_weights[key]['3'][1]));
            $scope.optimizedWeightsAsset5.push(Math.abs(data.optimized_weights[key]['4'][1]));
            $scope.optimizedWeightsAsset6.push(Math.abs(data.optimized_weights[key]['5'][1]));
            $scope.optimizedWeightsAsset7.push(Math.abs(data.optimized_weights[key]['6'][1]));
            $scope.optimizedWeightsAsset8.push(Math.abs(data.optimized_weights[key]['7'][1]));
            $scope.optimizedWeightsAsset9.push(Math.abs(data.optimized_weights[key]['7'][1]));
        }
    }
    // Selects Chart and changes view
    $scope.selectChartClick = function(chartNumber){
        if(chartNumber == 1){
            var graphToHide = document.getElementById("chart2");
            var graphToShow= document.getElementById("chart1").width = "1200px";
            var graphToShowContainer = document.getElementById("chart" + chartNumber + "Container");
                graphToShowContainer.style.width = "1200px";
        }else{
            var graphToHide = document.getElementById("chart1");
            var graphToShow = document.getElementById("chart2").width = "1200px";
            var graphToShowContainer = document.getElementById("chart" + chartNumber + "Container");
                graphToShowContainer.style.width = "1200px";
                document.getElementById("chart2").style.marginTop = "-200px";
                document.getElementById("chart2Container").style.marginTop = "-200px";
        }
            if (graphToHide.style.display === "none") {
                graphToHide.style.display = "block";
                graphToShow.width = "700px";
                graphToShowContainer.style.width = "700px";
                if(chartNumber == 2){
                    document.getElementById("chart2").style.marginTop = "10px";
                    document.getElementById("chart2Container").style.marginTop = "10px";
                }
            } else {
                graphToHide.style.display = "none";
            }
         $scope.getChart();
    }
});
