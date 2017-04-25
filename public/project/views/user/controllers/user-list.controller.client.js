/**
 * Created by Ethan on 4/21/2017.
 */

(function(){
    angular
        .module("ClassScheduler")
        .controller("UserListController", UserListController);

    function UserListController($routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams.uid;

        function init() {
            UserService
                .findAllUsers()
                .success(function (users) {
                    vm.users = users;
                })
                .error(function (err) {
                    vm.error = err;
                });
        }
        init();
    }
})();