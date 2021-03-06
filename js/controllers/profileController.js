app.controller('ProfileController', function($scope, $location, $routeParams, $route, profileService, usersService, postsService) {

    $scope.username = usersService.GetUsername();
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
                $scope.profileImageData = serverdata.profileImageData;
                localStorage['name'] = serverdata.name;
                localStorage['email'] = serverdata.email;
                localStorage['gender'] = serverdata.gender;
                localStorage['profileImageData'] = serverdata.profileImageData;
            },
            function(err){
                usersService.ClearCredentials();
                $location.path('/');
                console.log(err);
            })
    };

    if(!$scope.name || !$scope.email || !$scope.gender || !$scope.profileImageData){
        if(!localStorage['name'] || !localStorage['email'] || !localStorage['gender'] || !localStorage['profileImageData']) {
            getUserData();
        }
        $scope.name = localStorage['name'];
        $scope.email = localStorage['email'];
        $scope.gender = localStorage['gender'];
        $scope.profileImageData = localStorage['profileImageData'];
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

    $scope.loadOwnFriendsPreview = function () {
        profileService.GetOwnFriendsPreview(
            function(data){
                $scope.ownFriendsData = data;
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

    $scope.sendFriendRequest = function() {
        profileService.SendFriendRequest($routeParams.id,
            function(data){
                Noty.success('Friend request send!', 'topCenter');
                $route.reload();
            },
            function(err){
                console.log(err);
            })
    };

    $scope.acceptFriendRequest = function(id) {
        profileService.ApproveFriendRequest(id,
            function(data){
                Noty.success('Friendship accepted!', 'topCenter');
                $route.reload();
            },
            function(err){
                console.log(err);
            })
    };

    $scope.rejectFriendRequest = function(id) {
        profileService.RejectFriendRequest(id,
            function(data){
                Noty.success('Friendship rejected!', 'topCenter');
                $route.reload();
            },
            function(err){
                console.log(err);
            })
    };

    $scope.getUserData = function() {

    };

    $scope.editProfile = function(editData) {
        if($scope.editProfileImage) {
            editData.profileImageData = $scope.editProfileImage;
        }
        else {
            editData.profileImageData = $scope.profileImageData;
        }
        if(!editData.name) {
            editData.name = $scope.name;
        }
        else {
            localStorage['name'] = editData.name;
            $scope.name = editData.name;
        }
        if(!editData.email) {
            editData.email = $scope.email;
        }
        else {
            localStorage['email'] = editData.email;
            $scope.email = editData.name;
        }
        localStorage['gender'] = editData.gender;

        profileService.EditUserProfile(editData,
        function(data) {
            if($scope.editProfileImage) {
                $scope.profileImageData = $scope.editProfileImage;
                localStorage['profileImageData'] = $scope.editProfileImage;
            }
            Noty.success('Profile successfully edited!', 'topCenter');
            $location.path('/user/home');
        },
        function(error) {
            Noty.error(error.message, 'bottomCenter');
        })
    };

    $scope.changePassword = function(passwordData) {
        var errMsg = false;
        if (passwordData.newPassword != passwordData.confirmPassword) {
            errMsg = 'New password and confirm pass doesnt match!';
        }
        if(passwordData.newPassword.length < 6) {
            errMsg = 'New password must be atleast 6 characters long!';
        }
        profileService.ChangePassword(passwordData,
        function(data) {
            Noty.success('Password successfully changed!', 'topCenter');
            $location.path('/user/home');
        },
        function(error) {
            console.log(error);
            if(!errMsg) {
                errMsg = 'Please re-enter old password!';
            }
            Noty.error('Pass not changed <br />' + errMsg, 'bottomCenter');
        })
    };

    $scope.editData = {gender: $scope.gender};

    $scope.imageUpload = function(element){
        var reader = new FileReader();
        reader.onload = $scope.imageIsLoaded;
        reader.readAsDataURL(element.files[0]);
    };

    $scope.imageIsLoaded = function(e){
        $scope.$apply(function() {
            $scope.editProfileImage = e.target.result;
        });
    };

    $scope.loadWallOwnerData = function() {
        usersService.GetUserFullData($routeParams.id,
        function(data){
            var isWallOwner = false;
            if(data.username === $scope.username) {
                isWallOwner = true;
            }
            $scope.wallOwnerData = data;
            $scope.wallOwnerData.isWallOwner = isWallOwner;
        },
        function(err){
            $location.path('/user/home');
            console.log(err);
        })
    };

    $scope.loadUserWallData = function() {
        usersService.GetFriendsWallByPages($routeParams.id, 0, 10,
        function (data) {
            if(data.length) {
                $scope.userWallData = data;
            }
        },
        function (error) {
            $location.path('/user/home');
            console.log(error);
        })
    };

    $scope.loadFriendsFriendList = function () {
        usersService.GetFreindsFriendsPreview($routeParams.id,
            function(data){
                $scope.friendsFriendListData = data;
            },
            function(error) {
                usersService.ClearCredentials();
                $location.path('/');
                console.log(error);
            }
        )
    };

    $scope.likePost = function($event) {
        var postId = $($event.target).parent().parent().parent().data('id');
        postsService.LikePost(postId,
        function(data){
            Noty.success('Post successfully liked!', 'topCenter');
            $route.reload();
        },
        function(error){
            console.log(error);
        })
    };

    $scope.unlikePost = function($event) {
        var postId = $($event.target).parent().parent().parent().data('id');
        postsService.UnlikePost(postId,
            function(data){
                Noty.success('Post successfully unliked!', 'topCenter');
                $route.reload();
            },
            function(error){
                console.log(error);
            })
    };

    $scope.addPost = function(postData) {
        if(postData) {
            postData.username = $routeParams.id;
        }
        postsService.AddNewPost(postData,
        function(data){
            Noty.success('New post successfully added!', 'topCenter');
            $route.reload();
        },
        function(error){
            Noty.error('New post not added! Please enter post text.', 'bottomCenter');
            console.log(error);
        })
    };

    $scope.loadOwnFriends = function () {
        var userId = $routeParams.id;

        $scope.userWatch = {};

        usersService.GetUserPreviewData(userId,
            function(data){
                $scope.userWatch.personal = data;
            },
            function(error){
                console.log(error);
            });

        if(userId != $scope.username) {
            usersService.GetFriendsDetailedFriendsList(userId,
                function(data){
                    $scope.userWatch.friends = data;
                    $scope.userWatch.friends.totalFriendsCount = data.length;
                },
                function(error) {
                    $location.path('/');
                    console.log(error);
                }
            )
        }
        else {
            profileService.GetOwnFriends(
                function(data){
                    $scope.userWatch.friends = data;
                    $scope.userWatch.friends.totalFriendsCount = data.length;
                },
                function(error) {
                    $location.path('/');
                    console.log(error);
                }
            )
        }
    };
});