app.controller('AuthenticationController', function($scope, authentication){
    var ClearData = function () {
        $scope.loginData = "";
        $scope.registerData = "";
        $scope.userData = "";
        $scope.passwordData = "";
    };

    $scope.register = function () {
        authentication.Register($scope.registerData,
            function(serverData) {
                //notifyService.showInfo("Successful Register!");
                console.log("Successfully registered!");
                //authentication.SetCredentials(serverData);
                //ClearData();
                //$location.path('/user/home');
            },
            function (serverError) {
                //notifyService.showError("Unsuccessful Register!", serverError)
                console.log(serverError)
            });
    };
});