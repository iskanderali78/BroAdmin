var mongoose = require('../lib/mongooseExt');

var Cartridge = new mongoose.Schema({
    name: String,
    producer: String,
    type: String,
    printers: Array,
    image: String,
    tonermass: String,
    resource: String,
    color: String,
    vendor: String,
    analog: Array,
    status: String,
    price0: Number,
    price1: Number,
    price2: Number,
    price3: Number,
    chipprice: Number,
    opcdrumreplacementprice: Number,
    otherprice: Number,
    printercleananddiagnosticprice: Number
});

module.exports = mongoose.model('Cartridge', Cartridge);
