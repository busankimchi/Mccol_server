var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
    id: Number,
    title: String,
    source: String,
});

ImageSchema.statics.create = function (image) {
    const gallery = new this(image)
    return gallery.save()
};

ImageSchema.statics.findAll = function () {
    return this.find({})
}

ImageSchema.statics.findOneById = function (id) {
    return this.findOne({ id: id });
};

ImageSchema.statics.updateById = function (id, payload) {
    // { new: true }: return the modified document rather than the original. defaults to false
    return this.findOneAndUpdate({ id: id }, payload, { new: true });
};

ImageSchema.statics.deleteById = function (id) {
    return this.deleteOne({ id:id });
};

module.exports = mongoose.model('Image', ImageSchema);