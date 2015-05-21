'use strict';

app.factory('authentication', function ($http, baseServiceUrl, requester) {
    var service = {};

    var serviceUrl = baseServiceUrl + '/users';

    // Tested & Working
    service.Login = function (loginData, success, error) {
        $http.post(serviceUrl + '/Login', loginData)
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    // Tested & Working
    service.Register = function (registerData, success, error) {
        $http.post(serviceUrl + '/Register', registerData)
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    service.GetUserProfile = function (success, error) {
        $http.get(serviceUrl + '/profile', {headers: this.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data)
            }).error(error);
    };

    service.EditUserProfile = function (editUserData, success, error) {
        $http.put(serviceUrl + '/profile', editUserData, {headers: this.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data)
            }).error(error);
    };

    service.ChangePassword = function (passwordData, success, error) {
        $http.put(serviceUrl + '/ChangePassword', passwordData, {headers: this.GetHeaders()})
            .success(function (data, status, headers, config) {
                success()
            }).error(error);
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