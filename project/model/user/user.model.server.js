/**
 * Created by Ethan on 4/21/2017.
 */

var q = require("q");
module.exports = function (mongoose) {
    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        addCourseToUser: addCourseToUser,
        removeCourseFromUser: removeCourseFromUser
    };

    var UserSchema = require('./user.schema.server')(mongoose);
    var UserModel = mongoose.model('UserModel', UserSchema);

    return api;

    function createUser(user) {
        var deferred = q.defer();
        UserModel.create(user, function (err, usr) {
            deferred.resolve(usr);
        });

        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        UserModel.find({}, function (err, result) {
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, user) {
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel.find({username: username}, function (err, result) {
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        var deferred = q.defer();
        UserModel.find({username: username, password: password}, function (err, result) {
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();
        UserModel.findByIdAndUpdate(userId, {$set: {username: user.username, firstName: user.firstName, lastName: user.lastName, email: user.email}}, function (err, user) {
            UserModel.findById(userId, function (err, user) {
                deferred.resolve(user);
            });
        });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        UserModel.remove({_id: userId}, function (err, result) {
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    function addCourseToUser(userId, courseId) {
        var deferred = q.defer();
        findUserById(userId)
            .then(function (user) {
                user.courses.push(courseId);
                user.save(function (err, user) {
                    deferred.resolve(user);
                });
            });
        return deferred.promise;
    }

    function removeCourseFromUser(userId, courseId) {
        var deferred = q.defer();
        findUserById(userId)
            .then(function (user) {
                for (var c in user.courses) {
                    if (user.courses[c] == courseId) {
                        user.courses.splice(c, 1);
                        break;
                    }
                }
                user.save(function (err, user) {
                    deferred.resolve(user);
                });
            });
        return deferred.promise;
    }
};