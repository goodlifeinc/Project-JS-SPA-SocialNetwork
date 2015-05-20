var app = angular.module('SocialNetwork', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/news', {
                templateUrl: 'templates/news.html',
                controller: 'NewsController'
            })
            .when('/', {
                templateUrl: 'partials/home.html',
                controller: 'FirstController'
            })
        $routeProvider.otherwise({ redirectTo: '/' });
    });