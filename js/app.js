app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "home.html"
    })
    .when("/home/", {
        templateUrl : "home.html"
    })
    .when("/graphView/", {
        templateUrl : "graphView.html"
    })
    .when("/selectedGraph/", {
        templateUrl : "selectedGraph.html"
    });
});
