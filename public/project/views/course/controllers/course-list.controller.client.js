/**
 * Created by Ethan on 4/21/2017.
 */

(function(){
    angular
        .module("ClassScheduler")
        .controller("CourseListController", CourseListController);

    function CourseListController($routeParams, CourseService, UserService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.enroll = enroll;
        vm.teach = teach;
        vm.quit = quit;
        vm.cancl = cancl;

        function init() {
            UserService
                .findUserById(vm.userId)
                .success(function (user) {
                    vm.user = user;
                })
                .error(function (err) {
                    vm.error = err;
                });

            CourseService
                .findCoursesByUser(vm.userId)
                .success(function (courses) {
                    vm.courses = courses;
                })
                .error(function (err) {
                    vm.error = err;
                });

            vm.create = vm.user.role == "Admin" || vm.user.role == "Professor";

            for (var c in vm.courses) {
                vm.courses[c].participation = "";
                vm.courses[c].modify = (vm.user.role == "Admin" || (vm.user.role == "Professor" && vm.user._id == vm.courses[c]._professor));
                if (vm.user.role == "Professor") {
                    if (vm.courses[c].modify) {
                        vm.courses[c].participation = "CANCEL";
                    } else if (vm.courses[c]._professor == null) {
                        vm.courses[c].participation = "TEACH";
                    }
                } else if (vm.user.role == "Student") {
                    vm.courses[c].participation = "TAKE";

                    for (var cs in vm.user.courses) {
                        if (vm.courses[c]._id == vm.user.courses[cs]._id) {
                            vm.courses[c].participation = "DROP";
                            break;
                        }
                    }
                }
            }
        }
        init();

        function enroll(userId, courseId) {
            CourseService
                .addStudentToCourse(userId, courseId)
                .success(function () {

                })
                .error(function(err) {
                    vm.error = err;
                })
        }

        function teach(userId, courseId) {
            CourseService
                .addProfToCourse(userId, courseId)
                .success(function () {

                })
                .error(function(err) {
                    vm.error = err;
                })
        }

        function quit(userId, courseId) {
            CourseService
                .removeStudentFromCourse(userId, courseId)
                .success(function () {

                })
                .error(function(err) {
                    vm.error = err;
                })
        }

        function cancl(userId, courseId) {
            CourseService
                .removeProfFromCourse(userId, courseId)
                .success(function () {

                })
                .error(function(err) {
                    vm.error = err;
                })
        }
    }
})();