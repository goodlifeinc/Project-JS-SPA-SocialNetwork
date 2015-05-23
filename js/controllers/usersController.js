app.controller('UsersController', function($scope, $location, usersService) {

    console.log('hello from users controlelr')
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
                //notifyService.showInfo("Successful Register!");
                console.log("Successfully registered!");
                usersService.SetCredentials(serverData);
                ClearData();
                $location.path('/user/home');
            },
            function (serverError) {
                //notifyService.showError("Unsuccessful Register!", serverError)
                console.log(serverError)
            });
    };

    // Tested and working
    $scope.login = function () {
        usersService.Login($scope.loginData,
            function (serverData) {
                //notifyService.showInfo("Successful Register!");
                console.log("Successfully login!");
                usersService.SetCredentials(serverData);
                ClearData();
                $location.path('/user/home');
            },
            function (serverError) {
                //notifyService.showError("Unsuccessful Register!", serverError)
                console.log(serverError)
            });
    };
});