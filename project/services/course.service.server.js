/**
 * Created by Ethan on 4/21/2017.
 */

module.exports = function (app, CourseModel) {
    app.post("/api/user/:userId/course", createCourse);
    app.get("/api/user/:userId/course", findCoursesByUser);
    app.get("/api/course", findAllCourses);
    app.get("/api/course/:courseId", findCourseById);
    app.put("/api/course/:courseId", updateCourse);
    app.put("/api/user/:userId/course/:courseId/student", addStudentToCourse);
    app.put("/api/user/:userId/course/:courseId/prof", addProfessorToCourse);
    app.put("/api/user/:userId/course/:courseId/student/remove", removeStudentFromCourse);
    app.put("/api/user/:userId/course/:courseId/prof/remove", removeProfessorFromCourse);
    app.delete("/api/course/:courseId", deleteCourse);

    function createCourse(req, res) {
        var userId = req.params["userId"];
        var newCourse = req.body;

        CourseModel
            .createCourseForProfessor(userId, newCourse)
            .then(function (course) {
                res.json(course);
            }, function (error) {
                res.status(500).send(error);
            });
    }

    function findCoursesByUser(req, res) {
        var userId = req.params["userId"];

        CourseModel
            .findAllCoursesForUser(userId)
            .then(function (courses) {
                res.send(courses);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function findAllCourses(req, res) {
        CourseModel
            .findAllCourses()
            .then(function (courses) {
                res.send(courses);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function findCourseById(req, res) {
        var courseId = req.params["courseId"];

        CourseModel
            .findCourseById(courseId)
            .then(function (course) {
                res.send(course);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function updateCourse(req, res) {
        var courseId = req.params["courseId"];
        var newCourse = req.body;

        CourseModel
            .updateCourse(courseId, newCourse)
            .then(function (course) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(404);
            });
    }

    function addStudentToCourse(req, res) {
        var userId = req.params['userId'];
        var courseId = req.params['courseId'];

        CourseModel
            .addStudentToCourse(userId, courseId)
            .then(function(status) {
                res.sendStatus(200);
            }, function(error) {
                res.sendStatus(404);
            })
    }

    function addProfessorToCourse(req, res) {
        var userId = req.params['userId'];
        var courseId = req.params['courseId'];

        CourseModel
            .addProfessorToCourse(userId, courseId)
            .then(function(status) {
                res.sendStatus(200);
            }, function(error) {
                res.sendStatus(404);
            })
    }

    function removeStudentFromCourse(req, res) {
        var userId = req.params['userId'];
        var courseId = req.params['courseId'];

        CourseModel
            .removeStudentFromCourse(userId, courseId)
            .then(function(status) {
                res.sendStatus(200);
            }, function(error) {
                res.sendStatus(404);
            })
    }

    function removeProfessorFromCourse(req, res) {
        var userId = req.params['userId'];
        var courseId = req.params['courseId'];

        CourseModel
            .removeProfFromCourse(userId, courseId)
            .then(function(status) {
                res.sendStatus(200);
            }, function(error) {
                res.sendStatus(404);
            })
    }

    function deleteCourse(req, res) {
        var courseId = req.params["courseId"];

        CourseModel
            .deleteCourse(courseId)
            .then(function (course) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(404);
            });
    }

};