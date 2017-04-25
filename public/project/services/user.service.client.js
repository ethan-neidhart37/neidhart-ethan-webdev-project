/**
 * Created by Ethan on 4/21/2017.
 */

(function () {
    angular
        .module("ClassScheduler")
        .factory("ProjectUserService", ProjectUserService);

    function ProjectUserService($http) {

        var api = {
            "createUser"            : createUser,
            "findAllUsers"          : findAllUsers,
            "findUserById"          : findUserById,
            "findUserByUsername"    : findUserByUsername,
            "findUserByCredentials" : findUserByCredentials,
            "updateUser"            : updateUser,
            "addCourseToUser"       : addCourseToUser,
            "removeCourseFromUser"  : removeCourseFromUser,
            "deleteUser"            : deleteUser
        };
        return api;

        function createUser(user) {
            return $http.post("/api/user", user);
        }

        function findAllUsers() {
            return $http.get("/api/user");
        }

        function findUserById(userId) {
            return $http.get("/api/user/" + userId);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username=" + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username=" + username + "&password=" + password);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/" + userId, newUser);
        }

        function addCourseToUser(userId, courseId) {
            return $http.put("/api/user/" + userId + "/course/" + courseId);
        }

        function removeCourseFromUser(userId, courseId) {
            return $http.put("/api/user/" + userId + "/course/" + courseId + "/remove");
        }

        function deleteUser(userId) {
            return $http.delete("/api/user/" + userId);
        }
    }
});
