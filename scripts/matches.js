'use strict';

iplControllers.controller('MatchCtrl', ['$rootScope',
    '$scope',
    '$location',
    'dataService',
    '$filter',
    '$timeout',
    '$window',
    '$routeParams',
    '$interval',
    function ($rootScope, $scope, $location, dataService, $filter, $timeout, $window, $routeParams, $interval) {

        $scope.isLoadedData = false;
        $scope.sortBy = 'season';
        $scope.selectedSeason = "2008";
        $scope.seasons = [
            "2008",
            "2009",
            "2010",
            "2011",
            "2012",
            "2013",
            "2014",
            "2015",
            "2016"
        ];

        /* loading match data */
        loadMatches();
        function loadMatches() {
            dataService.getMatches($scope.selectedSeason).then(function (data) {
                console.log("data", data);

                if (data.data) {
                    $scope.data = data.data;
                } else {
                    $scope.data = {};
                }
                $scope.isLoadedData = true;
            }, function (err) {
                $scope.data = {};
                $scope.isLoadedData = true;
                console.log("service failed", err);
            });
        }

        /* Changing season dropdown */
        $scope.changeSeason = function (season) {
            console.log("season", season);
            $scope.selectedSeason = season;
        }

        /* loading data */
        getData();
        function getData() {
            $scope.isLoadedData = false;
            dataService.getData(function (data) {
                console.log("data", data);
                $scope.selectedMatch = dataService.getMatchData($scope.matchId);
                $scope.matchData = dataService.getFullMatchData($scope.matchId);
                $scope.startTimer();
                $scope.isLoadedData = true;
            });


        }


    }]);