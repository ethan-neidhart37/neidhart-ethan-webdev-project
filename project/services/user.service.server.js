/**
 * Created by Ethan on 4/21/2017.
 */

module.exports = function (app, userModel) {
    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.put("/api/user/:userId/course/:courseId", addCourseToUser);
    app.put("/api/user/:userId/course/:courseId/remove", removeCourseFromUser);
    app.delete("/api/user/:userId", deleteUser);

    function createUser(req, res) {
        var newUser = req.body;

        userModel
            .createUser(newUser)
            .then(function(user) {
                res.json(user);
            }, function(error) {
                res.status(500).send(error);
            });
    }

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findUserByCredentials(req, res);
        } else if(username) {
            findUserByUsername(req, res);
        } else {
            findAllUsers(res);
        }
    }

    function findAllUsers(res) {
        userModel
            .findAllUsers()
            .then(function(users) {
                res.send(users);
            }, function(error) {
                res.status(404).send(error);
            });
    }

    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];

        userModel
            .findUserByCredentials(username, password)
            .then(function(user) {
                res.send(user);
            }, function(error) {
                res.status(404).send(error);
            });
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];

        userModel
            .findUserByUsername(username)
            .then(function(user) {
                res.send(user);
            }, function(error) {
                res.status(404).send(error);
            });
    }

    function findUserById(req, res) {
        var userId = req.params['userId'];

        userModel
            .findUserById(userId)
            .then(function(user) {
                res.send(user);
            }, function(error) {
                res.status(404).send(error);
            });
    }

    function updateUser(req, res) {
        var userId = req.params["userId"];
        var newUser = req.body;

        userModel
            .updateUser(userId, newUser)
            .then(function(status) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(404);
            });
    }

    function addCourseToUser(req, res) {
        var userId = req.params['userId'];
        var courseId = req.params['courseId'];

        userModel
            .addCourseToUser(userId, courseId)
            .then(function(status) {
                res.sendStatus(200);
            }, function(error) {
                res.sendStatus(404);
            })
    }

    function removeCourseFromUser(req, res) {
        var userId = req.params['userId'];
        var courseId = req.params['courseId'];

        userModel
            .removeCourseFromUser(userId, courseId)
            .then(function(status) {
                res.sendStatus(200);
            }, function(error) {
                res.sendStatus(404);
            })
    }

    function deleteUser(req, res) {
        var userId = req.params['userId'];

        userModel
            .deleteUser(userId)
            .then(function (status) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(404);
            });
    }
};