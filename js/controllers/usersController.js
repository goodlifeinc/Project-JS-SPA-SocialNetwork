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
        var errMsg = false;
        if(!$scope.registerData.gender) {
            errMsg = "Please select a gender!";
        }
        if(!$scope.registerData.email) {
            errMsg = "Please enter a valid email adress!";
        }
        if(!$scope.registerData.name) {
            errMsg = "Please enter a valid name!";
        }
        if(!$scope.registerData.password || !$scope.registerData.confirmPassword) {
            errMsg = "Please enter pass and confrim pass!";
        }
        if($scope.registerData.password != $scope.registerData.confirmPassword) {
            errMsg = "Passwords doesnt match!";
        }
        if(!$scope.registerData.username || $scope.registerData.username.length < 6) {
            errMsg = "Please enter a username that is atleast 6 chars long!";
        }
        usersService.Register($scope.registerData,
            function (serverData) {
                Noty.success('Successfully registered!', 'topCenter');
                usersService.SetCredentials(serverData);
                ClearData();
                $location.path('/user/home');
            },
            function (serverError) {
                //notifyService.showError("Unsuccessful Register!", serverError)
                if(!errMsg) {
                    errMsg = serverError.message;
                }
                Noty.error('Unsuccessful register! <br/>' + errMsg, 'bottomCenter');
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