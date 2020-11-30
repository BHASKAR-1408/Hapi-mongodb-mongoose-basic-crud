var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema({
    title : String,
    author : String,
})
var Books=mongoose.model('Books',BookSchema)
// console.log (Books)

module.exports = Books