/**
 * Created by eneid on 4/20/2017.
 */

(function () {
    angular
        .module("ClassScheduler")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider

            // User
            .when("default",{
                templateUrl: 'views/home.html'
            })
            .when("/",{
                templateUrl: 'views/home.html'
            })
            .when("/home",{
                templateUrl: 'views/home.html'
            })
            .when("/login",{
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'ProjectLoginController',
                controllerAs: 'model'
            })
            .when("/register",{
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'RegisterController',
                controllerAs: 'model'
            })
            .when("/user/:uid/new",{
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'RegisterController',
                controllerAs: 'model'
            })
            .when("/user/:uid/user2",{
                templateUrl: 'views/user/templates/user-list.view.client.html',
                controller: 'UserListController',
                controllerAs: 'model'
            })
            .when("/user/:uid/user2/:u2id",{
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'AdminProfileController',
                controllerAs: 'model'
            })
            .when("/user/:uid",{
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model'
            })

            // Course
            .when("course",{
                templateUrl: 'views/course/templates/no-user/course-list.view.client.html',
                controller: 'CourseListController',
                controllerAs: 'model'
            })
            .when("course/:cid",{
                templateUrl: 'views/course/templates/no-user/course-details.view.client.html',
                controller: 'CourseDetailsController',
                controllerAs: 'model'
            })
            .when("user/:uid/course",{
                templateUrl: 'views/course/templates/course-list.view.client.html',
                controller: 'CourseListController',
                controllerAs: 'model'
            })
            .when("user/:uid/course/new",{
                templateUrl: 'views/course/templates/course-new.view.client.html',
                controller: 'NewCourseController',
                controllerAs: 'model'
            })
            .when("user/:uid/course/:cid",{
                templateUrl: 'views/course/templates/course-details.view.client.html',
                controller: 'CourseDetailsController',
                controllerAs: 'model'
            })
            .when("user/:uid/course/:cid/edit",{
                templateUrl: 'views/course/templates/course-edit.view.client.html',
                controller: 'CourseEditController',
                controllerAs: 'model'
            });
    }
})();
