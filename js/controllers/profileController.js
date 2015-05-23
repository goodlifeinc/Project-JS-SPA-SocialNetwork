app.controller('ProfileController', function($scope, $location, $routeParams, profileService, usersService) {

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
                $scope.email = serverdata.email;
                $scope.gender = serverdata.gender;
                localStorage['name'] = serverdata.name;
                localStorage['email'] = serverdata.email;
                localStorage['gender'] = serverdata.gender;
            },
            function(err){
                usersService.ClearCredentials();
                $location.path('/');
                console.log(err);
            })
    };

    if(!$scope.name || !$scope.email || !$scope.gender){
        if(!localStorage['name'] || !localStorage['email'] || !localStorage['gender']) {
            getUserData();
        }
        $scope.name = localStorage['name'];
        $scope.email = localStorage['email'];
        $scope.gender = localStorage['gender'];
    }

    $scope.logout = function () {
        Noty.success('Successfully logged out', 'topCenter');
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
        profileService.GetNewsFeed(0, 10,
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
                    console.log(data);
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
    };

    $scope.getUserData = function() {

    };

    $scope.editProfile = function(profileData) {
        console.log(profileData);
    };

    $scope.editData = {gender: $scope.gender};

    $scope.loadWallOwnerData = function() {
        usersService.GetUserFullData($routeParams.id,
        function(data){
            console.log(data)
        },
        function(err){
            console.log(err);
        })
    }
});