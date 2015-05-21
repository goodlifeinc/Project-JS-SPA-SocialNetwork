'use strict';

app.factory('postService', function ($http, baseServiceUrl, usersService) {
    var service = {};

    var serviceUrl = baseServiceUrl + '/Posts';

    service.GetPostById = function (id, success, error) {
        $http.get(serviceUrl + '/' + id, {headers: usersService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    service.AddNewPost = function (addPostData, success, error) {
        $http.post(serviceUrl, addPostData, {headers: usersService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    service.EditPostById = function (id, editPostData, success, error) {
        $http.put(serviceUrl + '/' + id, editPostData, {headers: usersService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    service.DeletePostById = function (id, success, error) {
        $http.delete(serviceUrl + '/' + id, {headers: usersService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    service.GetPostDetailedLikes = function (id, success, error) {
        $http.get(serviceUrl + '/' + id + '/likes', {headers: usersService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    service.GetPostPreviewLikes = function (id, success, error) {
        $http.get(serviceUrl + '/' + id + '/likes/preview', {headers: usersService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    service.LikePost = function (id, success, error) {
        $http.post(serviceUrl + '/' + id + '/likes', {headers: usersService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    service.UnlikePost = function (id, success, error) {
        $http.delete(serviceUrl + '/' + id + '/likes', {headers: usersService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    return service;
});