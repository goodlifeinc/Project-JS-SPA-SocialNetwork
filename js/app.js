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
        });

    $routeProvider.otherwise({ redirectTo: '/' });
});