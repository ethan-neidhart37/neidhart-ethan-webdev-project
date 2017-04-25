/**
 * Created by Ethan on 4/21/2017.
 */

module.exports = function (mongoose) {

    var CourseSchema = mongoose.Schema({
        _professor: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        name: String,
        description: String,
        students: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: 'courses'});

    return CourseSchema;
};