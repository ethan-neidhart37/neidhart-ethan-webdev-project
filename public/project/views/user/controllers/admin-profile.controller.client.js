/**
 * Created by Ethan on 4/21/2017.
 */

(function(){
    angular
        .module("ClassScheduler")
        .controller("AdminProfileController", ProfileController);

    function ProfileController($routeParams, $location, UserService, CourseService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.userId2 = $routeParams['u2id'];
        vm.unregisterUser = unregisterUser;

        function init() {
            UserService
                .findUserById(vm.userId2)
                .success(function(user) {
                    vm.user = user;
                })
        }
        init();

        vm.update = function (newUser) {
            UserService
                .updateUser(vm.userId2, newUser)
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
                        $location.url("/user/" + vm.userId + "/user2");
                    })
                    .error(function () {
                        vm.error = "Unable to remove user.";
                    });
            }
        }
    }
})();