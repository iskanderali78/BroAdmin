var mongoose = require('../lib/mongooseExt');

var Printer = new mongoose.Schema({
    name: String,
    producer: String,
    type: String
});

module.exports = mongoose.model('Printer', Printer);
