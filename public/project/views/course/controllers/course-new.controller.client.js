/**
 * Created by Ethan on 4/21/2017.
 */

(function(){
    angular
        .module("ClassScheduler")
        .controller("NewCourseController", NewCourseController);

    function NewCourseController($routeParams, $location, CourseService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.teach = teach;
        vm.cancl = cancl;
        vm.createCourse = createCourse;

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
                }
            }
        }
        init();

        function teach(userId, courseId) {
            CourseService
                .addProfToCourse(userId, courseId)
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

        function createCourse (course) {
            if (vm.user.role == "Admin") {
                course._professor = null;
            } else {
                course.professor = vm.user._id;
            }

            CourseService
                .createCourse(course._professor, course)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/course");
                })
                .error(function () {
                    vm.error = "Could not create course.";
                });
        }
    }
})();