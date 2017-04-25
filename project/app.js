/**
 * Created by Ethan on 4/21/2017.
 */

module.exports = function (app) {

    var connectionString = 'mongodb://127.0.0.1:27017/project';

    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);

    var userModel = require('./model/user/user.model.server')(mongoose);
    var courseModel = require('./model/course/course.model.server')(mongoose, userModel);

    require("./services/user.service.server.js")(app, userModel);
    require("./services/course.service.server.js")(app, courseModel);
};