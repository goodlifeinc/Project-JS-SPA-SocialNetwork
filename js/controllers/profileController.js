app.controller('ProfileController', function($scope, $location, $route, profileService, usersService) {

    $scope.username = usersService.GetUsername();
    $scope.profileImage = localStorage['profileImage'];
    $scope.isLogged = usersService.isLoggedIn();

    if (!usersService.isLoggedIn()) {
        $location.path('/login');
    }

    //currently unused
    var getUserData = function() {
        profileService.GetUserData(function(serverdata) {
                $scope.name = serverdata.name;
                localStorage['name'] = serverdata.name;
            },
            function(err){
                usersService.ClearCredentials();
                $location.path('/');
                console.log(err);
            })
    };

    if(!$scope.name){
        if(!localStorage['name']) {
            getUserData();
        }
        $scope.name = localStorage['name'];
    }

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
            usersService.ClearCredentials();
            $location.path('/');
            console.log(error);
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
                usersService.ClearCredentials();
                $location.path('/');
                console.log(error);
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
                usersService.ClearCredentials();
                $location.path('/');
                console.log(error);
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