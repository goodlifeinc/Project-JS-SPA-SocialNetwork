app.controller('UsersController', function($scope, $location, usersService) {
    var isLocationPathHome = $location.path() == "/";
    if(usersService.isLoggedIn() && isLocationPathHome) {
        $location.path('/user/home');
    }

    var ClearData = function () {
        $scope.loginData = "";
        $scope.registerData = "";
        $scope.userData = "";
        $scope.passwordData = "";
    };

    // Tested and working
    $scope.register = function () {
        usersService.Register($scope.registerData,
            function (serverData) {
                Noty.success('Successfully registered!', 'topCenter');
                usersService.SetCredentials(serverData);
                ClearData();
                $location.path('/user/home');
            },
            function (serverError) {
                //notifyService.showError("Unsuccessful Register!", serverError)
                Noty.error('Unsuccessful register! <br/>' + serverError.message, 'bottomCenter');
                console.log(serverError)
            });
    };

    // Tested and working
    $scope.login = function () {
        usersService.Login($scope.loginData,
            function (serverData) {
                Noty.success('Successfully logged in!', 'topCenter');
                usersService.SetCredentials(serverData);
                ClearData();
                $location.path('/user/home');
            },
            function (serverError) {
                //notifyService.showError("Unsuccessful Register!", serverError)
                Noty.error('Unsuccessful login! <br/>' + serverError.error_description, 'bottomCenter');
                console.log(serverError)
            });
    };

});