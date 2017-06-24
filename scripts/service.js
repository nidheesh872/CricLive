'use strict';

iplServies.service("dataService", ['$http', '$q', '$rootScope', '$filter', function ($http, $q, $rootScope, $filter) {

    var restAPIUrl = "";
    var authorization = ""
    var matches = [];
    var matchData = [];
    var selectedMatch = {};
    var selectedMatchData = [];

    var httpGet = function (deferred, url, options) {
        $http.get(url, options)
            .then(function (response) {
                 matches = response.data;
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });
    }

  

    this.getData = function (callBack) {
     //   var deferred = $q.defer();

        function doStuff(data) {
            if (data) {
                matchData = data;
                console.log(data);
                return deferred.promise;
            } else {
                return deferred.reject;
            }
        }

        

        parseData("sampledata/deliveries.csv", callBack);
     //   return deferred.promise;
    }
    function parseData(url,   callBack) {
            Papa.parse(url, {
                header: true,
                dynamicTyping: true,
                download: true,
                dynamicTyping: true,
                complete: function (results) {
                     matchData = results.data;
                    callBack(results.data);
                    
                },error : function(response){
                    console.log("eorr")
                }
            });
        }


    this.getMatches = function (language, stars, page) {
        var deferred = $q.defer();
        httpGet(deferred, 'sampledata/matches.json');
        return deferred.promise;
    }


    this.getMatchData = function (id) {
        console.log("getMatchData", id);
        return $filter('filter')(matches, { id : Number(id) }, true);
                 
                    
    }
    this.getFullMatchData = function (id) {
        console.log("getFullMatchData", id);
        return $filter('filter')(matchData, { match_id :  Number(id) }, true);
                 
                    
    }


}]);