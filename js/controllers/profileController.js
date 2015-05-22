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
        },
        function(error) {
            error(error);
        })
    };

    $scope.loadOwnFriends = function () {
        profileService.GetOwnFriends(
            function(data){
                if (data.length) {
                    $scope.ownFriendsData = data;
                }
            },
            function(error) {
                error(error);
            }
        )
    };

    $scope.loadFriendRequests = function() {
        profileService.GetFriendRequests(
            function(data) {
                if (data.length) {
                    $scope.FriendRequestsData = data;
                }
            },
            function(error) {
                error(error);
            })
    };

    $scope.acceptFriendRequest = function(id) {
        profileService.ApproveFriendRequest(id,
            function(data){
                console.log(data);
            },
            function(err){
                console.log(err);
            })
    };

    $scope.rejectFriendRequest = function(id) {
        profileService.RejectFriendRequest(id,
            function(data){
                console.log(data);
            },
            function(err){
                console.log(err);
            })
    }


});