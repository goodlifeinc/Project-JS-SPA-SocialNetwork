'use strict';

app.factory('commentsService', function ($http, baseServiceUrl, usersService) {
    var service = {};

    var serviceUrl = baseServiceUrl + '/posts';

    service.GetPostComments = function (postId, success, error) {
        $http.get(serviceUrl + '/' + postId + '/comments', {headers: usersService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    service.AddCommentToPost = function (postId, commentData, success, error) {
        $http.post(serviceUrl + '/' + postId + '/comments', commentData, {headers: usersService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

        service.EditPostComment = function (postId, commentId, commentData, success, error) {
        $http.put(serviceUrl + '/' + postId + '/comments/' + commentId, commentData, {headers: usersService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    service.DeletePostComment = function (postId, commentId, success, error) {
        $http.delete(serviceUrl + '/' + postId + '/comments/' + commentId, {headers: usersService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    service.GetCommentDetailedLikes = function (postId, commentId, success, error) {
        $http.get(serviceUrl + '/' + postId + '/comments/' + commentId + '/likes', {headers: usersService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    service.GetCommentPreviewLikes = function (postId, commentId, success, error) {
        $http.get(serviceUrl + '/' + postId + '/comments/' + commentId + '/likes/preview', {headers: usersService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    service.LikeComment = function (postId, commentId, success, error) {
        $http.post(serviceUrl + '/' + postId + '/comments/' + commentId + '/likes', {headers: usersService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    service.UnlikeComment = function (postId, commentId, success, error) {
        $http.delete(serviceUrl + '/' + postId + '/comments/' + commentId + '/likes', {headers: usersService.GetHeaders()})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    return service;
});