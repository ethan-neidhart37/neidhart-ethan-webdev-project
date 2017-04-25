/**
 * Created by Ethan on 4/21/2017.
 */

(function(){
    angular
        .module("ClassScheduler")
        .controller("EditCourseController", EditCourseController);

    function EditCourseController($routeParams, $location, CourseService, UserService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.courseId = $routeParams.cid;
        vm.teach = teach;
        vm.cancl = cancl;
        vm.deleteCourse = deleteCourse;
        vm.updateCourse = updateCourse;

        function init() {
            CourseService
                .findCoursesByUser(vm.userId)
                .success(function (courses) {
                    vm.courses = courses;
                })
                .error(function (err) {
                    vm.error = err;
                });
            CourseService
                .findCourseById(vm.courseId)
                .success(function (course) {
                    vm.course = course;
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

        function updateCourse(course) {
            CourseService
                .updateCourse(vm.courseId, course)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/course");
                })
                .error(function () {
                    vm.error = "Could not update course.";
                });
        }

        function deleteCourse () {
            for (var s in vm.course.students) {
                var studentId = vm.course.students[s];
                UserService
                    .removeCourseFromUser(studentId, vm.courseId)
                    .success(function() {

                    })
                    .error(function (err) {
                        vm.error = err;
                    });
            }
            if (vm.course._professor != null) {
                UserService
                    .removeCourseFromUser(vm.course._professor, vm.courseId)
                    .success(function() {

                    })
                    .error(function (err) {
                        vm.error = err;
                    })
            }

            CourseService
                .deleteCourse(vm.courseId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/course");
                })
                .error(function () {
                    vm.error = "Could not delete course.";
                });
        }
    }
})();