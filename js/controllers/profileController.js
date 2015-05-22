app.controller('ProfileController', function($scope, $location, $route, profileService, usersService) {

    if (!usersService.isLoggedIn()) {
        $location.path('/login');
    }

    var getUserData = function() {
        profileService.GetUserData(
            function(serverdata) {
                $scope.userData = serverdata;
            },
            function(err){
                console.log(err);
            }
        )
    };

    getUserData();

    $scope.logout = function () {
        usersService.ClearCredentials();
        //mainData.clearParams();
        $location.path('/');
    };

    $scope.logoutTODO = function () {
        profileService.Logout(
            function (response) {
                console.log(response);
                //notifyService.showInfo("Successful Logout!");
                ClearData();
                usersService.ClearCredentials();
                //mainData.clearParams();
                $location.path('/');
            },
            function (err) {
                console.log(err);
            });
    };

    $scope.loadNewsFeed = function() {
        profileService.GetNewsFeed(1, 10,
        function(data) {
            if (data.length) {
                $scope.newsFeedData = data;
            }
            else{console.log('nema')}
        },
        function(error) {
            error(error);
        })
    }


});