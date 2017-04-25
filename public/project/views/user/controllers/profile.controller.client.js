/**
 * Created by Ethan on 2/15/2017.
 */

(function(){
    angular
        .module("ClassScheduler")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, $location, UserService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.unregisterUser = unregisterUser;

        function init() {
            UserService
                .findUserById(vm.userId)
                .success(function(user) {
                    vm.user = user;
                })
        }
        init();

        vm.update = function (newUser) {
            UserService
                .updateUser(vm.userId, newUser)
                .success(function () {
                    vm.message = "User successfully updated."
                })
                .error(function () {
                    vm.error = "Unable to update user.";
                });
        };

        function unregisterUser(user) {
            var answer = confirm("Are you sure?");

            if (answer) {
                for (var c in user.classes) {
                    var courseId = user.classes[c];
                    CourseService
                        .removeStudentFromCourse(user._id, courseId)
                        .success(function() {

                        })
                        .error(function(err) {
                            vm.error = err;
                        });
                }

                UserService
                    .deleteUser(user._id)
                    .success(function () {
                        $location.url("/login");
                    })
                    .error(function () {
                        vm.error = "Unable to remove user.";
                    });
            }
        }
    }
})();
