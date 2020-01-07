var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonSchema = new Schema({
    id: { type: Number, required: true, unique: false },
    password: String,
}, {
    versionKey: false
});



module.exports = mongoose.model('Person', PersonSchema);