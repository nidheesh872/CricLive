'use strict';

// Declare app level module which depends on views, and components
var iplApp = angular.module('iplApp', ['ngRoute',  'iplControllers', 'iplServies']);

var iplControllers = angular.module('iplControllers', []);
var iplServies = angular.module('iplServies', []);

iplApp.config(['$routeProvider', '$locationProvider', '$httpProvider',
		function ($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'views/home.html',
            controller: 'MatchCtrl'
        }).when('/livescore/:id', {
            templateUrl: 'views/livescore.html',
            controller: 'ScoreCtrl'
        }).otherwise({
             templateUrl: '404.html',
        });
		}]);
