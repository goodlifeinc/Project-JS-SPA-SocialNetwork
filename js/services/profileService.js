'use strict';

app.factory('profileService', function ($http, baseServiceUrl, requester, usersService) {
    var service = {};

    var serviceUrl = baseServiceUrl + '/me';

    service.Logout = function (success, error) {
        console.log(usersService.GetHeaders());
        $http.post(baseServiceUrl + '/users' + '/logout', {headers: usersService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    }

    service.GetUserData = function (success, error) {
       $http.get(serviceUrl , {headers: usersService.GetHeaders()})
            .success(
                function (data, status, headers, config) {
                    success(data)
                }).error(error);
    };

    service.EditUserProfile = function (editUserData, success, error) {
        $http.put(serviceUrl + '/me', editUserData, {headers: usersService.GetHeaders()})
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

    service.GetOwnFriends = function(success, error) {
        $http.get(serviceUrl + '/friends', {headers: usersService.GetHeaders()})
            .success(function (data, status, headers, config){
                success(data)
            })
            .error(error)
    };

    service.GetNewsFeed = function(page, numPerPage, sucess, error) {
        var startPos = (page * numPerPage) - numPerPage,
            query = '/feed?StartPostId=' + startPos + '&PageSize=' + numPerPage;

        $http.get(serviceUrl + query, {headers: usersService.GetHeaders()})
            .success(function (data, status, headers, config){
                sucess(data)
            })
            .error(error)

    };

    service.GetFriendRequests = function(sucess, error) {
        $http.get(serviceUrl + '/requests', {headers: usersService.GetHeaders()})
            .success(function (data, status, headers, config){
                sucess(data)
            })
            .error(error)

    };

    service.ApproveFriendRequest = function(id, sucess, error) {
        $http.put(serviceUrl + '/requests/' + id + '?status=approved', {}, {headers: usersService.GetHeaders()})
            .success(function (data, status, headers, config){
                sucess(data)
            })
            .error(error)

    };

    service.RejectFriendRequest = function(id, sucess, error) {
        $http.put(serviceUrl + '/requests/' + id + '?status=rejected', {}, {headers: usersService.GetHeaders()})
            .success(function (data, status, headers, config){
                sucess(data)
            })
            .error(error)

    };

    service.SendFriendRequest = function(username, sucess, error) {
        $http.post(serviceUrl + '/requests/' + username, {headers: usersService.GetHeaders()})
            .success(function (data, status, headers, config){
                sucess(data)
            })
            .error(error)

    };

    return service;
});