var fs = require('fs'),
    Waterline = require('waterline');

module.exports = function(config) {
    console.log('Loading models...');
    var orm = new Waterline();
    fs.readdirSync('models/').forEach(function(model) {
        orm.loadCollection(Waterline.Collection.extend(require('../models/'+model)));
    });
    return orm;
}();;
