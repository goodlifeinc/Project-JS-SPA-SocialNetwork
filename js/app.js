var app = angular.module('SocialNetwork', ['ngRoute', 'ui.bootstrap']);

app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api');

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/authentication/login.html',
            controller: 'UsersController'
        })
        .when('/register', {
            templateUrl: 'partials/authentication/register.html',
            controller: 'UsersController'
        })
        .when('/login', {
            templateUrl: 'partials/authentication/login.html',
            controller: 'UsersController'
        })
        .when('/user/home', {
            templateUrl: 'partials/userHomePage.html',
            controller: 'ProfileController'
        })
        .when('/user/edit', {
            templateUrl: 'partials/editProfile.html',
            controller: 'ProfileController'
        })
        .when('/user/changepass', {
            templateUrl: 'partials/changePassword.html',
            controller: 'ProfileController'
        });

    $routeProvider.otherwise({ redirectTo: '/' });
});