/* directive for material dropdown */
iplApp.directive('buttonDropdown', ['$timeout', function ($timeout) {

    function link(scope, element, attrs) {
        $(element).dropdown({ belowOrigin: true });
    }

    return {
        link: link
    };
}]);

/* directive for live score */
iplApp.directive('scoreBoard', ['$interval', 'dateFilter', function ($interval, dateFilter) {

    return {
        restrict: 'EA',
        templateUrl: 'views/score.html'
    };
}]);

/* directive for matches */
iplApp.directive('matches', ['$interval', 'dateFilter', function ($interval, dateFilter) {

    return {
        restrict: 'EA',
        templateUrl: 'views/matches.html'
    };
}]);
