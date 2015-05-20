var app = angular.module('SocialNetwork', ['ngRoute']);

app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api');

app.config(function($routeProvider) {

    $routeProvider
        .when('/123', {
            templateUrl: 'partials/home.html',
            controller: 'FirstController'
        })
        .when('/register', {
            templateUrl: 'partials/authentication/register.html',
            controller: 'AuthenticationController'
        });
    $routeProvider.otherwise({ redirectTo: '/' });
});