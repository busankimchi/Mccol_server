var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LoginSchema = new Schema({
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    versionKey: false
});

LoginSchema.statics.findAll = function () {
    return this.find();
}

LoginSchema.statics.findAllById = function (id) {
    return this.find({ id: id });
}

LoginSchema.statics.create = function (person) {
    const login = new this(person);

    return login.save();
};

LoginSchema.statics.findOneById = function (id) {

    return this.findOne({ id: id });
};

LoginSchema.statics.deleteById = function (id) {
    return this.deleteOne({ id: id });
};

module.exports = mongoose.model('Login', LoginSchema);