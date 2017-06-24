'use strict';

iplControllers.controller('ScoreCtrl', ['$rootScope',
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
        $scope.matchId = $routeParams.id;

        $scope.selectedMatch = {};
        $scope.matchData = [];
        $scope.timerIndex = 0;

        $scope.team1 = "...";
        $scope.totalRun1 = 0;
        $scope.totalWicket1 = 0;
        $scope.totalOver1 = 0;
        $scope.totalBalls1 = 0;

        $scope.team2 = "...";
        $scope.totalRun2 = 0;
        $scope.totalWicket2 = 0;
        $scope.totalOver2 = 0;
        $scope.totalBalls2 = 0;

        $scope.showResult = false;


        var promise;
        $scope.startTimer = function () {
            $scope.timerIndex = 0;
            $scope.showResult = false;
            $scope.stopTimer();

            // store the interval promise
            promise = $interval(function () {
                $scope.timerIndex++;
                if ($scope.matchData.length) {
                    updateScore();
                    if ($scope.timerIndex === $scope.matchData.length - 1) {
                        $scope.stopTimer();
                        $scope.showResult = true;
                    }
                }
            }, 1000);
        };

        // stops the interval
        $scope.stopTimer = function () {
            $interval.cancel(promise);
        };

        // interval destroyed.
        $scope.$on('$destroy', function () {
            $scope.stop();
        });


        loadMatches();
        function loadMatches() {
            dataService.getMatches($scope.selectedSeason).then(function (data) {
                console.log("data", data);
                if (data.data) {
                    $scope.data = data.data;
                } else {
                    $scope.data = {};
                }
            }, function (err) {
                $scope.data = {};
                console.log("service failed", err);
            });
        }


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


        $scope.getLogo = function (team) {
            switch (team) {
                case "Kolkata Knight Riders": return "/images/kolkata.jpg";
                case "Royal Challengers Bangalore": return "/images/bangalore.jpg";
                case "Mumbai Indians": return "/images/mumbai.png";
                case "Rising Pune Supergiants": return "/images/pune.png";
                case "Kings XI Punjab": return "/images/punjab.jpg";
                case "Chennai Super Kings": return "/images/chennai.png";
                case "Delhi Daredevils": return "/images/delhi.jpg";
                case "Rajasthan Royals": return "/images/rajasthan.png";
                case "Deccan Chargers": return "/images/deccan.png";
                case "Kochi Tuskers Kerala": return "/images/kochi.png";
                case "Pune Warriors": return "/images/punew.jpg";
                case "Sunrisers Hyderabad": return "/images/hyb.jpg";
                case "Gujarat Lions": return "/images/gujrat.png";
                default: console.log("image not found", team)
            }
        }

        $scope.getTeamShortName = function (team) {
            if ($scope.matchData.length && $scope.matchData.length > $scope.timerIndex) {
                $scope.matchData[$scope.timerIndex].batting_team;
                switch (team) {
                    case "Kolkata Knight Riders": return "KKR";
                    case "Royal Challengers Bangalore": return "RCB";
                    case "Mumbai Indians": return "MI";
                    case "Rising Pune Supergiants": return "RPS";
                    case "Kings XI Punjab": return "KXP";
                    case "Chennai Super Kings": return "CSK";
                    case "Delhi Daredevils": return "DD";
                    case "Rajasthan Royals": return "RR";
                    case "Deccan Chargers": return "DC";
                    case "Kochi Tuskers Kerala": return "KTK";
                    case "Pune Warriors": return "PW";
                    case "Sunrisers Hyderabad": return "SH";
                    case "Gujarat Lions": return "GL";

                    default: console.log("image not found", team)
                }
            } else {
                return "...";
            }
        }

        /* Update the score as per data */
        function updateScore() {
            var total1 = 0, wickets1 = 0, over1 = 0, balls1 = 0;
            var total2 = 0, wickets2 = 0, over2 = 0, balls2 = 0;
            if ($scope.matchData.length) {
                for (var i = 0; i < $scope.timerIndex; i++) {

                    if ($scope.matchData[i].inning === 1) {
                        total1 += $scope.matchData[i].total_runs;
                        if ($scope.matchData[i].player_dismissed) {
                            wickets1++;
                        }
                        if (!$scope.matchData[i].noball_runs && !$scope.matchData[i].wide_runs) {
                            balls1++;
                        }
                        if (balls1 === 6) {
                            balls1 = 0;
                            over1 = $scope.matchData[i].over;
                        } else {
                            over1 = $scope.matchData[i].over - 1;
                        }
                    } else {
                        total2 += $scope.matchData[i].total_runs;
                        if ($scope.matchData[i].player_dismissed) {
                            wickets2++;
                        }
                        if (!$scope.matchData[i].noball_runs && !$scope.matchData[i].wide_runs) {
                            balls2++;
                        }
                        if (balls2 === 6) {
                            balls2 = 0;
                            over2 = $scope.matchData[i].over;
                        } else {
                            over2 = $scope.matchData[i].over - 1;
                        }
                    }
                    if ($scope.matchData[$scope.timerIndex - 1].inning === 1) {
                        $scope.team1 = $scope.matchData[$scope.timerIndex - 1].batting_team;
                        $scope.team2 = $scope.matchData[$scope.timerIndex - 1].bowling_team;
                    } else {
                        $scope.team1 = $scope.matchData[$scope.timerIndex - 1].bowling_team;
                        $scope.team2 = $scope.matchData[$scope.timerIndex - 1].batting_team;
                    }



                    $scope.totalRun1 = total1;
                    $scope.totalWicket1 = wickets1;
                    $scope.totalBalls1 = balls1;
                    $scope.totalOver1 = over1;

                    $scope.totalRun2 = total2;
                    $scope.totalWicket2 = wickets2;
                    $scope.totalBalls2 = balls2;
                    $scope.totalOver2 = over2;
                }
            } else {
                return "...";
            }
        }

    }]);