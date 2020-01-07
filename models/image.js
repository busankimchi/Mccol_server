var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
    id: { type: Number, required: true },
    uri: { type: String, required: true },
    type: String,
    name: { type: String, required: true, unique: true },
}, {
    versionKey: false
});

ImageSchema.statics.create = function (image) {
    const gallery = new this(image)
    return gallery.save();
};



ImageSchema.statics.findAll = function () {
    return this.find();
}

ImageSchema.statics.findAllById = function (id) {
    return this.find({ id: id })
}

ImageSchema.statics.findOneById = function (id) {
    return this.findOne({ id: id });
};

ImageSchema.statics.updateById = function (id, payload) {
    // { new: true }: return the modified document rather than the original. defaults to false
    return this.findOneAndUpdate({ id: id }, payload, { new: true });
};

/*
ImageSchema.statics.deleteById = function (id) {
    return this.deleteOne({ id: id });
};
*/

ImageSchema.statics.deleteByName = function (name) {
    return this.deleteOne({ name: name });
};

module.exports = mongoose.model('Image', ImageSchema);