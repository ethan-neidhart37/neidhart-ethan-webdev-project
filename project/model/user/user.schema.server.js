/**
 * Created by Ethan on 4/21/2017.
 */

module.exports = function (mongoose) {
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        role: String,
        email: String,
        courses: [{type: mongoose.Schema.Types.ObjectId, ref: 'CourseModel'}],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: 'users'});

    return UserSchema;
};