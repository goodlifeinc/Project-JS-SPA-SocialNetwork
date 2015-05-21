var app = angular.module('SocialNetwork', ['ngRoute']);

app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api');

app.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'partials/authentication/login.html',
            controller: 'AuthenticationController'
        })
        .when('/register', {
            templateUrl: 'partials/authentication/register.html',
            controller: 'AuthenticationController'
        })
        .when('/login', {
            templateUrl: 'partials/authentication/login.html',
            controller: 'AuthenticationController'
        });

    $routeProvider.otherwise({ redirectTo: '/' });
});