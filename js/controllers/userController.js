app.controller('UserController', function($scope, $location, $route, authentication, userService) {
    if (!authentication.isLoggedIn()) {
        $location.path('/login');
    }

    var getUserData = function() {
        userService.GetUserData(
            function(serverdata){
                $scope.userData = serverdata;
                console.log(serverdata);
            },
            function(serverError) {
                console.log(serverError)
            });
    };

    getUserData();

    // Tested and working
    $scope.register = function () {
        authentication.Register($scope.registerData,
            function (serverData) {
                //notifyService.showInfo("Successful Register!");
                console.log("Successfully registered!");
                authentication.SetCredentials(serverData);
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
        authentication.Login($scope.loginData,
            function (serverData) {
                //notifyService.showInfo("Successful Register!");
                console.log("Successfully login!");
                authentication.SetCredentials(serverData);
                ClearData();
                $location.path('/user/home');
            },
            function (serverError) {
                //notifyService.showError("Unsuccessful Register!", serverError)
                console.log(serverError)
            });
    };

    $scope.logout = function () {
        //notifyService.showInfo("Successful Logout!");
        //ClearData();
        authentication.ClearCredentials();
        //mainData.clearParams();
        $location.path('/');
    };

});