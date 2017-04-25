(function() {
    angular
        .module("ClassScheduler")
        .controller("ProjectLoginController", ProjectLoginController);

        function ProjectLoginController(ProjectUserService, $location) {
            var vm = this;
            vm.login = login;

            function login(user) {
                var promise = ProjectUserService.findUserByCredentials(user.username, user.password);
                promise
                    .success(function (foundUser) {
                        var loginUser = foundUser;
                        if (loginUser != null && loginUser.length) {
                            loginUser = loginUser[0];
                            $location.url('/user/' + loginUser._id);
                        } else {
                            vm.error = 'Unable to login';
                        }
                    })
                    .error(function (err) {
                        vm.error = err;
                    });
            }
        }
})();
