(function () {
    'use strict';

    angular
        .module('app')
        .factory('Dynamo', Dynamo);

    Dynamo.$inject = [];
    function Dynamo() {
        var free_users_table = 'admove-mobilehub-297572719-FreeUsers';
        var locations_table = 'admove-mobilehub-297572719-Locations';
        var dynamodb;

        var service = {};

        service.getFreeUsers = function (callback) {
            if (!dynamodb) {
                dynamodb = new AWS.DynamoDB();
            }
            callWithParams({TableName: free_users_table}, callback, 'scan');
        };

        service.getLocationsOfUser = function (userId, callback) {
            if (!dynamodb) {
                dynamodb = new AWS.DynamoDB();
            }
            var params = {
                TableName: locations_table,
                KeyConditionExpression: "userId = :uid",
                ExpressionAttributeValues: {
                    ":uid": {S: userId}
                }
            };
            callWithParams(params, callback);
        };

        service.getFilteredLocationsOfUser = function (userId, startDate, endDate, callback) {
            if (!dynamodb) {
                dynamodb = new AWS.DynamoDB();
            }
            var params = {
                TableName: locations_table,
                KeyConditionExpression: 'userId = :uid',
                FilterExpression: 'sessionId between :start and :end',
                ExpressionAttributeValues: {
                    ':uid': {S: userId},
                    ':start': {S: startDate},
                    ':end': {S: endDate}
                }
            };
            callWithParams(params, callback);
        };

        return service;

        function callWithParams(params, callback, fun) {
            dynamodb[fun || 'query'](params, function (e, data) {
                if (e) {
                    console.log(e);
                }
                callback(data);
            });
        }
    }
})();