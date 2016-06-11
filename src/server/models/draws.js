var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Draw = new Schema({
    date : Date,
    cashValue : Number,
    totalRecieved : Number,
    cashKept : Number,
    stocks : Number,
    bonds : Number,
    bondsDailyRecieved : Number,
    bondsMonthlyRecieved : Number
});

module.exports = mongoose.model('draws', Draw);
