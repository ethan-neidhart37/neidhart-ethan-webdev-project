/**
 * Created by Ethan on 4/21/2017.
 */

(function() {
    angular
        .module("ClassScheduler")
        .factory("CourseService", CourseService);
    function CourseService($http) {

        var api = {
            "createCourse"            : createCourse,
            "findAllCourses"          : findAllCourses,
            "findCoursesByUser"       : findCoursesByUser,
            "findCourseById"          : findCourseById,
            "updateCourse"            : updateCourse,
            "addStudentToCourse"      : addStudentToCourse,
            "addProfToCourse"         : addProfToCourse,
            "removeStudentFromCourse" : removeStudentFromCourse,
            "removeProfFromCourse"    : removeProfFromCourse,
            "deleteCourse"            : deleteCourse
        };
        return api;

        function createCourse(userId, course) {
            return $http.post("/api/user/" + userId + "/course", course);
        }

        function findAllCourses() {
            return $http.get("/api/course");
        }

        function findCoursesByUser(userId) {
            return $http.get("/api/user/" + userId + "/course");
        }

        function findCourseById(courseId) {
            return $http.get("/api/course/" + courseId);
        }

        function updateCourse(courseId, newCourse) {
            return $http.put("/api/course/" + courseId, newCourse);
        }

        function addStudentToCourse(userId, courseId) {
            return $http.put("/api/user/" + userId + "/course/" + courseId + "/student");
        }

        function addProfToCourse(userId, courseId) {
            return $http.put("/api/user/" + userId + "/course/" + courseId + "/prof");
        }

        function removeStudentFromCourse(userId, courseId) {
            return $http.put("/api/user/" + userId + "/course/" + courseId + "/student/remove");
        }

        function removeProfFromCourse(userId, courseId) {
            return $http.put("/api/user/" + userId + "/course/" + courseId + "/prof/remove");
        }

        function deleteCourse(courseId) {
            return $http.delete("/api/course/" + courseId);
        }
    }
})();