var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, default: 'anonymous' },
    number: { type: String, required: true, unique: true },
}, {
    versionKey: false
});

ContactSchema.statics.create = function (contact) {
    const phone = new this(contact)
    
    return phone.save();
};

ContactSchema.statics.findAll = function () {
    return this.find();
}

ContactSchema.statics.findAllById = function (id) {
    return this.find({ id: id });
}

ContactSchema.statics.findOneById = function (id) {
    return this.findOne({ id: id });
};

ContactSchema.statics.updateById = function (id, payload) {
    // { new: true }: return the modified document rather than the original. defaults to false
    return this.findOneAndUpdate({ id: id }, payload, { new: true });
};

/*
ContactSchema.statics.deleteById = function (id) {
    return this.deleteOne({ id: id });
};
*/

ContactSchema.statics.deleteByNumber = function (number) {
    /*
    var found = this.findOne({ number: number });
    console.log('asdfasdfasdf');
    console.log(found);
    */

    return this.deleteOne({ number: number });
};

module.exports = mongoose.model('Contact', ContactSchema);