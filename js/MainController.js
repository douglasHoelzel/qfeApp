var app = angular.module('myApp', ["ngRoute"]);
app.controller('myCtrl', function($scope, $http, $location, $rootScope) {
    $rootScope.loading = false;
    $rootScope.loading2 = false;
    $rootScope.loading3 = false;
    $scope.investableUniverse = [];
    $scope.investableUniverseString = "";
    $scope.objectiveFunction = "Sharpe Ratio";
    $scope.frequency = "monthly";
    $scope.benchmarkList = [];
    $scope.benchmarkListString = "";
    $scope.startDate;
    $scope.endDate;
    $scope.startDateFormatted;
    $scope.endDateFormatted;
    $scope.objectiveFunction;
    $scope.location;
    $scope.transaction_costs;
    $scope.transaction_costs_string;
    $scope.myChart;
    $scope.usEquityList = [];
    $rootScope.optimizedReturnsDates = [];
    $rootScope.optimizedReturnsValues = [];
    $scope.optimizedWeightsDates = [];
    $rootScope.benchmarkReturnsDates = [];
    $rootScope.benchmarkReturnsValues = [];
    $scope.benchmarkWeightsDates = [];
    $scope.benchmarkDataNames = [];
    $scope.optimizedWeightsNames = [];
    $scope.optimizedWeightsAsset1 = [];
    $scope.optimizedWeightsAsset2 = [];
    $scope.optimizedWeightsAsset3 = [];
    $scope.optimizedWeightsAsset4 = [];
    $rootScope.myChart;
    $rootScope.myChart2;
    $scope.chartIsVisible = true;

    // Highcharts
    $rootScope.getChart = function getChart() {
        // Line Chart
        $rootScope.myChart = Highcharts.chart('chart1', {
            title: {
                text: 'Portfolio vs Benchmark Cumulative Returns'
                  },
                  yAxis: {title: {text: 'Percent Return'}, labels: { format: '{value}%' }},
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
                title: {text: 'Optimal Portfolio Weights'},
                xAxis: {categories: $scope.optimizedWeightsDates,},
                yAxis: { min: 0, title: { text: 'Allocation' } //,
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
                    { name: $scope.optimizedWeightsNames[0], color: '#5DADE2', data: $scope.optimizedWeightsAsset1 },
                    { name: $scope.optimizedWeightsNames[1], color: '#76D7C4', data: $scope.optimizedWeightsAsset2 },
                    { name: $scope.optimizedWeightsNames[2], color: '#BFC9CA', data: $scope.optimizedWeightsAsset3 },
                    { name: $scope.optimizedWeightsNames[3], color: '#A878D4', data: $scope.optimizedWeightsAsset4 },
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
    $scope.getData = function(investableUniverse, transaction_costs, objectiveFunction, frequency, benchmark, startDate, endDate){
        if (investableUniverse == "usEquity"){ $scope.investableUniverse = ["IYH", "IYF", "IYK", "IYW"]; $scope.investableUniverseString = "IYH, IYF, IYK, IYW";}
        else if(investableUniverse == "internationalEquity"){ $scope.investableUniverse = ["EWG", "EWU", "EWJ", "FXI"]; $scope.investableUniverseString = "EWG, EWU, EWJ, FXI"; }
        else if(investableUniverse == "commodities"){ $scope.investableUniverse = ["IAU", "SLV", "VEGI", "FILL"]; $scope.investableUniverseString ="IAU, SLV, VEGI, FILL"; }
        else{ $scope.investableUniverse = ["FXB", "FXCH", "FXE", "FXY"]; $scope.investableUniverseString = "FXB, FXCH, FXE, FXY"; }

        if(benchmark == "sp500Benchmark"){ $scope.benchmarkList =  ["IVV"]; $scope.benchmarkListString = "IVV"; }
        else if(benchmark == "internationalEquityBenchmark") {$scope.benchmarkList = ["EFA"]; $scope.benchmarkListString = "EFA"; }
        else if(benchmark == "usTreasuryBenchmark") {$scope.benchmarkList = ["IEF"]; $scope.benchmarkListString = "IEF";}
        else {$scope.benchmarkList = ["GSG"]; $scope.benchmarkListString = "GSG";}

        if(transaction_costs == "0"){ $scope.transaction_costs_string = "No"; }
        else{ $scope.transaction_costs_string = "Yes"; }

        $scope.transaction_costs = transaction_costs;
        $scope.frequency = frequency.toLowerCase();
        $scope.startDateFormatted = Date.parse(startDate).toString("yyyy-MM-dd");
        $scope.endDateFormatted = Date.parse(endDate).toString("yyyy-MM-dd");
        $scope.startDate = startDate;
        $scope.endDate = endDate;
        $('#myOverlay').show();
        $rootScope.loading = true;
            $.ajax({
                  type: "POST",
                  // type: "GET",
                  //url: "https://api523-nmchenry.cloudapps.unc.edu/api/test",
                  url: "https://qfe-backend-523-maguilar.cloudapps.unc.edu/api/info",
                  data: JSON.stringify({ assets: $scope.investableUniverse, benchmark: $scope.benchmarkList, start_date: $scope.startDateFormatted, end_date: $scope.endDateFormatted, frequency: $scope.frequency, transaction_costs: $scope.transaction_costs }),
                  contentType: "application/json; charset=UTF-8'",
                  dataType: "json",
                  success: function(data) {
                      console.log("data came back success");
                       var dataObject = Object.keys(data);
                       console.log(data);
                       console.log(dataObject[0]);
                       if(dataObject[0] == "Error Code"){
                           swal({
                             type: 'error',
                             text: 'Error, Try submitting again',
                           })
                       }else{$scope.parseData(data);}

                  },
                  error: function(data){
                      $rootScope.loading = false;
                      $('#myOverlay').hide();
                      console.log("Error Found");
                      console.log(data);
                      swal({
                        type: 'error',
                        text: 'Error, Try submitting again',
                      })
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
        // Parses All Optimized Weights Dates
        for (var key in data.optimized_weights) {
                    $scope.optimizedWeightsDates.push(key);
        }

        // Parses Benchmark and Portfolio Data
        for (var key in data.benchmark_portfolio_intersection) {
                    $rootScope.optimizedReturnsDates.push(key);
                    $rootScope.optimizedReturnsValues.push(data.benchmark_portfolio_intersection[key][0] * 100);
                    $rootScope.benchmarkReturnsValues.push(data.benchmark_portfolio_intersection[key][1] * 100);
        }

        // Parses All Optimized Weights Data
        for (var key in data.optimized_weights) {
            $scope.optimizedWeightsAsset1.push(Math.abs(data.optimized_weights[key]['0'][1]));
            $scope.optimizedWeightsAsset2.push(Math.abs(data.optimized_weights[key]['1'][1]));
            $scope.optimizedWeightsAsset3.push(Math.abs(data.optimized_weights[key]['2'][1]));
            $scope.optimizedWeightsAsset4.push(Math.abs(data.optimized_weights[key]['3'][1]));
        }
        var keys = Object.keys(data.optimized_weights);
        var firstDate = keys[0];
        var length = data.optimized_weights[firstDate].length;
            for (var i = 0; i < length; i++) {
                $scope.optimizedWeightsNames.push(data.optimized_weights[firstDate][i][0]);
            }

        console.log("Weights Names: "  + $scope.optimizedWeightsNames);
    }
    $(".datepicker").datepicker({
        assumeNearbyYear: true
    });
    // Selects Chart and changes view
    $scope.selectChartClick = function(chartNumber){
        if($scope.chartIsVisible == true){ $('#formDataContainer').hide(); $scope.chartIsVisible = false; }
        else { $('#formDataContainer').show(); $scope.chartIsVisible = true; }

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
