/**
 * Created by Ethan on 4/21/2017.
 */

var q = require("q");
module.exports = function (mongoose, UserModel) {
    var api = {
        createCourseForProfessor: createCourseForProfessor,
        findAllCourses: findAllCourses,
        findAllCoursesForUser: findAllCoursesForUser,
        findCourseById: findCourseById,
        updateCourse: updateCourse,
        deleteCourse: deleteCourse,
        addStudentToCourse: addStudentToCourse,
        addProfessorToCourse: addProfessorToCourse,
        removeStudentFromCourse: removeStudentFromCourse,
        removeProfFromCourse: removeProfFromCourse
    };

    var CourseSchema = require('./course.schema.server')(mongoose);
    var CourseModel = mongoose.model('CourseModel', CourseSchema);

    return api;

    function createCourseForProfessor(userId, course) {
        var deferred = q.defer();
        course._professor = userId;

        CourseModel.create(course, function (err, crs) {
            UserModel
                .addCourseToUser(userId, crs._id)
                .then(function (user) {
                    console.log(user);
                });
            deferred.resolve(crs);
        });
        return deferred.promise;
    }

    function findAllCourses() {
        var deferred = q.defer();
        CourseModel.find({}, function (err, crs) {
            deferred.resolve(crs);
        });
        return deferred.promise;
    }

    function findAllCoursesForUser(userId) {
        var deferred = q.defer();
        CourseModel.find({_professor: userId}, function (err, crs) {
            deferred.resolve(crs);
        });
        return deferred.promise;
    }

    function findCourseById(courseId) {
        var deferred = q.defer();
        CourseModel.findById(courseId, function (err, crs) {
            deferred.resolve(crs);
        });
        return deferred.promise;
    }

    function updateCourse(courseId, course) {
        var deferred = q.defer();
        CourseModel.findByIdAndUpdate(courseId, {$set: {name: course.name, description: course.description}}, function (err, crs) {
            CourseModel.findById(courseId, function (err, crs) {
                deferred.resolve(crs);
            });
        });
        return deferred.promise;
    }

    function deleteCourse(courseId) {
        var deferred = q.defer();
        CourseModel.remove({_id: courseId}, function (err, crs) {
            deferred.resolve(crs);
        });
        return deferred.promise;
    }

    function addStudentToCourse(studentId, courseId) {
        var deferred = q.defer();
        findCourseById(courseId)
            .then(function (course) {
                course.students.push(studentId);
                course.save(function (err, course) {
                    deferred.resolve(course);
                });
            });
        return deferred.promise;
    }

    function addProfessorToCourse(profId, courseId) {
        var deferred = q.defer();
        findCourseById(courseId)
            .then(function (course) {
                course._professor = profId;
                course.save(function (err, course) {
                    deferred.resolve(course);
                });
            });
        return deferred.promise;
    }

    function removeStudentFromCourse(studentId, courseId) {
        var deferred = q.defer();
        findCourseById(courseId)
            .then(function (course) {
                for (var s in course.students) {
                    if (course.students[s] == studentId) {
                        course.students.splice(s, 1);
                        break;
                    }
                }
                course.save(function (err, course) {
                    deferred.resolve(course);
                });
            });
        return deferred.promise;
    }

    function removeProfFromCourse(profId, courseId) {
        var deferred = q.defer();
        findCourseById(courseId)
            .then(function (course) {
                course._professor = profId;
                course.save(function (err, course) {
                    deferred.resolve(course);
                });
            });
        return deferred.promise;
    }
};