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
        vm.courseId = $routeParams.cid;
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
                .findCourseById(vm.courseId)
                .success(function (course) {
                    vm.courses = course;
                })
                .error(function (err) {
                    vm.error = err;
                });

            vm.create = vm.user.role == "Admin" || vm.user.role == "Professor";

            vm.participation = "";
            vm.modify = (vm.user.role == "Admin" || (vm.user.role == "Professor" && vm.user._id == vm.course._professor));
            if (vm.user.role == "Professor") {
                if (vm.modify) {
                    vm.participation = "CANCEL";
                } else if (vm.course._professor == null) {
                    vm.participation = "TEACH";
                }
            } else if (vm.user.role == "Student") {
                vm.participation = "TAKE";

                for (var cs in vm.user.courses) {
                    if (vm.course._id == vm.user.courses[cs]._id) {
                        vm.participation = "DROP";
                        break;
                    }
                }
            }
        }
        init();

        function enroll() {
            CourseService
                .addStudentToCourse(vm.userId, vm.courseId)
                .success(function () {

                })
                .error(function(err) {
                    vm.error = err;
                })
        }

        function teach() {
            CourseService
                .addProfToCourse(vm.userId, vm.courseId)
                .success(function () {

                })
                .error(function(err) {
                    vm.error = err;
                })
        }

        function quit() {
            CourseService
                .removeStudentFromCourse(vm.userId, vm.courseId)
                .success(function () {

                })
                .error(function(err) {
                    vm.error = err;
                })
        }

        function cancl() {
            CourseService
                .removeProfFromCourse(vm.userId, vm.courseId)
                .success(function () {

                })
                .error(function(err) {
                    vm.error = err;
                })
        }
    }
})();