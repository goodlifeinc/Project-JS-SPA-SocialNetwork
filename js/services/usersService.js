'use strict';

app.factory('usersService', function ($http, baseServiceUrl, requester) {
    var service = {};

    var serviceUrl = baseServiceUrl + '/users';

    // Tested & Working
    service.Login = function (loginData, success, error) {
        $http.post(serviceUrl + '/login', loginData)
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    // Tested & Working
    service.Register = function (registerData, success, error) {
        $http.post(serviceUrl + '/register', registerData)
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    service.GetUserPreviewData = function (username, success, error) {
        $http.get(serviceUrl + '/' + username + '/preview', {headers: this.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    service.GetUserFullData = function (username, success, error) {
        $http.get(serviceUrl + '/' + username, {headers: this.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    service.SearchUserByName = function (searchTerm, success, error) {
        $http.get(serviceUrl + 'search?searchTerm=' + searchTerm, {headers: this.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    service.GetFriendsWallByPages = function(username, page, numPerPage, sucess, error) {
        var startPos = (page * numPerPage) - numPerPage,
            query = '/' + username + '/wall?StartPostId=' + '&PageSize=' + numPerPage;

        $http.get(serviceUrl + query, {headers: this.GetHeaders()})
            .success(function (data, status, headers, config){
                sucess(data)
            })
            .error(error)
    };

    service.GetFriendsDetailedFriendsList = function(username, success, error) {
        $http.get(serviceUrl + '/' + username + '/friends', {headers: this.GetHeaders()})
            .success(function (data, status, headers, config){
                success(data)
            })
            .error(error)
    };

    service.GetFreindsFriendsPreview = function(username, success, error) {
        $http.get(serviceUrl + '/' + username + '/friends/preview', {headers: this.GetHeaders()})
            .success(function (data, status, headers, config){
                success(data)
            })
            .error(error)
    };

    // Tested & Working
    service.SetCredentials = function (serverData) {
        localStorage['accessToken'] = serverData.access_token;
        localStorage['userName'] = serverData.userName;
    };

    service.GetUsername = function () {
        return localStorage['userName'];
    };

    service.ClearCredentials = function () {
        localStorage.clear();
    };

    service.GetHeaders = function() {
        return {
            Authorization: "Bearer " + localStorage['accessToken']
        };
    };

    service.isLoggedIn = function () {
        return localStorage['accessToken'];
    };

    return service;
});